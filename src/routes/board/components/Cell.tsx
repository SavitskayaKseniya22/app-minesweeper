import type { MouseEvent } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { CellBombStatusType, CellType, ClickType } from '@/utils/interfaces';
import { checkFontColor, checkBackgroundColor } from '@/utils/cellStyles';
import { colors, fonts } from '@/styles/tokens';

export const StyledCell = styled('button')<{ 'data-status'?: CellBombStatusType }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-family: ${fonts.display};
  font-size: inherit;
  color: ${(props) => checkFontColor(props['data-status'])};
  cursor: ${(props) =>
    props['data-status'] === CellBombStatusType.DEFAULT ||
    props['data-status'] === CellBombStatusType.QUESTIONED
      ? 'pointer'
      : 'default'};
  background-color: ${(props) => checkBackgroundColor(props['data-status'])};
  border: none;

  &:focus-visible {
    z-index: 1;
    outline: 2px solid ${colors.focus};
    outline-offset: -2px;
  }

  .cell-icon-secondary {
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
`;

function Cell({
  cellSettings,
  isDisabled,
  handleStartAndFinishGame,
  handlePressedIndex,
}: {
  cellSettings: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: CellType;
  };
  isDisabled: boolean;
  handleStartAndFinishGame: () => void;
  handlePressedIndex: (button: ClickType) => void;
}) {
  const handleLeftClick = () => {
    handleStartAndFinishGame();
    handlePressedIndex(ClickType.LEFT);
  };

  const handleRightClickToHold = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlePressedIndex(ClickType.RIGHTADD);
  };

  const handleRightClickToRelease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlePressedIndex(ClickType.RIGHTDEL);
  };

  switch (cellSettings.isOpen) {
    case CellType['opened-bombed-all']:
      return (
        <StyledCell
          type="button"
          aria-label="Opened cell with a bomb"
          disabled
          data-status={CellBombStatusType.OPENED}
        >
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case CellType['opened-bombed-chosen']:
      return (
        <StyledCell
          type="button"
          aria-label="Bomb hit"
          disabled
          data-status={CellBombStatusType.BOMBED}
        >
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case CellType['opened-bombed-questioned']:
      return (
        <StyledCell
          type="button"
          aria-label="Opened bomb marked with a question mark"
          disabled
          data-status={CellBombStatusType.OPENED}
        >
          <FontAwesomeIcon icon={faQuestion} />
          <FontAwesomeIcon icon={faBomb} className="cell-icon-secondary" />
        </StyledCell>
      );

    case CellType['opened-free']:
      return (
        <StyledCell
          type="button"
          aria-label={
            cellSettings.nearbyBombs === 0
              ? 'Empty cell'
              : `Opened cell with ${cellSettings.nearbyBombs} nearby bombs`
          }
          disabled
          data-status={
            cellSettings.nearbyBombs > 0 ? CellBombStatusType.OPENED : CellBombStatusType.EMPTY
          }
        >
          {cellSettings.nearbyBombs}
        </StyledCell>
      );

    case CellType.questioned:
      return (
        <StyledCell
          type="button"
          aria-label="Closed cell marked with a question mark"
          disabled={isDisabled}
          data-status={CellBombStatusType.QUESTIONED}
          onClick={handleLeftClick}
          onContextMenu={handleRightClickToRelease}
        >
          <FontAwesomeIcon icon={faQuestion} />
        </StyledCell>
      );
    default:
      return (
        <StyledCell
          type="button"
          aria-label="Closed cell"
          disabled={isDisabled}
          data-status={CellBombStatusType.DEFAULT}
          onClick={handleLeftClick}
          onContextMenu={handleRightClickToHold}
        />
      );
  }
}

export default Cell;
