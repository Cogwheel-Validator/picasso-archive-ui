'use client';

import React, { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const Table: React.FC<TableProps> & {
  Head: React.FC<TableProps>;
  Body: React.FC<TableProps>;
  Row: React.FC<RowProps>;
  Cell: React.FC<CellProps>;
} = ({ children }) => {
  return <table className="table w-full">{children}</table>;
};

interface HeadProps {
  children: ReactNode;
}

const Head: React.FC<HeadProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

interface BodyProps {
  children: ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

interface RowProps {
  children: ReactNode;
  isExpanded?: boolean;
}

const Row: React.FC<RowProps> = ({ children, isExpanded }) => {
  return <tr className={isExpanded ? 'bg-base-200' : ''}>{children}</tr>;
};

interface CellProps {
  children: ReactNode;
  header?: boolean;
}

const Cell: React.FC<CellProps> = ({ children, header }) => {
  return header ? (
    <th className="px-4 py-2 text-left font-semibold">{children}</th>
  ) : (
    <td className="px-4 py-2">{children}</td>
  );
};

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export default Table;
