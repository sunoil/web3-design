// Import necessary modules
import Head from 'next/head'; 
import React from 'react'; 

import Link from 'next/link'; 
import Image from 'next/image'; 
import NetworksStatusBoard from '../components/NetworksStatusBoard';
import CardsCarousel from '../components/CardsCarousel';
import planetLogo from '../src/img/planet/planet-logo.png';
import arbLogo from '../src/img/planet/arb-logo.png';
import avalanceLogo from '../src/img/planet/avalance-logo.png';
import polygonLogo from '../src/img/planet/polygon-logo.png';
import opLogo from '../src/img/planet/op-logo.png';
import solLogo from '../src/img/planet/sol-logo.png';
import baseLogo from '../src/img/planet/base-logo.png';
import ethTokenLogo from '../src/img/planet/eth-logo.png';
import bscLogo from '../src/img/planet/bsc-logo.png';
import xrpLogo from '../src/img/planet/xrp-logo.png';
import { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpiralScene from '../components/SpiralScene';

export default function Home() {
  
  const heroMotionRef = useRef({
    targetDX: 0,
    targetDY: 0,
    dx: 0,
    dy: 0,
    targetX: 50,
    targetY: 50,
    pointerX: 50,
    pointerY: 50,
  });
  const heroSectionRef = useRef(null);
  const heroFieldRef = useRef(null);
  const heroBubblesRef = useRef([]);
  const pointerFrameRef = useRef(null);
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const [isHeroMotionEnabled, setIsHeroMotionEnabled] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const elements = document.querySelectorAll('[data-animate-on-scroll]');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroFieldRef.current) return;
    heroBubblesRef.current = Array.from(heroFieldRef.current.querySelectorAll('.hero-gooey'));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    const update = () => setIsHeroMotionEnabled(!media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    const section = heroFieldRef.current;
    if (!section) return;

    let frame;
    const tick = () => {
      const motion = heroMotionRef.current;
      motion.dx += (motion.targetDX - motion.dx) * 0.1;
      motion.dy += (motion.targetDY - motion.dy) * 0.1;
      motion.pointerX += (motion.targetX - motion.pointerX) * 0.1;
      motion.pointerY += (motion.targetY - motion.pointerY) * 0.1;

      section.style.setProperty('--hero-motion-dx', `${motion.dx}px`);
      section.style.setProperty('--hero-motion-dy', `${motion.dy}px`);
      section.style.setProperty('--hero-pointer-x', `${motion.pointerX}%`);
      section.style.setProperty('--hero-pointer-y', `${motion.pointerY}%`);

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    return () => {
      if (pointerFrameRef.current) {
        cancelAnimationFrame(pointerFrameRef.current);
        pointerFrameRef.current = null;
      }
    };
  }, []);

  const updateHeroPointer = () => {
    const section = heroSectionRef.current;
    if (!section) return;
    const { x: clientX, y: clientY } = lastPointerRef.current;
    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const motion = heroMotionRef.current;
    motion.targetDX = dx;
    motion.targetDY = dy;
    motion.targetX = x;
    motion.targetY = y;

    if (!heroBubblesRef.current.length && heroFieldRef.current) {
      heroBubblesRef.current = Array.from(
        heroFieldRef.current.querySelectorAll('.hero-gooey'),
      );
    }
    heroBubblesRef.current.forEach((bubble) => {
      const bubbleRect = bubble.getBoundingClientRect();
      const bubbleX = bubbleRect.left + bubbleRect.width / 2;
      const bubbleY = bubbleRect.top + bubbleRect.height / 2;
      const distance = Math.hypot(clientX - bubbleX, clientY - bubbleY);
      const maxDistance = Math.max(bubbleRect.width, bubbleRect.height) * 3.2;
      const intensity = Math.max(0, Math.min(1, 1 - distance / maxDistance));
      bubble.style.setProperty('--hero-pointer-intensity', intensity.toFixed(3));
    });
  };

  const handleHeroPointerMove = (event) => {
    if (!isHeroMotionEnabled) return;
    lastPointerRef.current = { x: event.clientX, y: event.clientY };
    if (pointerFrameRef.current) return;
    pointerFrameRef.current = requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      updateHeroPointer();
    });
  };

  const handleHeroPointerLeave = () => {
    if (!isHeroMotionEnabled) return;
    const motion = heroMotionRef.current;
    motion.targetDX = 0;
    motion.targetDY = 0;
    motion.targetX = 50;
    motion.targetY = 50;

    heroBubblesRef.current.forEach((bubble) => {
      bubble.style.setProperty('--hero-pointer-intensity', '0');
    });
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />  
        <title>Salexey&#x27;s Stupendous Site</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="Webflow" name="generator" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
        <link href="/webclip.png" rel="apple-touch-icon" />
      </Head>

      <div className ="body">
        <div className ="page-5">
            <Header />
            <div className ="first-section-3"
                 ref={heroSectionRef}
                 onPointerMove={handleHeroPointerMove}
                 onPointerLeave={handleHeroPointerLeave}>
                <div className="hero-bg-layer" aria-hidden="true">
                    <div className="hero-blob-field" aria-hidden="true" ref={heroFieldRef}>
                      <span className="hero-gooey hero-gooey--a" />
                      <span className="hero-gooey hero-gooey--b" />
                      <span className="hero-gooey hero-gooey--c" />
                      <span className="hero-gooey hero-gooey--d" />
                      <span className="hero-gooey hero-gooey--e" />
                      <span className="hero-gooey hero-gooey--f" />
                      <span className="hero-gooey hero-gooey--g" />
                      <span className="hero-gooey hero-gooey--h" />
                      <span className="hero-gooey hero-gooey--i" />
                      <span className="hero-gooey hero-gooey--j" />
                    </div>
                    <div className="hero-cloud hero-cloud-1" />
                    <div className="hero-cloud hero-cloud-2" />
                    <div className="hero-cloud hero-cloud-3" />
                    <img src={arbLogo.src} alt="" className="bg-coin coin-arb" />
                    <img src={avalanceLogo.src} alt="" className="bg-coin coin-ava" />
                    <img src={polygonLogo.src} alt="" className="bg-coin coin-poly" />
                    <img src={opLogo.src} alt="" className="bg-coin coin-op" />
                    <img src={solLogo.src} alt="" className="bg-coin coin-sol" />
                    <img src={bscLogo.src} alt="" className="bg-coin coin-bnb" />
                    <img src={xrpLogo.src} alt="" className="bg-coin coin-xrp" />
                    <img src={baseLogo.src} alt="" className="bg-coin coin-base" />
                    <img src={ethTokenLogo.src} alt="" className="bg-coin coin-eth" />

                    {/* Extra coins for mobile-only "around headline" density */}
                    <img src={avalanceLogo.src} alt="" className="bg-coin coin-ava-2 coin-extra" />
                    <img src={arbLogo.src} alt="" className="bg-coin coin-arb-2 coin-extra" />
                    <img src={opLogo.src} alt="" className="bg-coin coin-op-2 coin-extra" />
                    <img src={bscLogo.src} alt="" className="bg-coin coin-bnb-2 coin-extra" />
                    <img src={xrpLogo.src} alt="" className="bg-coin coin-xrp-2 coin-extra" />
                    <img src={ethTokenLogo.src} alt="" className="bg-coin coin-eth-2 coin-extra" />
                    <img src={polygonLogo.src} alt="" className="bg-coin coin-poly-2 coin-extra" />
                    <img src={solLogo.src} alt="" className="bg-coin coin-sol-2 coin-extra" />
                </div>
                <div className ="container-29">
                    <div className ="column-75">
                        <div className ="content-style-9">
                            <h1 className ="text-167" data-animate-on-scroll data-animate="heading" data-size="lg"><span className ="text-11-6">Grow</span><span className ="text-11-7"> your yield </span><span className ="text-11-8">securely </span><span className ="text-11-7">and more </span><span className ="text-11-8">profitably</span><span className ="text-11-7"> than a traditional </span><span className ="text-11-6">bank</span><span className ="text-11-7"> deposit</span></h1>
                        </div>
                        <h2 className ="text-168" data-animate-on-scroll data-animate="heading" data-size="md">Maximize your returns with our secure and efficient DeFi platform</h2>
                        <Link href="/my-deposit" legacyBehavior>
                          <a className ="button-style-3 launch-dapp-btn">
                            <div className ="stake-now-8 label">LAUNCH DAPP</div>
                          </a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className ="about-twopir-3">
                <div className="about-blobs" aria-hidden="true">
                    <span className="about-blob about-blob--1" />
                    <span className="about-blob about-blob--2" />
                    <span className="about-blob about-blob--3" />
                </div>
                    <div className ="frame-46">
                    <h2 className ="text-169" data-animate-on-scroll data-animate="heading" data-size="md"><span className ="about-twopir-4">About </span><span className ="about-twopir-5">TwoPiR</span></h2>
                    <div style={{ height: 16 }} aria-hidden="true" />
                    <div className ="frame-48">
                        <div className ="text-169" data-animate-on-scroll data-animate="heading" data-size="sm">
                            <div className ="text-169"><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-4">TwoPiR
                                    is an </span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-5">innovative
                                    crypto banking</span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-4">
                                    that maximizes your earnings on deposits through flexible staking and yield
                                    optimization. Using advanced algorithms, it identifies top opportunities for
                                </span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-6">high
                                    returns with minimal risk</span><span
                                    className ="twopir-is-an-innovative-crypto-banking-that-maximizes-your-earnings-on-deposits-through-flexible-sta-4">,
                                    supporting diverse tokens and prioritizing security.</span>
                                    </div>
                        </div>
                    </div>
                </div><img
                    src="https://cdn.prod.website-files.com/66c9e08a6edbb91f35dede99/6849307b31c820220acb1b27_Color-v2-1.png"
                    loading="lazy" width="403.3171691894531" height="405.62713623046875" alt=""
                    className ="color-text-v2-2-f-4 about-planet"
                    data-animate-on-scroll data-animate="about-planet" />
            </div>
            <div className ="second-section-3">
                <div className="networks-section-heading" data-animate-on-scroll>
                    <h2 className ="text-169" data-animate-on-scroll data-animate="heading" data-size="md">
                        <span className ="track-of-the-progress-and-tvl-of-supported-networks-7">Track of the </span>
                        <span className ="track-of-the-progress-and-tvl-of-supported-networks-8">Progress</span>
                        <span className ="track-of-the-progress-and-tvl-of-supported-networks-7"> and </span>
                        <span className ="track-of-the-progress-and-tvl-of-supported-networks-9">TVL $</span>
                        <span className ="track-of-the-progress-and-tvl-of-supported-networks-7"> of Supported Networks</span>
                    </h2>
                </div>
                <div className="networks-grid">
                        <div className="networks-left">
                  <SpiralScene />
                    </div>
                    <div className="networks-right">
                        <NetworksStatusBoard />
                    </div>
                </div>
            </div>
            <div className ="video-section-3">
                <div className="metamask-guide">
                    <div className="metamask-title-box" data-animate-on-scroll>
                        <h2 className="metamask-title text-169" data-animate-on-scroll data-animate="heading" data-size="md">
                            <span className ="guide-for-starting-metamask-setup-2">Guide </span>
                            <span className ="track-of-the-progress-and-tvl-of-supported-networks-7">for starting </span>
                            <span className ="track-of-the-progress-and-tvl-of-supported-networks-8">MetaMask </span>
                            <span className ="track-of-the-progress-and-tvl-of-supported-networks-7">setup</span>
                        </h2>
                    </div>

                    <div className="metamask-cards" data-animate-on-scroll>
                        <video
                            className="metamask-card metamask-card--mobile"
                            controls
                            playsInline
                            preload="metadata"
                            src="/video/Video_gidePhone.mp4"
                        />

                        <div className="metamask-forpc">For PC:</div>

                        <video
                            className="metamask-card metamask-card--pc"
                            controls
                            playsInline
                            preload="metadata"
                            src="/video/Video_gidePC.mp4"
                        />
                    </div>
                </div>
            </div>
            <div className ="third-section-3">
                <div className="rewards-grid">
                    <div className ="rewards-left">
                        <div className="rewards-intro" data-animate-on-scroll>
                            <h2 className="rewards-title" data-animate-on-scroll data-animate="heading">
                                <span className="rewards-title__brand">TwoPiR</span>{' '}
                                <span className="rewards-title__rest">Rewards Program</span>
                            </h2>
                            <p className="rewards-copy">
                                Introducing the <span className="rewards-copy__brand">TwoPiR</span> Rewards Program!
                                Participants can earn points through engaging in various on-chain activities. These points
                                will be converted into <span className="rewards-copy__token">PIR</span> tokens, giving you the
                                opportunity to maximize your rewards and become part of our growing ecosystem. Stay tuned
                                for more updates!
                            </p>
                        </div>
                    </div>
                    <div className="rewards-right" data-animate-on-scroll>
                        <CardsCarousel />
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
        
        
         <div
          data-animation="default"
          data-collapse="medium"
          data-duration={400}
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar-logo-left-14 w-nav"
         >
          <div className="navbarcontainer-11 w-container">
            <div className="w-nav-button">
              <div className="w-icon-nav-menu" />
            </div>
          </div>
         </div>
    </div>
    </>
  )
}



