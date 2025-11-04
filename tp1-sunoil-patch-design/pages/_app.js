import '../public/css/normalize.css';
import '../public/css/webflow.css';
import '../public/css/yield-02a248.webflow.css';
import '../public/css/custom-base.css';
import '../public/css/custom-components.css';
import '../public/css/custom-animations.css';
import Head from 'next/head';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const rootSelector = '[data-animate-on-scroll]';
    const textSelector = 'h1,h2,h3,h4,h5,h6,p,div[class^="text-"],span[class^="text-"]';

    function maxFontSize(el) {
      let max = 0;
      const nodes = [];
      if (el.matches(textSelector)) nodes.push(el);
      nodes.push(...el.querySelectorAll(textSelector));
      nodes.forEach((n) => {
        const size = parseFloat(window.getComputedStyle(n).fontSize) || 0;
        if (size > max) max = size;
      });
      if (!max) max = parseFloat(window.getComputedStyle(el).fontSize) || 16;
      return max;
    }

    const blocks = Array.from(document.querySelectorAll(rootSelector));
    const sizes = blocks.map((b) => maxFontSize(b));
    const maxSize = sizes.length ? Math.max(...sizes) : 0;

    // Pre-assign transition delays so bigger typography reveals first
    blocks.forEach((b, i) => {
      const size = sizes[i];
      const delay = Math.min(480, Math.max(0, Math.round((maxSize - size) * 12)));
      b.style.transitionDelay = `${delay}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });

    blocks.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </Head>
      {/* Global background bubbles behind all pages */}
      <div className="global-bubbles" aria-hidden="true">
        <span className="bubble b1" />
        <span className="bubble b2" />
        <span className="bubble b3" />
        <span className="bubble b4" />
        <span className="bubble b5" />
        <span className="bubble b6" />
        <span className="bubble b7" />
        <span className="bubble b8" />
        <span className="bubble b9" />
        <span className="bubble b10" />
      </div>
      <div className="app-root">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
