import React, { useEffect, useRef, useState } from 'react';

const CARDS = [
  {
    title: 'Deposit',
    text: 'Deposit your funds to start earning exclusive TwoPiR reward tokens effortlessly',
    indexHint: '1/3',
  },
  {
    title: 'Claim',
    text: 'Claim your TwoPiR tokens during the listing and enjoy exciting earning opportunities.',
    indexHint: '3/3',
  },
  {
    title: 'Hold',
    text: 'Hold your tokens to maximize your rewards. The longer you hold, the more you earn',
    indexHint: '2/3',
  },
];

export default function CardsCarousel() {
  // basePhase = where the cards are parked; anim adds transient movement toward next vertex
  const [basePhase, setBasePhase] = useState(2/3);
  const [anim, setAnim] = useState(0); // 0..1 of a single step
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState(0);
  const [animSteps, setAnimSteps] = useState(1); // how many vertices to pass during current animation
  const autoTimerRef = useRef(null);
  const rafRef = useRef(0);

  function scheduleAuto() {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    autoTimerRef.current = setTimeout(() => startStep(), 5000);
  }

  function resetAutoTimer() {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }

  useEffect(() => {
    scheduleAuto();
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); cancelAnimationFrame(rafRef.current); };
  }, []);

  function startStep(steps = 1) {
    resetAutoTimer();
    if (animating) { scheduleAuto(); return; }
    setAnimating(true);
    setAnimSteps(steps);
    let last = performance.now();
    const duration = 3000 * steps;
    let progress = 0;
    const loop = (now) => {
      const dt = (now - last) / duration;
      last = now;
      const nextProgress = Math.min(1, progress + dt);
      const nearEnd = nextProgress > 0.92;
      progress = nearEnd ? progress + (dt * 0.72) : nextProgress;
      setAnim(progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        setAnim(1);
        rafRef.current = requestAnimationFrame(() => {
          setBasePhase((b) => (b + steps / CARDS.length) % 1);
          setAnim(0);
          setAnimating(false);
          scheduleAuto();
        });
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }

  const areaW = 600; // px
  const areaH = 260; // px
  const cardW = 260; // px
  const pts = [
    { x: -190, y: 30 }, // top-left
    { x:  160, y: 30 }, // top-right
    { x:    0, y: 190 }, // bottom-middle
  ];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function posAlong(t) {
    const n = pts.length;
    if (n === 0) return { x: 0, y: 0 };
    // Centripetal Catmull-Rom through control points (closed loop)
    const tt = ((t % 1) + 1) % 1; // normalize to [0,1)
    const segFloat = tt * n;
    const seg = Math.floor(segFloat) % n; // 0..n-1
    const u = segFloat - seg; // local [0,1)

    const i0 = (seg - 1 + n) % n;
    const i1 = seg;
    const i2 = (seg + 1) % n;
    const i3 = (seg + 2) % n;
    const P0 = pts[i0];
    const P1 = pts[i1];
    const P2 = pts[i2];
    const P3 = pts[i3];

    const alpha = 0.5; // centripetal to avoid overshoot/loops
    const d01 = Math.hypot(P1.x - P0.x, P1.y - P0.y) ** alpha;
    const d12 = Math.hypot(P2.x - P1.x, P2.y - P1.y) ** alpha;
    const d23 = Math.hypot(P3.x - P2.x, P3.y - P2.y) ** alpha;

    const t0 = 0;
    const t1 = t0 + d01;
    const t2 = t1 + d12;
    const t3 = t2 + d23;
    const tLocal = t1 + u * (t2 - t1);

    function lerpPt(A, B, ta, tb, tcur) {
      const w = (tcur - ta) / (tb - ta || 1);
      return { x: A.x + (B.x - A.x) * w, y: A.y + (B.y - A.y) * w };
    }

    const A1 = lerpPt(P0, P1, t0, t1, tLocal);
    const A2 = lerpPt(P1, P2, t1, t2, tLocal);
    const A3 = lerpPt(P2, P3, t2, t3, tLocal);
    const B1 = lerpPt(A1, A2, t0, t2, tLocal);
    const B2 = lerpPt(A2, A3, t1, t3, tLocal);
    const C =  lerpPt(B1, B2, t1, t2, tLocal);
    return C;
  }

  function easeInOutQuint(t) {
    return t < 0.5
      ? 16 * t * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 5) / 2;
  }
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  const items = CARDS.map((c, idx) => {
    const eased = easeOutExpo(anim);
    const effectivePhase = (basePhase + eased * (animSteps / CARDS.length)) % 1;
    const t = (effectivePhase + idx / CARDS.length) % 1;
    const { x, y } = posAlong(t);
    return { c, idx, x, y };
  });

  const minY = Math.min(...items.map(it => it.y));
  const maxY = Math.max(...items.map(it => it.y));
  const denomY = Math.max(1, maxY - minY);
  const itemsWithScale = items.map(it => {
    const t = (it.y - minY) / denomY; // 0 at top, 1 at bottom
    const minScale = 0.92;
    const maxScale = 1.06;
    const s = minScale + t * (maxScale - minScale);
    return { ...it, s };
  });

  // active = the one with largest y (lowest on screen). In tie, pick closest to center x.
  const best = items.reduce((bestIdx, it, i, arr) => {
    if (bestIdx === -1) return i;
    const b = arr[bestIdx];
    if (it.y > b.y + 1) return i;
    if (Math.abs(it.y - b.y) <= 1 && Math.abs(it.x) < Math.abs(b.x)) return i;
    return bestIdx;
  }, -1);
  useEffect(() => {
    if (best !== active) setActive(best);
  }, [best, active]);

  const offsetX = 150;
  const offsetY = 90; 

  return (
    <div className="cards-triangle-root" data-animate-on-scroll style={{ '--area-w': `${areaW}px`, '--area-h': `${areaH}px` }}>
      <div className="cards-triangle-area">
        {itemsWithScale.map(({ c, idx, x, y, s }) => (
          <div
            key={c.title}
            className={`triangle-card ${idx === active ? 'is-active' : ''}`}
            style={{ transform: `translate(calc(50% + ${x + offsetX}px), calc(50% + ${y + offsetY}px)) translate(-50%, -50%) scale(${s})`, zIndex: 1000 + Math.round(y) }}
          >
            <div className="cc-title">{c.title}</div>
            <div className="cc-text">{c.text}</div>
            <div className="cc-progress">
              <span className="cc-progress-fill" />
              <span className="cc-step">{c.indexHint}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


