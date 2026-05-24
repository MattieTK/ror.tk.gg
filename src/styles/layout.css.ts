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

// Wraps Rarities + Expansions. On desktop it's `display: contents` so the two
// drop straight into the layout grid as separate cells (left and right of the
// command well). On mobile it becomes the off-canvas filters drawer holding
// both, toggled by filtersOpen.
export const filters = style({
  display: 'contents',
  '@media': {
    [MOBILE]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '80%',
      maxWidth: '320px',
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

export const filtersOpen = style({
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

// Desktop: a centred three-column grid. The outer columns are equal (1fr) so
// the auto-sized command well stays viewport-centred; Rarities hugs it from the
// left, Expansions (row 1) and Build (row 2) hug it from the right. Mobile: a
// plain block — the filters drawer is fixed (out of flow) and the command/build
// panels stack, shown one at a time by tab.
export const layoutGrid = style({
  display: 'grid',
  width: '100%',
  gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: '"rarities command expansions" "rarities command build"',
  columnGap: 'clamp(12px, 2.5vw, 40px)',
  rowGap: '14px',
  alignItems: 'start',
  '@media': {
    [MOBILE]: {
      display: 'block',
    },
  },
});

export const raritiesCol = style({
  gridArea: 'rarities',
  justifySelf: 'end',
  alignSelf: 'start',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
});

// Vertical stack of rarity pills.
export const raritiesStack = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  alignItems: 'flex-start',
});

export const expansionsCol = style({
  gridArea: 'expansions',
  justifySelf: 'start',
  alignSelf: 'start',
});

export const gridPanel = style({
  gridArea: 'command',
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
  gridArea: 'build',
  justifySelf: 'start',
  alignSelf: 'start',
  '@media': {
    [MOBILE]: {
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

// --- Footer --------------------------------------------------------------

export const footer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '14px',
  width: '100%',
  maxWidth: '440px',
  margin: '36px auto 24px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
});

export const credit = style({
  margin: 0,
  fontSize: '13px',
  letterSpacing: '0.5px',
  opacity: 0.65,
  textAlign: 'center',
});

export const creditLink = style({
  color: '#9fd0a0',
  textDecoration: 'none',
  selectors: {
    '&:hover': { textDecoration: 'underline' },
  },
});

// Custom GitHub star button — a skewed parallelogram matching the controls,
// replacing the react-github-btn iframe widget.
export const starButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'inherit',
  textDecoration: 'none',
  fontFamily: vars.fonts.heading,
  fontSize: '14px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transform: 'skewX(-10deg)',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  selectors: {
    '&:hover': {
      borderColor: '#e8c66b',
      boxShadow: '0 0 10px rgba(232, 198, 107, 0.35)',
    },
  },
});

export const starButtonInner = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '7px',
  transform: 'skewX(10deg)',
});

export const star = style({
  color: '#e8c66b',
  fontSize: '15px',
});
