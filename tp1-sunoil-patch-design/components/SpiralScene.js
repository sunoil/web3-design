import React, { useEffect } from 'react';

import planetLogo from '../src/img/planet/planet-logo.png';
import arbLogo from '../src/img/planet/arb-logo.png';
import avalanceLogo from '../src/img/planet/avalance-logo.png';
import polygonLogo from '../src/img/planet/polygon-logo.png';
import opLogo from '../src/img/planet/op-logo.png';
import solLogo from '../src/img/planet/sol-logo.png';
import bscLogo from '../src/img/planet/bsc-logo.png';
import baseLogo from '../src/img/planet/base-logo.png';
import ethTokenLogo from '../src/img/planet/eth-logo.png';

export default function SpiralScene() {
  const ringRadius = 128;
  const ringStroke = 8;
  const ringEdgeRadius = ringRadius + ringStroke / 2;
  const maskRadius = 114;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const pathEl = document.getElementById('spiralPathTwopir');
    if (!pathEl) return;
    const cx = 500;
    const cy = 500;
    const startAngleDeg = -25;
    const startTheta = (startAngleDeg * Math.PI) / 180;
    const turns = 3.5;
    const spacingPerTurn = 118;
    const k = spacingPerTurn / (2 * Math.PI);
    const thetaEnd = startTheta + turns * Math.PI * 2;
    const a = ringEdgeRadius; // Start spiral path right at the ring edge
    const step = 0.032;
    let d = '';
    for (let t = startTheta, i = 0; t <= thetaEnd; t += step, i++) {
      const r = a + k * (t - startTheta);
      const x = cx + r * Math.cos(t);
      const y = cy + r * Math.sin(t);
      d += i === 0 ? `M${x.toFixed(2)} ${y.toFixed(2)}` : ` L${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    pathEl.setAttribute('d', d);
  }, []);

  // Animate planets along the spiral
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const svg = document.querySelector('.spiral-svg');
    const path = document.getElementById('spiralPathTwopir');
    if (!svg || !path) return;
    const dots = Array.from(svg.querySelectorAll('.spiral-planet'));
    // Ensure transitions are applied (in case CSS hasn't loaded yet)
    dots.forEach((el) => {
      el.style.willChange = 'opacity, transform';
      // We animate opacity ourselves, avoid double transitions here
      el.style.transition = 'transform 200ms ease';
      el.style.opacity = '0';
    });
    const totalLength = path.getTotalLength();
    const pxPerMs = 0.08;
    const segment = totalLength / Math.max(1, dots.length);
    let head = 0;
    let last = performance.now();

    const smoothstep = (t) => t * t * (3 - 2 * t);

    const tick = (now) => {
      const dt = now - last;
      last = now;
      head = (head + pxPerMs * dt) % totalLength;

      // Time constants for exponential smoothing (ms)
      const tauAlphaMs = 360; // larger => smoother opacity change
      const tauScaleMs = 200;
      const smoothingAlpha = 1 - Math.exp(-dt / tauAlphaMs);
      const smoothingScale = 1 - Math.exp(-dt / tauScaleMs);

      // Fade only at the very start and very end of the path
      const holdStart = 40;
      const fadeInDist = 140;
      const holdEnd = 40;
      const fadeOutDist = 140;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const offset = (head + i * segment) % totalLength;
        const pos = path.getPointAtLength(offset);
        const half = 36;
        dot.setAttribute('x', String(pos.x - half));
        dot.setAttribute('y', String(pos.y - half));

        let alphaTarget = 1;
        const distFromStart = offset;
        const distFromEnd = totalLength - offset;
        if (distFromStart <= holdStart) {
          alphaTarget = 0;
        } else if (distFromStart < holdStart + fadeInDist) {
          alphaTarget = smoothstep((distFromStart - holdStart) / fadeInDist);
        } else if (distFromEnd <= holdEnd) {
          alphaTarget = 0;
        } else if (distFromEnd < holdEnd + fadeOutDist) {
          alphaTarget = smoothstep((distFromEnd - holdEnd) / fadeOutDist);
        }

        const scaleTarget = 0.92 + 0.08 * alphaTarget; // subtle size easing

        const prevAlpha = parseFloat(dot.dataset.opa || '0');
        const prevScale = parseFloat(dot.dataset.sca || '0.92');

        const alpha = prevAlpha + (alphaTarget - prevAlpha) * smoothingAlpha;
        const scale = prevScale + (scaleTarget - prevScale) * smoothingScale;

        dot.dataset.opa = String(alpha);
        dot.dataset.sca = String(scale);

        dot.style.opacity = String(Math.max(0, Math.min(1, alpha)));
        dot.style.transform = `scale(${scale})`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="spiral-container" aria-hidden="true">
      <svg viewBox="-120 -120 1240 1240" preserveAspectRatio="xMidYMid meet" className="spiral-svg">
        <defs>
          <radialGradient id="planetGradientTwopir">
            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
          </radialGradient>
          <filter id="spiralGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tokenGlowStrong" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ffffff" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffffff" floodOpacity="0.45" />
          </filter>
          <filter id="ringGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="tokenGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ffffff" floodOpacity="0.35" />
          </filter>
          <filter id="planetGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#9aa0a6" floodOpacity="0.55" />
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ffffff" floodOpacity="0.25" />
          </filter>
          <mask id="cutCenter" maskUnits="userSpaceOnUse">
            <rect x="-120" y="-120" width="1240" height="1240" fill="white" />
            <circle cx="500" cy="500" r={maskRadius} fill="black" />
          </mask>
          <clipPath id="spiralClip">
            <rect x="-200" y="-200" width="1400" height="1400" />
          </clipPath>
        </defs>
        <g clipPath="url(#spiralClip)">
          <image href={planetLogo.src} x="388" y="388" width="224" height="224" preserveAspectRatio="xMidYMid meet" filter="url(#tokenGlow)" className="planet-center" data-animate-on-scroll data-animate="planet" />
          <path id="spiralPathTwopir" d="" fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" filter="url(#spiralGlow)" strokeDasharray="4 4" mask="url(#cutCenter)" />
          <circle id="planetRing" cx="500" cy="500" r={ringRadius} fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth={ringStroke} filter="url(#spiralGlow)" />
          <image className="spiral-planet" data-logo="arb" href={arbLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="ava" href={avalanceLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="poly" href={polygonLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="op" href={opLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="sol" href={solLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="bnb" href={bscLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="base" href={baseLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
          <image className="spiral-planet" data-logo="eth" href={ethTokenLogo.src} width="72" height="72" filter="url(#tokenGlow)" />
        </g>
      </svg>
    </div>
  );
}


