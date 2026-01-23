import { useEffect, useState, useRef } from 'react';
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeNetworkId, setActiveNetworkId] = useState(NETWORK_OPTIONS[0].id);
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isMobileNetworkOpen, setIsMobileNetworkOpen] = useState(false);
  const scrollLockRef = useRef(null);
  const networkMenuRef = useRef(null);
  const mobileNetworkMenuRef = useRef(null);

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
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
                  <a className="logo-link" aria-label="Home">
                      <Image
                          src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68492fb235b07b4bcd6d03c1_Color-text-v2-2-(f)-3.png"
                          loading="lazy" width="181" height="64" alt="TwoPiR logo"
                      />
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
            <button type="button" className="connect-wallet-btn">
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

      <div
        id="mobile-nav"
        className={`mobile-nav-overlay ${isMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-nav-header">
          <Link href="/" legacyBehavior>
              <a className="logo-link" aria-label="Home" onClick={closeMenu}>
                  <Image
                      src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/68492fb235b07b4bcd6d03c1_Color-text-v2-2-(f)-3.png"
                      loading="lazy" width="160" height="56" alt="TwoPiR logo"
                  />
              </a>
          </Link>
        </div>
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
    </>
  );
}
