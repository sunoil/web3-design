import React from 'react';

const chains = [
  { name: 'Arbitrum', status: 'ready', progress: 100, tvl: 160.0, symbol: 'ARB' },
  { name: 'Avalanche', status: 'ready', progress: 100, tvl: 160.0, symbol: 'AVA' },
  { name: 'Ethereum', status: 'progress', progress: 80, tvl: null, symbol: 'ETH' },
  { name: 'Solana', status: 'progress', progress: 74, tvl: null, symbol: 'SOL' },
  { name: 'Base', status: 'progress', progress: 24, tvl: null, symbol: 'BASE' },
  { name: 'BSC', status: 'progress', progress: 51, tvl: null, symbol: 'BSC' },
  { name: 'Polygon', status: 'progress', progress: 10, tvl: null, symbol: 'POLY' },
  { name: 'Optimism', status: 'progress', progress: 0, tvl: null, symbol: 'OP' },
];

function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="nsb-progress">
      <div className="nsb-progress-track" />
      <div className="nsb-progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

function ChainCard({ name, progress, status, tvl, symbol }) {
  const isReady = status === 'ready';
  return (
    <div className={`nsb-card ${isReady ? 'is-ready' : 'is-progress'}`} data-animate-on-scroll>
      <div className="nsb-card-header">
        <div className="nsb-card-title">{name}</div>
        <div className="nsb-card-badge">{symbol}</div>
      </div>
      <ProgressBar value={progress} />
      <div className="nsb-card-meta">
        <div className="nsb-meta-progress">{progress}%</div>
        <div className="nsb-meta-tvl">{tvl != null ? `$${tvl.toFixed(1)}0x` : 'TVL$'}</div>
      </div>
    </div>
  );
}

export default function NetworksStatusBoard() {
  const ready = chains.filter((c) => c.status === 'ready');
  const progress = chains.filter((c) => c.status !== 'ready');

  return (
    <div className="nsb-root" data-animate-on-scroll>
      <div className="nsb-group">
        <div className="nsb-group-title nsb-green">Ready to use</div>
        <div className="nsb-cards">
          {ready.map((c) => (
            <ChainCard key={c.name} {...c} />
          ))}
        </div>gio
      </div>
      <div className="nsb-divider" />
      <div className="nsb-group">
        <div className="nsb-group-title nsb-purple">In progress</div>
        <div className="nsb-cards">
          {progress.map((c) => (
            <ChainCard key={c.name} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}



