import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

const MOBILE = 'screen and (max-width: 768px)';

// Tab + filters bar shown only on mobile.
export const mobileBar = style({
  display: 'none',
  '@media': {
    [MOBILE]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '12px',
    },
  },
});

export const tabSwitch = style({
  display: 'flex',
  gap: '6px',
});

const barButton = {
  padding: '6px 14px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backgroundColor: 'transparent',
  color: 'inherit',
  fontFamily: vars.fonts.heading,
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  cursor: 'pointer',
} as const;

export const tabButton = style(barButton);

export const tabButtonActive = style({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderColor: 'rgba(255, 255, 255, 0.4)',
});

export const filtersButton = style(barButton);

// Rarities + Expansions live here. On desktop it's the inline header row; on
// mobile it becomes an off-canvas drawer toggled by controlsBarOpen.
export const controlsBar = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '20px',
  flexWrap: 'wrap',
  gap: '12px',
  '@media': {
    [MOBILE]: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '80%',
      maxWidth: '320px',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      gap: '24px',
      margin: 0,
      padding: '20px',
      backgroundColor: '#0f1414',
      borderRight: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.5)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.25s ease',
      zIndex: 200,
      overflowY: 'auto',
    },
  },
});

export const controlsBarOpen = style({
  '@media': {
    [MOBILE]: {
      transform: 'translateX(0)',
    },
  },
});

export const drawerBackdrop = style({
  display: 'none',
  '@media': {
    [MOBILE]: {
      display: 'block',
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 150,
    },
  },
});

// Close button inside the drawer; only meaningful on mobile.
export const drawerClose = style({
  display: 'none',
  '@media': {
    [MOBILE]: {
      display: 'block',
      alignSelf: 'flex-end',
      background: 'transparent',
      border: 'none',
      color: 'inherit',
      fontSize: '24px',
      lineHeight: 1,
      cursor: 'pointer',
      padding: 0,
    },
  },
});

// Three-column band: an empty left spacer and the right build column both take
// equal flexible width, so the centre grid stays visually centred in the
// viewport while the build column right-aligns under the Expansions controls.
export const mainArea = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '24px',
  '@media': {
    [MOBILE]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 0,
    },
  },
});

// Balances the right build column so the grid centres. Desktop only.
export const desktopSpacer = style({
  flex: 1,
  '@media': {
    [MOBILE]: { display: 'none' },
  },
});

export const gridPanel = style({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'space-around',
  width: 'min-content',
  '@media': {
    [MOBILE]: {
      width: '100%',
    },
  },
});

export const buildCol = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '@media': {
    [MOBILE]: {
      flexGrow: 0,
      width: '100%',
    },
  },
});

// Hides an element only on mobile (used to show one tab panel at a time).
export const mobileHidden = style({
  '@media': {
    [MOBILE]: {
      display: 'none',
    },
  },
});

// --- Command well --------------------------------------------------------
// Frames the "What is your Command?" grid as a recessed well sunk into the
// page, like the in-game menu: a muted grey rim with cut corners, wrapping a
// vignetted dark interior with an inset shadow for depth. Deliberately neutral
// — no per-rarity colour on the frame.

const CUT = '16px';
const INNER_CUT = '14px';
const cutCorners = (size: string) =>
  `polygon(${size} 0, 100% 0, 100% calc(100% - ${size}), calc(100% - ${size}) 100%, 0 100%, 0 ${size})`;

export const commandFrame = style({
  position: 'relative',
  padding: '2px', // thickness of the grey rim revealed around the inner
  clipPath: cutCorners(CUT),
  // Soft beveled grey rim (lighter top-left to darker bottom-right).
  background:
    'linear-gradient(150deg, rgba(176, 182, 182, 0.5), rgba(86, 92, 92, 0.5))',
});

export const commandInner = style({
  padding: 'clamp(16px, 3vw, 32px)',
  clipPath: cutCorners(INNER_CUT),
  // Lighter centre to darker edge = vignette; strong inset shadow sinks it into
  // the page like a well.
  background:
    'radial-gradient(ellipse at center, #1b2424 0%, #0f1414 60%, #070a0a 100%)',
  boxShadow: 'inset 0 0 70px rgba(0, 0, 0, 0.85)',
});

export const commandTitle = style({
  fontSize: 'clamp(28px, 5vw, 44px)',
  WebkitTextStroke: '0.5px rgba(0, 0, 0, 0.5)',
});
