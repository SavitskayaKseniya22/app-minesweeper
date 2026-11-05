import styled, { css } from 'styled-components';
import { colors } from '../styles/tokens';

export const BasicStyledContainer = css`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${colors.backgroundPanel};

  &::before,
  &::after {
    position: absolute;
    left: -2px;
    width: 100%;
    height: 3px;
    content: ' ';
    border: 2px solid ${colors.accent};
  }

  &::before {
    top: 0;
    border-bottom: none;
  }

  &::after {
    bottom: 0;
    border-top: none;
  }

  & > h3 {
    position: absolute;
    top: -1.1rem;
    left: 20px;
    display: block;
    padding: 0 10px;
    margin: 0;
    line-height: 1.1rem;
    color: ${colors.accent};
    text-transform: uppercase;
    border-bottom: 2px solid ${colors.backgroundPanelSolid};
  }
`;
export const StyledContainer = styled('div')`
  ${BasicStyledContainer}
`;

export const StyledContainerCentred = styled(StyledContainer)`
  align-items: unset;
  padding: 3rem 10rem;
`;

export const StyledList = styled('ul')`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 300px;
`;

export const StyledListItem = styled('li')`
  ${BasicStyledContainer}
  ol {
    width: 100%;
  }

  li {
    list-style: unset;
    list-style-type: decimal;
  }
`;

export const StyledAsideItem = styled('div')`
  flex-grow: 0;
  padding: 0.5rem;
  font-size: 1.2rem;
  color: ${colors.accent};
  background-color: ${colors.backgroundPanelSolid};
  border-right: 1px solid black;
  border-bottom: 2px solid black;
`;

export const StyledAsideItemExtended = styled(StyledAsideItem)`
  flex-grow: 22;
`;

export const StyledButton = styled('button')`
  position: relative;
  padding: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.backgroundPanelSolid};
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;
  background-color: ${colors.accent};
  border: none;

  &:focus-visible {
    outline: 2px solid ${colors.focus};
    outline-offset: 3px;
  }
`;

export const StyledButtonWide = styled(StyledButton)`
  width: 100%;
`;

export const StyledTransparentButton = styled(StyledButton)`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 2rem;
  color: ${colors.accent};
  background-color: transparent;
`;
