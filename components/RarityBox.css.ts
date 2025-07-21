import { style } from '@vanilla-extract/css';

export const rarityBox = style({
  display: 'block',
  height: 'clamp(12px, 3vw, 20px)',
  width: 'clamp(12px, 3vw, 20px)',
  margin: 'clamp(2px, 0.5vw, 4px)',
  cursor: 'pointer',
  textDecoration: 'none',
});

export const rarityBoxActive = style({
  border: '1px white solid',
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