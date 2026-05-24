import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const wrap = style({
  position: 'relative',
  width: '100%',
});

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  padding: '6px 10px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'inherit',
  cursor: 'pointer',
  fontFamily: vars.fonts.heading,
  fontSize: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transition: 'border-color 0.15s ease',
  selectors: {
    '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)' },
  },
});

export const icon = style({
  width: '28px',
  height: '28px',
  flexShrink: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.35)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

export const name = style({
  flex: 1,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const caret = style({
  opacity: 0.6,
  fontSize: '12px',
});

export const menu = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  maxHeight: '340px',
  overflowY: 'auto',
  backgroundColor: '#0f1414',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
  zIndex: 300,
});

export const groupHeader = style({
  position: 'sticky',
  top: 0,
  padding: '5px 10px',
  backgroundColor: '#0f1414',
  fontFamily: vars.fonts.heading,
  fontSize: '10px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  opacity: 0.5,
  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
});

export const option = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  padding: '5px 10px',
  background: 'transparent',
  border: 'none',
  borderLeft: '2px solid transparent',
  color: 'inherit',
  cursor: 'pointer',
  fontFamily: vars.fonts.heading,
  fontSize: '13px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  textAlign: 'left',
  selectors: {
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
  },
});

export const optionActive = style({
  backgroundColor: 'rgba(124, 179, 66, 0.12)',
  borderLeftColor: '#7cb342',
});
