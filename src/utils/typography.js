import Typography from 'typography';
import theme from 'typography-theme-noriega';

theme.overrideThemeStyles = ({ rhythm }) => ({
  a: {
    color: '#0366d6',
    textDecoration: 'none',
  },
  'a:hover': {
    textDecoration: 'underline',
  },
  'p code': {
    fontSize: rhythm(0.6),
    color: '#000 !important',
    padding: `${rhythm(0.15)} !important`,
  },
  blockquote: {
    marginLeft: '-1rem',
    paddingLeft: '1rem',
    lineHeight: rhythm(1),
    borderLeft: `${rhythm(1 / 8)} solid #767676`,
    opacity: 0.8,
    fontStyle: 'italic',
    fontSize: rhythm(0.6),
  },
});

const typography = new Typography(theme);

// if (process.env.NODE_ENV !== 'production') {
//   typography.injectStyles();
// }

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
