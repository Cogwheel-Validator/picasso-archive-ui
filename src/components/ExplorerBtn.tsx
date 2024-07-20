'use client';

import React from 'react';
import Image from 'next/image';

interface ExplorerButtonProps {
  txHash: string;
}

const ExplorerButton: React.FC<ExplorerButtonProps> = ({ txHash }) => {
  return (
    <a
      href={`https://ping.pub/picasso/tx/${txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-md bg-green-800 hover:bg-green-900 text-lg font-bold text-white rounded-full flex items-center"
    >
      <Image
        src="/ping.png"
        alt="Ping logo"
        width={32}
        height={32}
      />
      <span className="ml-1 font-bold">Ping.pub</span>
    </a>
  );
};

export default ExplorerButton;
