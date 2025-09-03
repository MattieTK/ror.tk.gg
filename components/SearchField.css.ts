import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const input = style({
  fontFamily: vars.fonts.heading,
  fontSize: '26px',
  backgroundColor: 'transparent',
  border: 0,
  color: vars.colors.text,
  width: '100%',
  marginBottom: vars.space.md,
  paddingBottom: vars.space.sm,
  boxSizing: 'border-box',
  borderBottom: `2px solid transparent`,

  ':focus': {
    outline: 0,
    borderBottomColor: vars.colors.text,
  },
});
