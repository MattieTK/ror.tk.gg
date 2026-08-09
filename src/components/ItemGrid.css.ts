import { style } from '@vanilla-extract/css';

export const container = style({
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
});

export const grid = style({
  display: 'grid',
  gap: 'clamp(2px, 0.5vw, 8px)',
  gridTemplateColumns:
    'repeat(5, clamp(35px, calc(((100vw - 60px) / 5) * 0.75), 90px))',
  maxWidth: '75vw',
  width: 'auto',
  // Transparent so the command well's vignette is the single continuous
  // backdrop — otherwise multi-tier tabs (Void, Lunar) show a solid panel that
  // breaks against the gradient in the gaps between tiers.
  backgroundColor: 'transparent',
  padding: 'clamp(2px, 0.5vw, 8px)',
  boxSizing: 'border-box',
});
