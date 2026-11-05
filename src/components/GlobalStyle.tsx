import { createGlobalStyle } from 'styled-components';
import overseer from '../assets/fonts/Overseer/OverseerItalic.otf';
import { colors, fonts } from '../styles/tokens';

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: Overseer;
    src: url(${overseer}) format('opentype');
  }
`;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  #root {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
    font-family: ${fonts.body};
    color: white;
    background-color: ${colors.background};
    background-image:
      radial-gradient(ellipse at 50% 42%, rgba(28, 76, 45, 0.38), transparent 62%),
      radial-gradient(ellipse at 12% 88%, rgba(95, 72, 28, 0.12), transparent 42%),
      repeating-linear-gradient(0deg, transparent 0 3px, rgba(0, 0, 0, 0.12) 3px 4px),
      linear-gradient(135deg, #101b14 0%, ${colors.background} 55%, #0b1510 100%);
    background-attachment: fixed;
  }

  main {
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: space-between;
    min-width: 200px;
  }

  h2 {
    margin: 0;
    font-family: ${fonts.display};
    font-size: 4rem;
  }

  h3 {
    font-family: ${fonts.body};
    font-size: 1.1rem;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
