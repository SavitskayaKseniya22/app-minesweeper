import React from 'react';
import styled from 'styled-components';
import { colors } from '@/styles/tokens';

export const StyledHeader = styled('header')`
  padding: 1rem;
  text-align: center;
  background: linear-gradient(
    90deg,
    ${colors.headerShade},
    rgba(17, 39, 25, 0.48),
    ${colors.headerShade}
  );
  border-bottom: 1px solid rgba(112, 173, 119, 0.18);
  backdrop-filter: blur(8px);
`;

function Header() {
  return (
    <StyledHeader>
      <h1>Find your way through the wastelands</h1>
    </StyledHeader>
  );
}

export default Header;
