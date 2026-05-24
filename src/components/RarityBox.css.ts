import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

// RoR2's buttons are leftward parallelograms. The pill is skewed and its text
// is counter-skewed (rarityPillInner) so the label reads upright.
const SKEW = 'skewX(-10deg)';
const UNSKEW = 'skewX(10deg)';

export const rarityPill = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '5px 14px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  // The leading edge is the rarity colour (set inline); the skew turns it into
  // a slanted accent bar.
  borderLeftWidth: '3px',
  backgroundColor: 'transparent',
  color: 'inherit',
  textDecoration: 'none',
  cursor: 'pointer',
  fontFamily: vars.fonts.heading,
  fontSize: 'clamp(11px, 1.7vw, 15px)',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transform: SKEW,
  transition:
    'background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
  selectors: {
    '&:hover': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
});

export const rarityPillInner = style({
  display: 'inline-flex',
  alignItems: 'center',
  transform: UNSKEW,
});

// Search match count that slides out of the pill's right edge as a continuous
// part of the (skewed) button. Collapsed to zero width when no search is
// active; the left border becomes the slanted divider when open. Rapid linear
// slide.
export const rarityCount = style({
  display: 'inline-flex',
  alignItems: 'center',
  overflow: 'hidden',
  maxWidth: 0,
  opacity: 0,
  marginLeft: 0,
  paddingLeft: 0,
  borderLeft: '1px solid transparent',
  transition:
    'max-width 0.12s linear, opacity 0.12s linear, margin-left 0.12s linear, padding-left 0.12s linear',
});

export const rarityCountOpen = style({
  maxWidth: '44px',
  opacity: 1,
  marginLeft: '8px',
  paddingLeft: '8px',
  borderLeftColor: 'rgba(255, 255, 255, 0.4)',
});

export const rarityColors = {
  Common: '#c3c7ca',
  Uncommon: '#77c842',
  Equipment: '#d59235',
  Legendary: '#f75b47',
  Boss: '#b5cf29',
  Lunar: '#0066FF',
  Void: '#c267a9',
};
