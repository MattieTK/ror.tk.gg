import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const hoverBox = style({
  position: 'absolute',
  color: vars.colors.text,
  width: 'auto',
  backgroundColor: vars.colors.background,
  padding: vars.space.xs,
  zIndex: 1000,
});

export const hoverBoxTitle = style({
  fontSize: '22px',
  fontFamily: vars.fonts.heading,
});

export const hoverBoxDescription = style({
  fontSize: '18px',
  maxWidth: '200px',
});