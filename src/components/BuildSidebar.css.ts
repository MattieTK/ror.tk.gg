import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const sidebar = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: 'clamp(200px, 22vw, 260px)',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
});

export const identity = style({
  margin: 0,
  fontSize: '13px',
  fontStyle: 'italic',
  opacity: 0.75,
  lineHeight: 1.4,
});

export const onboarding = style({
  margin: 0,
  fontSize: '13px',
  opacity: 0.6,
  lineHeight: 1.5,
});

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const groupHeading = style({
  fontFamily: vars.fonts.heading,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

export const row = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '6px',
});

export const tile = style({
  width: 'clamp(40px, 10vw, 48px)',
});
