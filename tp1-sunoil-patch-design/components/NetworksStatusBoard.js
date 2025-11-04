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
  {
    name: 'Arbitrum',
    status: 'ready',
    progress: 100,
    tvl: 160.0,
    symbol: 'ARB',
    accent: '#28A0F0',
    accentSecondary: '#7BD8FF',
    accentBorder: 'rgba(40, 160, 240, 0.34)',
    accentBorderStrong: 'rgba(123, 216, 255, 0.5)',
    accentSoft: 'rgba(40, 160, 240, 0.14)',
    accentGlow: 'rgba(40, 160, 240, 0.34)',
    accentShadow: 'rgba(40, 160, 240, 0.22)',
    accentProgressText: 'rgba(204, 235, 255, 0.95)',
    accentTvl: 'rgba(170, 222, 255, 0.74)',
  },
  {
    name: 'Avalanche',
    status: 'ready',
    progress: 100,
    tvl: 160.0,
    symbol: 'AVAX',
    accent: '#E84142',
    accentSecondary: '#FF8E90',
    accentBorder: 'rgba(232, 65, 66, 0.36)',
    accentBorderStrong: 'rgba(232, 65, 66, 0.52)',
    accentSoft: 'rgba(232, 65, 66, 0.14)',
    accentGlow: 'rgba(232, 65, 66, 0.4)',
    accentShadow: 'rgba(232, 65, 66, 0.26)',
    accentProgressText: 'rgba(255, 220, 222, 0.94)',
    accentTvl: 'rgba(255, 194, 196, 0.72)',
  },
  {
    name: 'Ethereum',
    status: 'progress',
    progress: 78,
    tvl: null,
    symbol: 'ETH',
    accent: '#53E0A8',
    accentSecondary: '#8AF1C7',
    accentBorder: 'rgba(83, 224, 168, 0.34)',
    accentBorderStrong: 'rgba(138, 241, 199, 0.5)',
    accentSoft: 'rgba(83, 224, 168, 0.16)',
    accentGlow: 'rgba(83, 224, 168, 0.36)',
    accentShadow: 'rgba(83, 224, 168, 0.24)',
    accentProgressText: 'rgba(210, 255, 236, 0.94)',
    accentTvl: 'rgba(184, 255, 230, 0.7)',
  },
  {
    name: 'Solana',
    status: 'progress',
    progress: 74,
    tvl: null,
    symbol: 'SOL',
    accent: '#9945FF',
    accentSecondary: '#19FB9B',
    accentBorder: 'rgba(153, 69, 255, 0.34)',
    accentBorderStrong: 'rgba(153, 69, 255, 0.5)',
    accentSoft: 'rgba(153, 69, 255, 0.18)',
    accentGlow: 'rgba(62, 238, 180, 0.34)',
    accentShadow: 'rgba(62, 238, 180, 0.26)',
    accentProgressText: 'rgba(226, 205, 255, 0.94)',
    accentTvl: 'rgba(196, 248, 234, 0.76)',
  },
  {
    name: 'Base',
    status: 'progress',
    progress: 24,
    tvl: null,
    symbol: 'BASE',
    accent: '#0052FF',
    accentSecondary: '#5C8CFF',
    accentBorder: 'rgba(0, 82, 255, 0.34)',
    accentBorderStrong: 'rgba(92, 140, 255, 0.5)',
    accentSoft: 'rgba(0, 82, 255, 0.16)',
    accentGlow: 'rgba(92, 140, 255, 0.34)',
    accentShadow: 'rgba(0, 82, 255, 0.22)',
    accentProgressText: 'rgba(206, 224, 255, 0.94)',
    accentTvl: 'rgba(178, 205, 255, 0.7)',
  },
  {
    name: 'BSC',
    status: 'progress',
    progress: 51,
    tvl: null,
    symbol: 'BSC',
    accent: '#F0B90B',
    accentSecondary: '#FFE066',
    accentBorder: 'rgba(240, 185, 11, 0.36)',
    accentBorderStrong: 'rgba(255, 224, 102, 0.5)',
    accentSoft: 'rgba(240, 185, 11, 0.16)',
    accentGlow: 'rgba(240, 185, 11, 0.34)',
    accentShadow: 'rgba(240, 185, 11, 0.24)',
    accentProgressText: 'rgba(255, 238, 194, 0.94)',
    accentTvl: 'rgba(255, 232, 170, 0.72)',
  },
  {
    name: 'Polygon',
    status: 'progress',
    progress: 15,
    tvl: null,
    symbol: 'POLY',
    accent: '#8247E5',
    accentSecondary: '#AE8CFF',
    accentBorder: 'rgba(130, 71, 229, 0.34)',
    accentBorderStrong: 'rgba(174, 140, 255, 0.52)',
    accentSoft: 'rgba(130, 71, 229, 0.16)',
    accentGlow: 'rgba(130, 71, 229, 0.36)',
    accentShadow: 'rgba(130, 71, 229, 0.24)',
    accentProgressText: 'rgba(232, 220, 255, 0.94)',
    accentTvl: 'rgba(210, 198, 255, 0.76)',
  },
  {
    name: 'Optimism',
    status: 'progress',
    progress: 18,
    tvl: null,
    symbol: 'OP',
    accent: '#FF0420',
    accentSecondary: '#FF6B7A',
    accentBorder: 'rgba(255, 4, 32, 0.36)',
    accentBorderStrong: 'rgba(255, 107, 122, 0.52)',
    accentSoft: 'rgba(255, 4, 32, 0.14)',
    accentGlow: 'rgba(255, 68, 88, 0.38)',
    accentShadow: 'rgba(255, 4, 32, 0.24)',
    accentProgressText: 'rgba(255, 218, 222, 0.94)',
    accentTvl: 'rgba(255, 198, 206, 0.7)',
  },
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

