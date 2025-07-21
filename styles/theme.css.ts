import { style } from '@vanilla-extract/css';

export const vars = {
  colors: {
    background: '#161d1d',
    text: '#c9d8db',
    primary: '#4a90e2',
    secondary: '#7cb342',
    accent: '#ff9800',
  },
  fonts: {
    heading: 'Bombardier-Regular, sans-serif',
    body: 'system-ui, sans-serif',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

export const container = style({
  backgroundColor: vars.colors.background,
  color: vars.colors.text,
  minHeight: '100vh',
  fontFamily: vars.fonts.body,
});

export const flex = style({
  display: 'flex',
});

export const flexColumn = style({
  display: 'flex',
  flexDirection: 'column',
});

export const flexRow = style({
  display: 'flex',
  flexDirection: 'row',
});

export const flexCenter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const flexSpaceAround = style({
  display: 'flex',
  justifyContent: 'space-around',
});

export const heading = style({
  fontFamily: vars.fonts.heading,
  fontStyle: 'italic',
  textAlign: 'center',
  padding: vars.space.md,
  letterSpacing: '1px',
});

export const paragraph = style({
  margin: 0,
  marginBottom: vars.space.sm,
});

export const link = style({
  color: 'inherit',
  textDecoration: 'underline',
});