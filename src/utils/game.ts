import type { ScoreLevelState } from '@/store/ScoreTableSlice';
import { getBorderIndexes } from '@/utils/emptyRegions';
import { CellType, FinishedGameStatusType, GameDataState } from '@/utils/interfaces';

export function clearOfDuplicates(array: number[]) {
  return Array.from(new Set(array));
}

export function shuffle(array: number[]) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function getNearbyBombs(index: number, data: number[], width: number) {
  return getBorderIndexes(index, width).reduce((sum, neighbor) => sum + (data[neighbor] ?? 0), 0);
}

export function getCellsContentList(
  cellsNumber: number,
  bombNumber: number,
  startIndex: number | undefined
) {
  const cells = new Array(cellsNumber).fill(0);
  if (startIndex === undefined) {
    return cells;
  }

  const availableIndexes = Array.from({ length: cellsNumber }, (_, index) => index).filter(
    (index) => index !== startIndex
  );
  shuffle(availableIndexes)
    .slice(0, bombNumber)
    .forEach((index) => {
      cells[index] = 1;
    });

  return cells;
}

export function addOpenedChunk(index: number, shortRange: number[][], longRange: number[][]) {
  const elemInShortRange = shortRange.filter((element) => element.includes(index)).flat();
  const elemInLongRange = longRange.filter((element) => element.includes(index)).flat();

  if (elemInShortRange.length && elemInLongRange.length) {
    return elemInLongRange;
  }

  return [index];
}

export function getCellsList(
  gameData: GameDataState,
  bombsList: number[],
  openedCells: number[],
  isGameFinished: false | FinishedGameStatusType
) {
  const { list } = gameData.clicks.right;
  const { endIndex } = gameData.clicks;

  return gameData.initData.map((cell, index) => {
    const isBombed = Boolean(cell);
    let isOpen: CellType = CellType.false;

    if (isGameFinished && isBombed) {
      if (index === endIndex) {
        isOpen = CellType['opened-bombed-chosen'];
      } else if (list.includes(index)) {
        isOpen = CellType['opened-bombed-questioned'];
      } else {
        isOpen = CellType['opened-bombed-all'];
      }
    } else if (openedCells.includes(index)) {
      isOpen = CellType['opened-free'];
    } else if (list.includes(index)) {
      isOpen = CellType.questioned;
    }

    return { isBombed, nearbyBombs: bombsList[index], isOpen };
  });
}

export function sortDataToMakeCells(data: number[]) {
  const sortedData: { freeCells: number[]; bombedCells: number[] } = {
    freeCells: [],
    bombedCells: [],
  };

  data.forEach((cell, index) => {
    if (cell !== 1) {
      sortedData.freeCells.push(index);
    } else {
      sortedData.bombedCells.push(index);
    }
  });

  return sortedData;
}

export function isItRecord({ time, records }: { time: number; records: ScoreLevelState }) {
  const { first, second, third } = records;
  if (first === undefined || time <= first.time) {
    return { place: 1 };
  }
  if (second === undefined || time <= second.time) {
    return { place: 2 };
  }
  if (third === undefined || time <= third.time) {
    return { place: 3 };
  }
  return false;
}
