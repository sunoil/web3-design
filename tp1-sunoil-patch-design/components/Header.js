import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/stake', label: 'Stake' },
  { href: '/my-deposit', label: 'My deposit' },
  { href: '/docs', label: 'Docs' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollLockRef = useRef(null);

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
