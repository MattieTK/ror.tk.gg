import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const container = style({
  // Basic container styles
});

export const heading = style({
  fontFamily: vars.fonts.heading,
  fontStyle: 'italic',
  textAlign: 'center',
  padding: vars.space.md,
  letterSpacing: '1px',
  margin: 0,
  marginBottom: vars.space.sm,
});

export const tierHeading = style([heading, {
  marginTop: vars.space.lg,
}]);