import React from 'react';
import arbLogo from '../src/img/planet/arb-logo.png';
import avalanceLogo from '../src/img/planet/avalance-logo.png';
import polygonLogo from '../src/img/planet/polygon-logo.png';
import opLogo from '../src/img/planet/op-logo.png';
import solLogo from '../src/img/planet/sol-logo.png';
import baseLogo from '../src/img/planet/base-logo.png';
import ethTokenLogo from '../src/img/planet/eth-logo.png';
import bscLogo from '../src/img/planet/bsc-logo.png';

const chains = [
  { name: 'Ethereum', status: 'ready', progress: 100, tvl: 160.0, symbol: 'ETH' },
  { name: 'Avalanche', status: 'ready', progress: 100, tvl: 160.0, symbol: 'AVAX' },
  { name: 'Arbitrum', status: 'progress', progress: 80, tvl: null, symbol: 'ARB' },
  { name: 'Solana', status: 'progress', progress: 74, tvl: null, symbol: 'SOL' },
  { name: 'Base', status: 'progress', progress: 24, tvl: null, symbol: 'BASE' },
  { name: 'BSC', status: 'progress', progress: 51, tvl: null, symbol: 'BSC' },
  { name: 'Polygon', status: 'progress', progress: 15, tvl: null, symbol: 'POLY' },
  { name: 'Optimism', status: 'progress', progress: 10, tvl: null, symbol: 'OP' },
];

const chainLogos = {
  Arbitrum: arbLogo,
  Avalanche: avalanceLogo,
  Polygon: polygonLogo,
  Optimism: opLogo,
  Solana: solLogo,
  Base: baseLogo,
  Ethereum: ethTokenLogo,
  BSC: bscLogo,
};

function ProgressBar({ value }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="nsb-progress" style={{ '--nsb-progress-target': `${clamped}%` }}>
      <div className="nsb-progress-track" />
      <div className="nsb-progress-fill" />
    </div>
  );
}

function ChainCard({ name, progress, status, tvl, symbol }) {
  const isReady = status === 'ready';
  return (
    <div className={`nsb-card ${isReady ? 'is-ready' : 'is-progress'}`} data-animate-on-scroll>
      <div className="nsb-card-header">
        <div className="nsb-card-identity">
          <div className="nsb-card-title">{name}</div>
          {chainLogos[name] && (
            <img className="nsb-card-icon" src={chainLogos[name].src} alt="" />
          )}
        </div>
        <div className="nsb-card-badge">{symbol}</div>
      </div>
      <ProgressBar value={progress} />
      <div className="nsb-card-meta">
        <div className="nsb-meta-progress">{progress}%</div>
        <div className="nsb-meta-tvl">{tvl != null ? `$${tvl.toFixed(2)}x` : ''}</div>
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
        </div>
      </div>
      <div className="nsb-divider" />
      <div className="nsb-group nsb-progress-group">
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




