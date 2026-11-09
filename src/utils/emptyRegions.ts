export function getBorderIndexes(index: number, width: number) {
  const row = Math.floor(index / width);
  const column = index % width;
  const neighbors: number[] = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;
      if (
        (rowOffset !== 0 || columnOffset !== 0) &&
        nextRow >= 0 &&
        nextRow < width &&
        nextColumn >= 0 &&
        nextColumn < width
      ) {
        neighbors.push(nextRow * width + nextColumn);
      }
    }
  }

  return neighbors;
}

export function getRangeWithBorder(range: number[], bombsList: number[], width: number) {
  return Array.from(
    new Set(
      range.flatMap((index) => [
        index,
        ...getBorderIndexes(index, width).filter((neighbor) => bombsList[neighbor] !== 100),
      ])
    )
  );
}

export default function getConnectedRanges(bombsList: number[], width: number) {
  const visited = new Set<number>();
  const ranges: number[][] = [];

  for (let index = 0; index < bombsList.length; index++) {
    if (bombsList[index] !== 0 || visited.has(index)) continue;

    const range = [index];
    visited.add(index);
    for (let cursor = 0; cursor < range.length; cursor++) {
      for (const neighbor of getBorderIndexes(range[cursor], width)) {
        if (bombsList[neighbor] === 0 && !visited.has(neighbor)) {
          visited.add(neighbor);
          range.push(neighbor);
        }
      }
    }
    ranges.push(range);
  }

  return ranges;
}
