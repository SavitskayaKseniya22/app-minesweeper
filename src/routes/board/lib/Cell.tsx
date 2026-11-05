import type { MouseEvent } from 'react';
import { faBomb, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { CellBombStatusType, CellType, ClickType } from '../../../utils/interfaces';
import { checkFontColor, checkBackgroundColor } from '../../../utils/utils';
import { fonts } from '../../../styles/tokens';

export const StyledCell = styled('li')<{ 'data-status'?: CellBombStatusType }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.display};
  color: ${(props) => checkFontColor(props['data-status'])};
  cursor: ${(props) =>
    props['data-status'] === CellBombStatusType.DEFAULT ||
    props['data-status'] === CellBombStatusType.QUESTIONED
      ? 'pointer'
      : 'default'};
  background-color: ${(props) => checkBackgroundColor(props['data-status'])};

  .cell-icon-secondary {
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.6rem;
  }
`;

function Cell({
  cellSettings,
  handleStartAndFinishGame,
  handlePressedIndex,
}: {
  cellSettings: {
    isBombed: boolean;
    nearbyBombs: number;
    isOpen: CellType;
  };
  handleStartAndFinishGame: () => void;
  handlePressedIndex: (button: ClickType) => void;
}) {
  const handleLeftClick = () => {
    handleStartAndFinishGame();
    handlePressedIndex(ClickType.LEFT);
  };

  const handleRightClickToHold = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    handlePressedIndex(ClickType.RIGHTADD);
  };

  const handleRightClickToRelease = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    handlePressedIndex(ClickType.RIGHTDEL);
  };

  switch (cellSettings.isOpen) {
    case CellType['opened-bombed-all']:
      return (
        <StyledCell data-status={CellBombStatusType.OPENED}>
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case CellType['opened-bombed-chosen']:
      return (
        <StyledCell data-status={CellBombStatusType.BOMBED}>
          <FontAwesomeIcon icon={faBomb} />
        </StyledCell>
      );

    case CellType['opened-bombed-questioned']:
      return (
        <StyledCell data-status={CellBombStatusType.OPENED}>
          <FontAwesomeIcon icon={faQuestion} />
          <FontAwesomeIcon icon={faBomb} className="cell-icon-secondary" />
        </StyledCell>
      );

    case CellType['opened-free']:
      return (
        <StyledCell
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
          data-status={CellBombStatusType.DEFAULT}
          onClick={handleLeftClick}
          onContextMenu={handleRightClickToHold}
        />
      );
  }
}

export default Cell;
