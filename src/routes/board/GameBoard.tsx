import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from '@/routes/board/components/Field';
import BombsCounter from '@/routes/board/components/BombsCounter';
import MovesCounter from '@/routes/board/components/MovesCounter';
import Stopwatch from '@/routes/board/components/Stopwatch';
import {
  StyledAsideItem,
  StyledAsideItemExtended,
  StyledButtonWide,
  StyledContainerCentred,
} from '@/components/styledComponents';
import { RootState } from '@/store/store';
import { resetGameCycle, updateFinishGameStatus } from '@/store/GameCycleSlice';
import { resetGameData } from '@/store/GameDataSlice';
import { resetStopwatch } from '@/store/StopwatchSlice';
import { FinishedGameStatusType } from '@/utils/interfaces';
import type { ScoreItemState, ScoreLevelState, ScoreTableState } from '@/store/ScoreTableSlice';

const StyledPlayerName = styled('div')`
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function getBestUserRecord(name: string, scoreTable: ScoreTableState) {
  const records = (Object.entries(scoreTable) as [string, ScoreLevelState][]).flatMap(
    ([difficulty, level]) =>
      Object.values(level).flatMap((record) =>
        record?.name === name ? [{ ...record, difficulty }] : []
      )
  );

  return records.reduce<(ScoreItemState & { difficulty: string }) | undefined>(
    (latest, record) => (!latest || record.time < latest.time ? record : latest),
    undefined
  );
}

function GameBoard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted, isGameFinished, isItRecord } = gameCycleValues;
  const name = useSelector((state: RootState) => state.user.name);
  const scoreTable = useSelector((state: RootState) => state.scoreTable);
  const bestUserRecord = getBestUserRecord(name, scoreTable);

  return (
    <main>
      <StyledContainerCentred>
        <Field />
        <aside>
          <BombsCounter />
          <MovesCounter />
          <Stopwatch />

          <StyledAsideItem>
            <StyledPlayerName title={name}>Player: {name}</StyledPlayerName>
            {bestUserRecord && (
              <div>
                Best record: {bestUserRecord.time}s ({bestUserRecord.difficulty})
              </div>
            )}
          </StyledAsideItem>

          <StyledAsideItemExtended>
            {isGameFinished === FinishedGameStatusType.LOSE && <span>Game over!</span>}
            {isGameFinished === FinishedGameStatusType.WIN && <span>Game win!</span>}
            <br />
            {isItRecord && (
              <span>
                New record! <br />
                {isItRecord.place} place!
              </span>
            )}
          </StyledAsideItemExtended>
          {isGameFinished && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                dispatch(resetGameCycle());
                dispatch(resetGameData());
                dispatch(resetStopwatch());
              }}
            >
              start new game
            </StyledButtonWide>
          )}
          {isGameStarted && !isGameFinished && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                dispatch(updateFinishGameStatus(FinishedGameStatusType.LOSE));
              }}
            >
              finish game
            </StyledButtonWide>
          )}
          <StyledButtonWide
            type="button"
            onClick={() => {
              navigate('/');
            }}
          >
            Back to level selection
          </StyledButtonWide>
        </aside>
      </StyledContainerCentred>
    </main>
  );
}

export default GameBoard;