function ChainCard({
  name,
  progress,
  status,
  tvl,
  symbol,
  accent,
  accentSecondary,
  accentBorder,
  accentBorderStrong,
  accentSoft,
  accentGlow,
  accentShadow,
  accentProgressText,
  accentTvl,
  index = 0,
}) {
  const isReady = status === 'ready';
  const accentVars = {};
  if (accent) accentVars['--nsb-accent'] = accent;
  if (accentSecondary) accentVars['--nsb-accent-secondary'] = accentSecondary;
  if (accentBorder) accentVars['--nsb-accent-border'] = accentBorder;
  if (accentBorderStrong) accentVars['--nsb-accent-border-strong'] = accentBorderStrong;
  if (accentSoft) accentVars['--nsb-accent-soft'] = accentSoft;
  if (accentGlow) accentVars['--nsb-accent-glow'] = accentGlow;
  if (accentShadow) accentVars['--nsb-accent-shadow'] = accentShadow;
  if (accentProgressText) accentVars['--nsb-accent-progress-text'] = accentProgressText;
  if (accentTvl) accentVars['--nsb-accent-tvl'] = accentTvl;
  if (accentGlow) accentVars['--nsb-icon-glow-color'] = accentGlow;
  if (accentSoft) accentVars['--nsb-icon-trace-color'] = accentSoft;
  accentVars['--nsb-icon-delay'] = `${(index || 0) * 0.32}s`;
  return (
    <div
      className={`nsb-card ${isReady ? 'is-ready' : 'is-progress'}`}
      data-animate-on-scroll
      style={accentVars}
    >
      <div className="nsb-card-header">
        <div className="nsb-card-identity">
          {chainLogos[name] && (
            <div className="nsb-card-icon-wrap" aria-hidden="true">
              <span className="nsb-icon-trace" />
              <span className="nsb-icon-glow" />
              <img className="nsb-card-icon" src={chainLogos[name].src} alt="" />
            </div>
          )}
          <div className="nsb-card-title">{name}</div>
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
      <div className="nsb-haze-layer nsb-haze-center" aria-hidden="true" />
      <div className="nsb-group">
        <div className="nsb-group-title nsb-green">Ready to use</div>
        <div className="nsb-cards">
          {ready.map((c, idx) => (
            <ChainCard key={c.name} index={idx} {...c} />
          ))}
        </div>
      </div>
      <div className="nsb-divider" />
      <div className="nsb-group nsb-progress-group">
        <div className="nsb-group-title nsb-purple">In progress</div>
        <div className="nsb-cards">
          {progress.map((c, idx) => (
            <ChainCard key={c.name} index={idx + ready.length} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}




