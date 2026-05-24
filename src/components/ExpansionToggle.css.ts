import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

const ACCENT = '#7cb342';
const SKEW = 'skewX(-10deg)';
const UNSKEW = 'skewX(10deg)';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '6px',
});

export const toggleRow = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '8px',
});

// Skewed parallelogram to match the rarity pills (see RarityBox.css.ts).
export const toggleItem = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '5px 12px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backgroundColor: 'transparent',
  color: 'inherit',
  fontFamily: vars.fonts.heading,
  fontSize: 'clamp(11px, 1.7vw, 15px)',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  lineHeight: 1,
  cursor: 'pointer',
  transform: SKEW,
  transition:
    'background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
  selectors: {
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
});

// Counter-skew so the checkbox, icon, and label sit upright.
export const toggleInner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  transform: UNSKEW,
});

export const toggleItemEnabled = style({
  backgroundColor: 'rgba(124, 179, 66, 0.12)',
  borderColor: 'rgba(124, 179, 66, 0.55)',
  boxShadow: `0 0 8px rgba(124, 179, 66, 0.4)`,
});

export const toggleItemDisabled = style({
  opacity: 0.65,
});

export const checkBox = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '14px',
  height: '14px',
  fontSize: '10px',
  lineHeight: 1,
  flexShrink: 0,
});

export const checkBoxEnabled = style({
  backgroundColor: ACCENT,
  border: `1px solid ${ACCENT}`,
  color: '#161d1d',
});

export const checkBoxDisabled = style({
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: 'transparent',
});

export const expansionIcon = style({
  width: 'clamp(14px, 2.5vw, 18px)',
  height: 'clamp(14px, 2.5vw, 18px)',
  display: 'inline-block',
  flexShrink: 0,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  transition: 'filter 0.2s ease, opacity 0.2s ease',
});

export const expansionIconEnabled = style({
  filter: 'none',
  opacity: 1,
});

export const expansionIconDisabled = style({
  filter: 'grayscale(100%)',
  opacity: 0.6,
});
