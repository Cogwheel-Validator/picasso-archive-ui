'use client';

import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import ExplorerButton from '../../components/ExplorerBtn';
import Alert from '../../components/Alert';
import { format, fromZonedTime, toZonedTime } from 'date-fns-tz';

interface Transaction {
  id: string;
  type: string[];
  tx_hash: string;
  block_height: number;
  time: string;
  date: string;
  fee_amount: string;
  fee_denom: string;
  specific_data: Record<string, any>[];
}

const formatLocalTime = (dateStr: string, timeStr: string): string => {
  const utcDate = new Date(`${dateStr}T${timeStr}Z`);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = fromZonedTime(utcDate, userTimezone);
  return format(localDate, 'HH:mm:ss');
};

const formatLocalDate = (dateStr: string): string => {
  const utcDate = new Date(`${dateStr}T00:00:00Z`);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(utcDate, userTimezone);
  return format(localDate, 'yyyy-MM-dd');
};

const SearchPage: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [total, setTotal] = useState<number>(0);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTransactions = async () => {
    if (!validateAddress()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:8000/account/${address.trim()}?page=${page}&page_size=${pageSize}`);
      const data = await response.json();
      if (response.ok) {
        setTransactions(data.transactions);
        setTotal(data.total);
        if (data.transactions.length === 0) {
          setError("No transactions found for this address.");
        }
      } else {
        setError(data.detail || "An error occurred while fetching transactions.");
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError("An error occurred while fetching transactions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 43);
    setAddress(value);
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchTransactions();
    }
  };

  const validateAddress = (): boolean => {
    const trimmedAddress = address.trim();
    if (trimmedAddress.length === 0) {
      setError("Please enter an address.");
      return false;
    }
    if (!trimmedAddress.startsWith('pica')) {
      setError("Invalid address. Please enter an address starting with 'pica'.");
      return false;
    }
    if (trimmedAddress.length !== 43) {
      setError(`Invalid address length. You entered ${trimmedAddress.length} characters, but it needs to be exactly 43 characters long.`);
      return false;
    }
    return true;
  };


  const toggleRowExpansion = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderSpecificData = (specificData: Record<string, any>[]) => {
    return Object.entries(specificData[0]).map(([key, value]) => (
      <div key={key} className="mt-2">
        <h4 className="font-semibold">{key}</h4>
        <pre className="bg-base-200 p-2 rounded-md overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    ));
  };

  const formatFee = (amount: string, denom: string): string => {
    if (denom !== 'ppica') return `${amount} ${denom}`;
    
    const picaAmount = Number(amount) / 1000000000000;
    if (picaAmount === 0) return '0 PICA';
    if (picaAmount < 0.001) return '< 0.001 PICA';
    return `${picaAmount.toFixed(3)} PICA`;
  };

  const renderMobileTransaction = (tx: Transaction) => (
    <div key={tx.id} className="bg-base-200 rounded-lg p-4 mb-4">
      <div className="mb-2">
        <span className="font-semibold">{tx.type.join(', ')}</span>
      </div>
      <div className="text-sm mb-1">TX Hash: {tx.tx_hash.slice(0, 10)}...</div>
      <div className="text-sm mb-1">Block: {tx.block_height}</div>
      <div className="text-sm mb-1">Time: {formatLocalTime(tx.date, tx.time)}</div>
      <div className="text-sm mb-1">Date: {formatLocalDate(tx.date)}</div>
      <div className="text-sm mb-2">Fee: {formatFee(tx.fee_amount, tx.fee_denom)}</div>
      <button
        className="btn btn-sm w-full mb-2"
        onClick={() => toggleRowExpansion(tx.id)}
      >
        {expandedRows[tx.id] ? 'Hide Details' : 'Show Details'}
      </button>
      {expandedRows[tx.id] && (
        <div className="mt-4">
          {renderSpecificData(tx.specific_data)}
        </div>
      )}
      <div className="flex justify-center">
        <ExplorerButton txHash={tx.tx_hash} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-auto bg-gradient-to-br from-purple-700 via-blue-800 to-teal-500">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">Search for the transaction</h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <label className="input input-bordered flex items-center gap-2 w-full sm:w-auto">
              <input 
                type="text" 
                className="grow" 
                placeholder="Enter your pica address" 
                value={address}
                onChange={handleAddressChange}
                onKeyUp={handleKeyPress}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" 
                />
              </svg>
            </label>
            <button 
              className="btn btn-md btn-primary w-full sm:w-auto" 
              onClick={fetchTransactions}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {error && (
          <Alert
            title="Error"
            message={error}
            variant="error"
            onClose={() => setError(null)}
          />
        )}

        {transactions.length > 0 && (
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            {isMobile ? (
              <div>
                {transactions.map(renderMobileTransaction)}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Cell header>Type</Table.Cell>
                      <Table.Cell header>TX Hash</Table.Cell>
                      <Table.Cell header>Block Height</Table.Cell>
                      <Table.Cell header>Time</Table.Cell>
                      <Table.Cell header>Date</Table.Cell>
                      <Table.Cell header>Fee</Table.Cell>
                      <Table.Cell header>Actions</Table.Cell>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {transactions.map((tx) => (
                      <React.Fragment key={tx.id}>
                        <Table.Row isExpanded={expandedRows[tx.id]}>
                          <Table.Cell>{tx.type.join(', ')}</Table.Cell>
                          <Table.Cell>{tx.tx_hash.slice(0, 10)}...</Table.Cell>
                          <Table.Cell>{tx.block_height}</Table.Cell>
                          <Table.Cell>{tx.time}</Table.Cell>
                          <Table.Cell>{tx.date}</Table.Cell>
                          <Table.Cell>{formatFee(tx.fee_amount, tx.fee_denom)}</Table.Cell>
                          <Table.Cell>
                            <div className="flex space-x-2">
                              <button
                                className="btn btn-sm"
                                onClick={() => toggleRowExpansion(tx.id)}
                              >
                                {expandedRows[tx.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                              <ExplorerButton txHash={tx.tx_hash} />
                            </div>
                          </Table.Cell>
                        </Table.Row>
                        {expandedRows[tx.id] && (
                          <Table.Row isExpanded={true}>
                            <Table.Cell colSpan={7}>
                              {renderSpecificData(tx.specific_data)}
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </React.Fragment>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <select 
                className="select select-bordered w-full sm:w-auto"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(total / pageSize)}
                onPageChange={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;