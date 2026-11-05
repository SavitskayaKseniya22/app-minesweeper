import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  StyledButtonWide,
  StyledContainer,
  StyledContainerCentred,
  StyledTransparentButton,
} from '@/components/styledComponents';
import { updateFieldParameters, updateFormValues } from '@/store/GameSettingsSlice';
import { RootState } from '@/store/store';
import { resetGameData } from '@/store/GameDataSlice';
import { resetGameCycle } from '@/store/GameCycleSlice';
import { resetStopwatch } from '@/store/StopwatchSlice';
import { updateName } from '@/store/UserSlice';
import { FormErrorMessagesList } from '@/routes/main/FormErrorMessage';
import { MainFormFieldType } from '@/utils/interfaces';
import { colors } from '@/styles/tokens';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 300px;

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    color: ${colors.accent};
    text-align: center;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    border: none;

    &:focus-visible {
      outline: 2px solid ${colors.focus};
      outline-offset: 2px;
    }
  }

  input {
    appearance: textfield;
  }

  select {
    appearance: none;
  }
`;

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormValues = useSelector((state: RootState) => state.gameSettings);
  const name = useSelector((state: RootState) => state.user.name);
  const { formValues } = initFormValues;

  const {
    register,
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...formValues,
      name,
    },
  });

  const { bombNumberDefault, range } = initFormValues.fieldParameters;
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted } = gameCycleValues;

  const difficulty = useWatch({
    control,
    name: MainFormFieldType.DIFFICULTY,
  });

  const bombNumber = useWatch({
    control,
    name: MainFormFieldType.BOMBNUMBER,
  });

  const userName = useWatch({
    control,
    name: MainFormFieldType.NAME,
  });

  useEffect(() => {
    setValue(MainFormFieldType.BOMBNUMBER, bombNumberDefault);
  }, [bombNumberDefault, dispatch, setValue]);

  useEffect(() => {
    dispatch(updateFormValues({ difficulty, bombNumber: Number(bombNumber) }));
  }, [bombNumber, difficulty, dispatch]);

  useEffect(() => {
    dispatch(updateFieldParameters(difficulty));
  }, [difficulty, dispatch]);

  const onSubmit = () => {
    dispatch(resetGameCycle());
    dispatch(resetGameData());
    dispatch(resetStopwatch());
    dispatch(updateName(userName));
    navigate('/game-board');
  };

  return (
    <main>
      <StyledContainerCentred>
        <StyledTransparentButton
          type="button"
          aria-label="View records"
          onClick={() => {
            navigate('/stats');
          }}
        >
          <FontAwesomeIcon icon={faClipboard} />
        </StyledTransparentButton>

        <StyledForm
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            dispatch(resetGameCycle());
            dispatch(resetGameData());
            dispatch(resetStopwatch());
          }}
        >
          <StyledContainer>
            <label htmlFor="difficulty">Choose game difficulty</label>
            <select id="difficulty" {...register(MainFormFieldType.DIFFICULTY)}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </StyledContainer>
          <StyledContainer>
            <label htmlFor="bombNumber">Enter number of bombs</label>
            <input
              id="bombNumber"
              type="number"
              min={range.min}
              max={range.max}
              {...register(MainFormFieldType.BOMBNUMBER, {
                required: {
                  value: true,
                  message: `Please enter a value between ${range.min} and  ${range.max}.`,
                },
                pattern: {
                  value: /^\d+$/,
                  message: 'The value is not a number.',
                },
                max: {
                  value: range.max,
                  message: `The value of bombs is too high. Enter a value between ${range.min} and  ${range.max}.`,
                },
                min: {
                  value: range.min,
                  message: `The value of bombs is too low. Enter a value between ${range.min} and  ${range.max}.`,
                },
                validate: (value) =>
                  Number.isInteger(Number(value)) || 'Please enter a whole number of bombs.',
              })}
              placeholder={`${String(range.min)} - ${String(range.max)}`}
            />
          </StyledContainer>

          <StyledContainer>
            <label htmlFor="name">Enter a name</label>
            <input
              id="name"
              type="text"
              {...register(MainFormFieldType.NAME, {
                required: {
                  value: true,
                  message: `Please enter a name.`,
                },

                minLength: {
                  value: 4,
                  message: `The name is too short. Please enter a name that is longer than three characters.`,
                },
              })}
              placeholder="Anonymous"
            />
          </StyledContainer>
          <StyledButtonWide type="submit">Start</StyledButtonWide>
          {isGameStarted && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                navigate('/game-board');
              }}
            >
              resume game
            </StyledButtonWide>
          )}
        </StyledForm>
      </StyledContainerCentred>
      <FormErrorMessagesList
        errors={errors}
        names={[MainFormFieldType.NAME, MainFormFieldType.BOMBNUMBER]}
      />
    </main>
  );
}

export default MainPage;
