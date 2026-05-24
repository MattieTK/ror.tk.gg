import { style } from '@vanilla-extract/css';

export const itemBox = style({
  position: 'relative',
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

// Dev-only overlay showing an item's sort position, for tuning order.
export const positionBadge = style({
  position: 'absolute',
  bottom: '1px',
  right: '2px',
  fontFamily: 'monospace',
  fontSize: '10px',
  lineHeight: 1,
  padding: '1px 3px',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  pointerEvents: 'none',
});

export const itemEnabled = style({
  opacity: 1,
});

export const itemDisabled = style({
  opacity: 0.2,
});