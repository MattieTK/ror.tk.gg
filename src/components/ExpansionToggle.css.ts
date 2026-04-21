import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px', // 1 * 4px
});

export const expansionIcon = style({
  cursor: 'pointer',
  width: 'clamp(12px, 3vw, 20px)',
  height: 'clamp(12px, 3vw, 20px)',
  margin: 'clamp(2px, 0.5vw, 4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

export const expansionIconEnabled = style({
  border: '1px white solid',
  filter: 'none',
  opacity: 1,
});

export const expansionIconDisabled = style({
  border: '1px transparent solid',
  filter: 'grayscale(100%)',
  opacity: 0.6,
});