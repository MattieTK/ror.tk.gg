import { style } from '@vanilla-extract/css';

export const itemBox = style({
  border: '#7e7f7f 1px solid',
  margin: '0',
  padding: 'clamp(1px, 0.2vw, 2px)',
  width: '100%',
  aspectRatio: '1',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  boxSizing: 'border-box',
});

export const itemAccessible = style({
  opacity: 1,
  filter: 'none',
  cursor: 'default',
});

export const itemInaccessible = style({
  opacity: 0.6,
  filter: 'grayscale(100%)',
  cursor: 'not-allowed',
});

export const positionText = style({
  margin: 0,
});