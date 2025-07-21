import { style } from '@vanilla-extract/css';

export const container = style({
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
});

export const grid = style({
  display: 'grid',
  gap: 'clamp(2px, 0.5vw, 8px)',
  gridTemplateColumns: 'repeat(5, clamp(35px, calc(((100vw - 60px) / 5) * 0.75), 90px))',
  maxWidth: '75vw',
  width: 'auto',
  backgroundColor: '#1a1616',
  padding: 'clamp(2px, 0.5vw, 8px)',
  boxSizing: 'border-box',
});