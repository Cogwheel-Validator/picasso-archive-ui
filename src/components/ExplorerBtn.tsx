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
      className="btn btn-sm bg-purple-600 hover:bg-purple-700 text-white"
    >
      <Image
        src="/ping.png"
        alt="Ping logo"
        width={32}
        height={32}
      />
      <span className="ml-1">Ping.pub</span>
    </a>
  );
};

export default ExplorerButton;
