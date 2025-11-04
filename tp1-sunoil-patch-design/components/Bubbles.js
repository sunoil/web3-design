import React, { useEffect, useMemo, useState } from 'react';

const DEFAULT_OFFSET = { x: 0, y: 0, scale: 1 };

function createInitialOffsets(count) {
  return Array.from({ length: count }, () => ({ ...DEFAULT_OFFSET }));
}

function extractNumericSize(size) {
  if (typeof size === 'number') return size;
  if (typeof size === 'string') {
    const parsed = parseFloat(size);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function buildMotionConfig(bubble) {
  const numericSize = extractNumericSize(bubble.size);
  const amplitudeBase = Number.isFinite(numericSize)
    ? Math.min(Math.max(numericSize * 0.055, 8), 28)
    : 12;
  const wiggle = bubble.wiggle || {};

  const ampX = wiggle.x ?? amplitudeBase;
  const ampY = wiggle.y ?? amplitudeBase * 0.75;
  const ampScale = wiggle.scale ?? Math.min(0.12, Math.max(0.02, amplitudeBase / 220));

  return {
    phaseX: Math.random() * Math.PI * 2,
    phaseY: Math.random() * Math.PI * 2,
    phaseScale: Math.random() * Math.PI * 2,
    phaseX2: Math.random() * Math.PI * 2,
    phaseY2: Math.random() * Math.PI * 2,
    speedX: 0.08 + Math.random() * 0.16,
    speedY: 0.06 + Math.random() * 0.14,
    speedScale: 0.04 + Math.random() * 0.08,
    speedX2: 0.05 + Math.random() * 0.1,
    speedY2: 0.04 + Math.random() * 0.08,
    ampX,
    ampY,
    ampScale,
    ampX2: ampX * 0.45,
    ampY2: ampY * 0.55
  };
}

function calculateOffset(config, t) {
  return {
    x:
      Math.sin(config.phaseX + t * config.speedX) * config.ampX +
      Math.sin(config.phaseX2 + t * config.speedX2) * config.ampX2,
    y:
      Math.cos(config.phaseY + t * config.speedY) * config.ampY +
      Math.sin(config.phaseY2 + t * config.speedY2) * config.ampY2,
    scale: 1 + Math.sin(config.phaseScale + t * config.speedScale) * config.ampScale
  };
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);

    handleChange();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Pass an array of bubble specs with size and position.
 * Example bubble: { size: 200, left: '20%', top: '30%' } or { size: 160, right: '10%', bottom: '15%' }
 * Set className on the container to control z-index/animation via CSS.
 */
export default function Bubbles({ className = '', bubbles = [], style = {} }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const bubbleSignature = useMemo(
    () =>
      JSON.stringify(
        bubbles.map((b) => [b.size, b.left, b.top, b.right, b.bottom, b.center, b.wiggle])
      ),
    [bubbles]
  );

  const motionConfigs = useMemo(
    () => bubbles.map((bubble) => buildMotionConfig(bubble)),
    [bubbleSignature]
  );

  const [offsets, setOffsets] = useState(() => createInitialOffsets(bubbles.length));

  useEffect(() => {
    setOffsets(createInitialOffsets(bubbles.length));
  }, [bubbleSignature, bubbles.length]);

  useEffect(() => {
    if (prefersReducedMotion || motionConfigs.length === 0) {
      setOffsets(createInitialOffsets(motionConfigs.length));
      return undefined;
    }

    if (typeof window === 'undefined') {
      return undefined;
    }

    let animationFrame;

    const update = (timestamp) => {
      const t = timestamp * 0.001; // convert to seconds for smoother params
      setOffsets(motionConfigs.map((config) => calculateOffset(config, t)));
      animationFrame = window.requestAnimationFrame(update);
    };

    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [motionConfigs, prefersReducedMotion]);

  return (
    <div className={className} style={style} aria-hidden="true">
      {bubbles.map((b, i) => {
        const size = typeof b.size === 'number' ? `${b.size}px` : b.size;
        const offset = offsets[i] || DEFAULT_OFFSET;
        const baseTransform = b.center ? 'translate(-50%, -50%)' : b.transform || '';
        const liquidTransform = prefersReducedMotion
          ? baseTransform
          : `${baseTransform ? `${baseTransform} ` : ''}translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0) scale(${offset.scale.toFixed(3)})`;
        const transformValue = liquidTransform && liquidTransform.trim().length > 0 ? liquidTransform : undefined;

        const s = {
          width: size,
          height: size,
          left: b.left,
          top: b.top,
          right: b.right,
          bottom: b.bottom,
          borderRadius: '50%',
          willChange: prefersReducedMotion ? undefined : 'transform',
          ...b.style
        };

        if (transformValue) {
          s.transform = transformValue;
        }

        if (!transformValue && baseTransform) {
          s.transform = baseTransform;
        }

        if (typeof b.opacity === 'number') {
          s.opacity = b.opacity;
        }

        if (b.background) {
          s.background = b.background;
        }

        return <span key={i} className="bubble" style={s} />;
      })}
    </div>
  );
}


