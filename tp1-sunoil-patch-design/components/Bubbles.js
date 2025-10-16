import React from 'react';

/**
 * Reusable bubbles background component.
 * Pass an array of bubble specs with size and position.
 * Example bubble: { size: 200, left: '20%', top: '30%' } or { size: 160, right: '10%', bottom: '15%' }
 * Set className on the container to control z-index/animation via CSS.
 */
export default function Bubbles({ className = '', bubbles = [], style = {} }) {
  return (
    <div className={className} style={style} aria-hidden="true">
      {bubbles.map((b, i) => {
        const size = typeof b.size === 'number' ? `${b.size}px` : b.size;
        const s = {
          width: size,
          height: size,
          left: b.left,
          top: b.top,
          right: b.right,
          bottom: b.bottom,
          transform: b.center ? 'translate(-50%, -50%)' : b.transform,
          borderRadius: '50%'
        };
        return <span key={i} className="bubble" style={s} />;
      })}
    </div>
  );
}


