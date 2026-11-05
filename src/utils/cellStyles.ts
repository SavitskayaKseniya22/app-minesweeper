import { CellBombStatusType } from '@/utils/interfaces';
import { colors } from '@/styles/tokens';

export function checkBackgroundColor(status: CellBombStatusType | undefined) {
  switch (status) {
    case CellBombStatusType.OPENED:
      return colors.openedCell;
    case CellBombStatusType.EMPTY:
      return colors.backgroundPanelSolid;
    case CellBombStatusType.BOMBED:
      return colors.bombedCell;
    case CellBombStatusType.QUESTIONED:
      return colors.questionedCell;
    default:
      return 'white';
  }
}

export function checkFontColor(status: CellBombStatusType | undefined) {
  return status === CellBombStatusType.EMPTY ? colors.emptyCellText : colors.defaultCellText;
}
