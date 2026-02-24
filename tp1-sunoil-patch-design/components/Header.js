import { useEffect, useState, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import arbLogo from '../src/img/planet/arb-logo.png';
import avalanceLogo from '../src/img/planet/avalance-logo.png';
import baseLogo from '../src/img/planet/base-logo.png';
import bscLogo from '../src/img/planet/bsc-logo.png';
import ethLogo from '../src/img/planet/eth-logo.png';
import opLogo from '../src/img/planet/op-logo.png';
import polygonLogo from '../src/img/planet/polygon-logo.png';
import solLogo from '../src/img/planet/sol-logo.png';
import orbitLogo from '../src/img/new-logo/Frame 10.svg';

import Head from 'next/head';
import React from 'react'; // React library for building UI components
import { loadData } from '/opt/build/repo/tp1-sunoil-patch-design/components/web3/funcs.js'; // Function to load Web3 data
import Script from 'next/script';// Next.js Script component for js scripts

const NAV_LINKS = [
  { href: '/stake', label: 'Stake' },
  { href: '/my-deposit', label: 'My deposit' },
  { href: '/docs', label: 'Docs' },
];

const NETWORK_OPTIONS = [
  { id: 'arbitrum', label: 'Arbitrum', logo: arbLogo },
  { id: 'avalanche', label: 'Avalanche', logo: avalanceLogo },
  { id: 'ethereum', label: 'Ethereum', logo: ethLogo },
  { id: 'optimism', label: 'Optimism', logo: opLogo },
  { id: 'polygon', label: 'Polygon', logo: polygonLogo },
  { id: 'base', label: 'Base', logo: baseLogo },
  { id: 'solana', label: 'Solana', logo: solLogo },
  { id: 'bsc', label: 'BSC', logo: bscLogo },
];

const OrbitLogo = () => {
  const pathRef = useRef(null);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const rafRef = useRef(null);
  const instanceId = useId().replace(/:/g, '');

  useEffect(() => {
    const path = pathRef.current;
    const back = backRef.current;
    const front = frontRef.current;
    if (!path || !back || !front) return () => {};

    const length = path.getTotalLength();
    const period = 5.0;
    // Ракета дивиться вгору-вліво: це -135° від стандартного "вправо".
    const noseOffsetDeg = -135;
    const epsilon = 0.75;
    const orbitCenterY = 210;
    const start = performance.now();

    const setRocketTransform = (node, x, y, angDeg) => {
      node.setAttribute('transform', `translate(${x} ${y}) rotate(${angDeg})`);
    };

    const tick = (now) => {
      const elapsed = (now - start) / 1000;
      const p = (elapsed / period) % 1;
      const s = p * length;
      const p1 = path.getPointAtLength(s);
      const p2 = path.getPointAtLength((s + epsilon) % length);
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI + noseOffsetDeg;
      const isFront = p1.y > orbitCenterY;

      front.setAttribute('opacity', isFront ? '1' : '0');
      back.setAttribute('opacity', isFront ? '0' : '1');
      setRocketTransform(back, p1.x, p1.y, ang);
      setRocketTransform(front, p1.x, p1.y, ang);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [instanceId]);

  return (
    <span className="orbit-logo" aria-hidden="true">
      <svg className="orbit-logo__svg" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          id={`orbitPath-${instanceId}`}
          d="M320 210 A140 55 0 1 1 40 210 A140 55 0 1 1 320 210"
          fill="none"
        />
        <g transform="rotate(-20 180 210)">
          <g ref={backRef} opacity="1">
            <g className="orbit-logo__rocket" transform="translate(-38.5, -41) scale(0.6585)">
              <path d="M56.6023 33.3909L37.4638 17.8758C36.8086 17.3446 35.8754 17.2887 35.1598 17.7351C2.05975 38.3836 -0.597049 66.0475 2.44851 78.6756C2.64306 79.4823 3.36063 80.0483 4.18977 80.081C32.3184 81.1887 50.8493 51.8591 57.208 35.6217C57.5198 34.8255 57.2665 33.9294 56.6023 33.3909Z" />
              <path d="M73.7114 38.0932C70.4907 37.8626 65.1644 37.4499 61.8087 37.1865C60.8418 37.1106 59.9667 37.739 59.6527 38.6565C58.0574 43.3175 54.6881 48.9121 51.7355 53.2377C50.6348 54.8501 52.1484 56.9273 53.9313 56.1321C67.7824 49.9549 77.9215 38.3946 73.7114 38.0932Z" />
              <path d="M29.8095 1.51164C30.0955 1.79098 31.7323 8.75344 32.7847 13.3811C33.0017 14.3353 32.4895 15.2953 31.618 15.7405C27.5488 17.8191 23.4294 21.5285 20.1705 25.0065C18.7438 26.5292 16.0829 25.3044 16.6423 23.2941C20.883 8.05419 29.4614 1.17155 29.8095 1.51164Z" />
              <circle cx="21.2836" cy="57.0519" r="7.67305" transform="rotate(-0.668189 21.2836 57.0519)" />
              <rect x="41.7262" y="17.4147" width="11.1672" height="0.797656" rx="0.398828" transform="rotate(-48.6682 41.7262 17.4147)" />
              <rect x="56.2226" y="29.2113" width="11.1672" height="0.797656" rx="0.398828" transform="rotate(-48.6682 56.2226 29.2113)" />
              <rect x="51.39" y="25.2338" width="7.2977" height="0.797656" rx="0.398828" transform="rotate(-48.6682 51.39 25.2338)" />
              <rect x="45.7551" y="20.8736" width="7.2977" height="0.797656" rx="0.398828" transform="rotate(-48.6682 45.7551 20.8736)" />
            </g>
          </g>
        </g>
        <image href={orbitLogo.src} x="40" y="40" width="280" height="280" />
        <g transform="rotate(-20 180 210)">
          <g ref={frontRef} opacity="0">
            <g className="orbit-logo__rocket" transform="translate(-38.5, -41) scale(0.6585)">
              <path d="M56.6023 33.3909L37.4638 17.8758C36.8086 17.3446 35.8754 17.2887 35.1598 17.7351C2.05975 38.3836 -0.597049 66.0475 2.44851 78.6756C2.64306 79.4823 3.36063 80.0483 4.18977 80.081C32.3184 81.1887 50.8493 51.8591 57.208 35.6217C57.5198 34.8255 57.2665 33.9294 56.6023 33.3909Z" />
              <path d="M73.7114 38.0932C70.4907 37.8626 65.1644 37.4499 61.8087 37.1865C60.8418 37.1106 59.9667 37.739 59.6527 38.6565C58.0574 43.3175 54.6881 48.9121 51.7355 53.2377C50.6348 54.8501 52.1484 56.9273 53.9313 56.1321C67.7824 49.9549 77.9215 38.3946 73.7114 38.0932Z" />
              <path d="M29.8095 1.51164C30.0955 1.79098 31.7323 8.75344 32.7847 13.3811C33.0017 14.3353 32.4895 15.2953 31.618 15.7405C27.5488 17.8191 23.4294 21.5285 20.1705 25.0065C18.7438 26.5292 16.0829 25.3044 16.6423 23.2941C20.883 8.05419 29.4614 1.17155 29.8095 1.51164Z" />
              <circle cx="21.2836" cy="57.0519" r="7.67305" transform="rotate(-0.668189 21.2836 57.0519)" />
              <rect x="41.7262" y="17.4147" width="11.1672" height="0.797656" rx="0.398828" transform="rotate(-48.6682 41.7262 17.4147)" />
              <rect x="56.2226" y="29.2113" width="11.1672" height="0.797656" rx="0.398828" transform="rotate(-48.6682 56.2226 29.2113)" />
              <rect x="51.39" y="25.2338" width="7.2977" height="0.797656" rx="0.398828" transform="rotate(-48.6682 51.39 25.2338)" />
              <rect x="45.7551" y="20.8736" width="7.2977" height="0.797656" rx="0.398828" transform="rotate(-48.6682 45.7551 20.8736)" />
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeNetworkId, setActiveNetworkId] = useState(NETWORK_OPTIONS[0].id);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isMobileNetworkOpen, setIsMobileNetworkOpen] = useState(false);
  const scrollLockRef = useRef(null);
  const closeMenuTimeoutRef = useRef(null);
  const networkMenuRef = useRef(null);
  const mobileNetworkMenuRef = useRef(null);
  const [seenDeposit, setDeposit] = React.useState(null); // Tracks deposit visibility
  const [USDTpusdtDeposit, setUSDTpusdtDeposit] = React.useState(null); // Tracks deposits for USDT-pUSDT
  const [seenReward, setReward] = React.useState(null); // Tracks reward visibility
  const [startTime, setstartTime] = React.useState(null); // Tracks contract start time
  const [lockTime, setlockTime] = React.useState(null); // Tracks contract lock time
  const [contract, setContract] = React.useState(null); // Stores the main contract instance
  const [stakingLogic, setStakingLogic] = React.useState(null); // Stores the main contract instance
  const [stakingStorage, setStakingStorage] = React.useState(null); // Stores the main contract instance
  const [addressAccount, setAddressAccount] = React.useState(null); // Stores the user's account address
  const [contractAddress, setContractAddress] = React.useState(null); // Stores the contract's address
  const [stakingStorageAddress, setstakingStorageAddress] = React.useState(null); // Stores the contract's address
  const [stakingLogicAddress, setstakingLogicAddress] = React.useState(null); // Stores the contract's address
  const [userPoints, setUserPoints] = useState('0');
  const [unstakeRequests, setUnstakeRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('stake'); // 'stake', 'unstake' or 'withdraw' tab in pop-up
  

  // Tokens and their contract instances
  const [usdt, setUsdt] = React.useState(null); // USDT token
  const [usdtcontract, setUSDTContract] = React.useState(null); // USDT contract
  const [weth, setWETH] = React.useState(null); // WETH token
  const [wethcontract, setWETHContract] = React.useState(null); // WETH contract
  const [usdc, setUSDC] = React.useState(null); // USDC token
  const [usdccontract, setUSDCContract] = React.useState(null); // USDC contract
  const [usdce, setUSDCe] = React.useState(null); // USDC.e token
  const [usdcecontract, setUSDCEContract] = React.useState(null); // USDC.e contract
  const [pusdt, setPUSDT] = React.useState(null); // pUSDT token
  const [pusdtcontract, setPUSDTContract] = React.useState(null); // pUSDT contract
  const [arb, setARB] = React.useState(null); // arb token
  const [arbcontract, setARBContract] = React.useState(null); // arb contract
  // State variables for user input
  const [inputValuedeposit, setInputValuedeposit] = React.useState(''); // Value to deposit
  const [inputvalueapprove, setInputValueapprove] = React.useState(''); // Value to approve
  

  // Function to initialize Web3 and load contract data
  const handleWeb3 = async () => {
      const data = await loadData(); // Call loadData to get Web3-related data

      // Update state with data from Web3
      setDeposit(data.stakedBalance); 
      setReward(data.pendingRewards); 
      setUserPoints(data.userPoints); 
      setUnstakeRequests(data.unstakeRequests); 
      setUSDTpusdtDeposit(data.USDTpusdtDeposit);
      setUSDTContract(data.usdt_Web3_Conection);
      setWETHContract(data.weth_Web3_Conection);
      setUSDCContract(data.usdc_Web3_Conection);
      setUSDCEContract(data.usdce_Web3_Conection);
      setPUSDTContract(data.pusdt_Web3_Conection);
      setARBContract(data.arb_Web3_Conection);

      setContract(data.Contract_Web3_Conection);
      setStakingStorage(data.StakingStorage);
      setStakingLogic(data.StakingLogic);

      setAddressAccount(data.addressAccount);

      setContractAddress(data.Contract_Address);
      setstakingStorageAddress(data.StakingStorage_Address);
      setstakingLogicAddress(data.StakingLogic_Address);


      setUsdt(data.usdt);
      setWETH(data.weth);
      setUSDC(data.usdc);
      setUSDCe(data.usdce);
      setPUSDT(data.pusdt);
      setARB(data.arb);
  };
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body;

    if (isMenuOpen) {
      scrollLockRef.current = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${scrollLockRef.current}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    } else if (scrollLockRef.current !== null) {
      const scrollPosition = scrollLockRef.current;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      window.scrollTo(0, scrollPosition);
      scrollLockRef.current = null;
    }

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    if (isMenuClosing) return;
    setIsMenuClosing(true);
    closeMenuTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
      closeMenuTimeoutRef.current = null;
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (closeMenuTimeoutRef.current) clearTimeout(closeMenuTimeoutRef.current);
    };
  }, []);
  const toggleNetworkMenu = () => {
    setIsNetworkOpen((prev) => !prev);
    setIsMobileNetworkOpen(false);
  };
  const toggleMobileNetworkMenu = () => {
    setIsMobileNetworkOpen((prev) => !prev);
    setIsNetworkOpen(false);
  };
  const closeNetworkMenus = () => {
    setIsNetworkOpen(false);
    setIsMobileNetworkOpen(false);
  };
  const activeNetwork =
    NETWORK_OPTIONS.find((option) => option.id === activeNetworkId) ?? NETWORK_OPTIONS[0];

  useEffect(() => {
    if (!isNetworkOpen && !isMobileNetworkOpen) return;
    const handleClickOutside = (event) => {
      const target = event.target;
      const desktopMenu = networkMenuRef.current;
      const mobileMenu = mobileNetworkMenuRef.current;
      const isInsideDesktop = desktopMenu && desktopMenu.contains(target);
      const isInsideMobile = mobileMenu && mobileMenu.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        closeNetworkMenus();
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeNetworkMenus();
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNetworkOpen, isMobileNetworkOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${hasScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
              <Link href="/" legacyBehavior>
                  <a className="logo-link orbit-logo-link" aria-label="Home">
                      <OrbitLogo />
                  </a>
              </Link>
          </div>
          <nav className="main-nav">
              <ul>
                  {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} legacyBehavior>
                        <a>{label}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
          </nav>
          <div className="header-actions">
            <div className="network-dropdown" ref={networkMenuRef}>
              <button
                type="button"
                className={`network-trigger ${isNetworkOpen ? 'is-open' : ''}`}
                onClick={toggleNetworkMenu}
                aria-haspopup="listbox"
                aria-expanded={isNetworkOpen}
              >
                <span className="network-trigger-left">
                  <Image
                    src={activeNetwork.logo}
                    width={18}
                    height={18}
                    alt=""
                    className="network-trigger-icon"
                  />
                  <span className="network-trigger-label">{activeNetwork.label}</span>
                </span>
                <span className="network-trigger-caret" aria-hidden="true" />
              </button>
              <div
                className={`network-menu ${isNetworkOpen ? 'is-open' : ''}`}
                role="listbox"
                aria-label="Select network"
              >
                {NETWORK_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`network-option ${
                      option.id === activeNetworkId ? 'is-active' : ''
                    }`}
                    role="option"
                    aria-selected={option.id === activeNetworkId}
                    onClick={() => {
                      setActiveNetworkId(option.id);
                      closeNetworkMenus();
                    }}
                  >
                    <Image
                      src={option.logo}
                      width={16}
                      height={16}
                      alt=""
                      className="network-option-icon"
                    />
                    <span className="network-option-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={handleWeb3} className="connect-wallet-btn">
              Connect wallet
            </button>
          </div>
          <button
            className={`burger-menu ${isMenuOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
              <span />
              <span />
              <span />
          </button>
        </div>
      </header>

      {typeof document !== 'undefined' && isMenuOpen && createPortal(
        <div
          id="mobile-nav"
          className={`mobile-nav-overlay is-open${isMenuClosing ? ' is-closing' : ''}`}
          aria-hidden={false}
          onClick={closeMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-nav-actions">
            <div className="network-dropdown" ref={mobileNetworkMenuRef}>
              <button
                type="button"
                className={`network-trigger ${isMobileNetworkOpen ? 'is-open' : ''}`}
                onClick={toggleMobileNetworkMenu}
                aria-haspopup="listbox"
                aria-expanded={isMobileNetworkOpen}
              >
                <span className="network-trigger-left">
                  <Image
                    src={activeNetwork.logo}
                    width={18}
                    height={18}
                    alt=""
                    className="network-trigger-icon"
                  />
                  <span className="network-trigger-label">{activeNetwork.label}</span>
                </span>
                <span className="network-trigger-caret" aria-hidden="true" />
              </button>
              <div
                className={`network-menu ${isMobileNetworkOpen ? 'is-open' : ''}`}
                role="listbox"
                aria-label="Select network"
              >
                {NETWORK_OPTIONS.map((option) => (
                  <button
                    key={`mobile-${option.id}`}
                    type="button"
                    className={`network-option ${
                      option.id === activeNetworkId ? 'is-active' : ''
                    }`}
                    role="option"
                    aria-selected={option.id === activeNetworkId}
                    onClick={() => {
                      setActiveNetworkId(option.id);
                      closeNetworkMenus();
                    }}
                  >
                    <Image
                      src={option.logo}
                      width={16}
                      height={16}
                      alt=""
                      className="network-option-icon"
                    />
                    <span className="network-option-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="connect-wallet-btn">
              Connect wallet
            </button>
          </div>
          <ul className="mobile-nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={`mobile-${href}`}>
                <Link href={href} legacyBehavior>
                  <a onClick={closeMenu}>{label}</a>
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
