import { keyframes, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

const fadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(4px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

// Translucent angular panel. The leading edge colour is set inline from the
// item's rarity so the tooltip reads as part of that rarity, matching the
// pill/toggle language.
export const hoverBox = style({
  position: 'absolute',
  color: vars.colors.text,
  backgroundColor: 'rgba(18, 24, 24, 0.92)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  borderLeftWidth: '3px',
  padding: '10px 12px',
  zIndex: 1000,
  maxWidth: '340px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
  animation: `${fadeIn} 0.12s ease-out`,
  // The tooltip tracks the cursor; never let it intercept the mouse.
  pointerEvents: 'none',
});

export const hoverBoxTitle = style({
  fontSize: '20px',
  fontFamily: vars.fonts.heading,
  lineHeight: 1.1,
  marginBottom: '6px',
  // Leave room for the expansion indicator pinned to the top-right corner.
  paddingRight: '26px',
});

// Marks the item as belonging to an expansion. Pinned to the panel's top-right;
// shows the DLC icon when one exists, otherwise the short name (e.g. "AC").
export const hoverBoxExpansion = style({
  position: 'absolute',
  top: '8px',
  right: '10px',
  display: 'flex',
  alignItems: 'center',
  fontFamily: vars.fonts.heading,
  fontSize: '11px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  opacity: 0.8,
});

export const hoverBoxExpansionIcon = style({
  width: '18px',
  height: '18px',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

export const hoverBoxDescription = style({
  fontSize: '15px',
  lineHeight: 1.45,
});

// Numeric values pulled out of the description text, lit like in-game stat text.
export const hoverBoxValue = style({
  color: '#e8c66b',
  fontWeight: 600,
});

// Survivor-specific "why it fits" note for a build pick, set off below the
// item description.
export const hoverBoxReason = style({
  marginTop: '8px',
  paddingTop: '8px',
  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
  fontSize: '14px',
  fontStyle: 'italic',
  lineHeight: 1.4,
  color: '#9fd0a0',
});
