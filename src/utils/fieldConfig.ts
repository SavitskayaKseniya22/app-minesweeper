import { DifficultyType } from '@/utils/interfaces';

export function getFieldParameters(difficulty: DifficultyType) {
  switch (difficulty) {
    case DifficultyType.MEDIUM:
      return {
        cellsNumber: 225,
        width: 15,
        bombNumberDefault: 30,
        range: { min: 30, max: 224 },
      };
    case DifficultyType.HARD:
      return {
        cellsNumber: 625,
        width: 25,
        bombNumberDefault: 100,
        range: { min: 100, max: 624 },
      };
    default:
      return {
        cellsNumber: 100,
        width: 10,
        bombNumberDefault: 10,
        range: { min: 10, max: 99 },
      };
  }
}

export function checkSize(difficulty: DifficultyType) {
  switch (difficulty) {
    case DifficultyType.MEDIUM:
      return '32rem';
    case DifficultyType.HARD:
      return '44rem';
    default:
      return '22rem';
  }
}

export function checkGridSize(difficulty: DifficultyType) {
  switch (difficulty) {
    case DifficultyType.MEDIUM:
      return 'repeat(15, 1fr)';
    case DifficultyType.HARD:
      return 'repeat(25, 1fr)';
    default:
      return 'repeat(10, 1fr)';
  }
}
