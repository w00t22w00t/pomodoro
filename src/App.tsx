import { Box, Button, Chip, Paper, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import './styles/App.scss';
import SettingsModal from './components/SettingsModal';
import FocusIcon from './UI/Icons/FocusIcon';
import StartIcon from './UI/Icons/StartIcon';
import NextIcon from './UI/Icons/NextIcon';
import PauseIcon from './UI/Icons/PauseIcon';
import { focusTheme, breakTheme } from './MuiCustom';
import { formatTime, toSeconds } from './formatter';
import { useAppSelector } from './hook';
import { createTheme } from '@mui/material';
import { Time } from './types';

// this good
const focusSettings = {
  chipName: 'Focus',
  time: {
    minutes: 0,
    seconds: 10,
  },
  theme: focusTheme,
};

const breakSettings = {
  chipName: 'Break',
  time: {
    minutes: 0,
    seconds: 5,
  },
  theme: breakTheme,
};

// this temporary good
const tmpPhaseCircles = [focusSettings, breakSettings, focusSettings, breakSettings, focusSettings];

const phaseCircles = new Map(tmpPhaseCircles.map((phase, index) => [index, phase]));

enum PhaseStatus {
  FOCUS = 0,
  BREAK = 1,
}

function App() {
  const { mode, focusLength, breakLength } = useAppSelector((state) => state.theme);

  const [timer, setTimer] = useState<Time>({ ...focusSettings.time });
  const [breakValue, setBreakValue] = useState('01:00');
  const [focusValue, setFocusValue] = useState('01:00');

  const [isPause, setIsPause] = useState<boolean>(true);
  const [phase, setPhase] = useState<PhaseStatus | number>(PhaseStatus.FOCUS);

  const theme = useMemo(() => createTheme(phaseCircles.get(phase)?.theme(mode)), [mode, phase]);
  const formattedTime = useMemo(() => formatTime(timer), [timer]);

  useEffect(() => {
    breakSettings.time = { ...breakLength };
  }, [breakLength]);

  useEffect(() => {
    focusSettings.time = { ...focusLength };
  }, [focusLength]);

  function toNextPhase() {
    const currentPhase = phase + 1;
    if (phaseCircles.size <= currentPhase) {
      setTimer({ ...focusSettings.time });
      setPhase(PhaseStatus.FOCUS);
      setIsPause(true);
      return;
    }
    setPhase(currentPhase);
    setTimer({
      minutes: phaseCircles.get(currentPhase)?.time.minutes as number,
      seconds: phaseCircles.get(currentPhase)?.time.seconds as number,
    });
  }

  useEffect(() => {
    let time = toSeconds(timer.minutes, timer.seconds);
    if (isPause) return;

    const interval = setInterval(() => {
      if (time === 0) {
        toNextPhase();
        return;
      }
      time = time > 0 ? time - 1 : 0;
      setTimer({
        minutes: Math.floor(time / 60),
        seconds: time % 60,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isPause]);

  function timerHandler() {
    setIsPause((prevState) => !prevState);
  }

  const chipStyles = {
    padding: '10px',
    height: 'auto',
    background: theme.palette.primary.main,
    border: `2px solid ${theme.palette.text.primary}`,
    borderRadius: '9999px',
    fontSize: '1.2rem',
  };

  const paperStyles = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const timerStyles = {
    marginTop: '3.2rem',
  };

  const pomodoroNav = {
    marginTop: '3.2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.6rem',
  };

  const timeNumbers = {
    fontSize: '25.6rem',
    lineHeight: '85%',
    fontWeight: isPause ? 200 : 800,
  };

  const bigBttn = {
    padding: '3.5rem 5rem',
    borderRadius: '3.2rem',
    background: theme.palette.secondary.main,
    '&:hover': {
      background: theme.palette.secondary.main,
      '& svg path': {
        fill: '#FFF',
        transition: 'fill 0.1s ease-in',
      },
    },
  };

  const defaultBttn = {
    height: '8rem',
    width: '8rem',
    borderRadius: '2.4rem',
    '&:hover': {
      '& svg path': {
        fill: '#FFF',
        transition: 'fill 0.1s ease-in',
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={paperStyles}>
        <div className="App">
          <main className="main">
            <div className="container">
              <Chip
                icon={<FocusIcon fill={theme.palette.text.primary} sx={{ width: '30px', height: '26px' }} />}
                label={phaseCircles.get(phase)?.chipName}
                variant="outlined"
                sx={chipStyles}
              />
              <Box sx={timerStyles}>
                <Typography component="div" sx={timeNumbers}>
                  {formattedTime.minutes}
                </Typography>
                <Typography component="div" sx={timeNumbers}>
                  {formattedTime.seconds}
                </Typography>
              </Box>
              <Box className="pomodoro__nav" sx={pomodoroNav}>
                <SettingsModal
                  breakValue={breakValue}
                  focusValue={focusValue}
                  setFocusValue={setFocusValue}
                  setBreakValue={setBreakValue}
                  setHzChto={setTimer}
                  theme={theme}
                />
                <Button variant="contained" color="primary" sx={bigBttn} onClick={() => timerHandler()}>
                  {isPause ? (
                    <StartIcon
                      fill={theme.palette.text.primary} // hover
                      sx={{ width: '30px', height: '26px' }}
                    />
                  ) : (
                    <PauseIcon fill={theme.palette.text.primary} sx={{ width: '30px', height: '26px' }} />
                  )}
                </Button>
                <Button variant="contained" sx={defaultBttn} onClick={toNextPhase}>
                  <NextIcon fill={theme.palette.text.primary} sx={{ width: '30px', height: '20px' }} />
                </Button>
              </Box>
            </div>
          </main>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;

// ??
// const formatedTime = formatTime(timer);

// Todo
// 2. Chip Icon
// 3. input mask
// 4. bttn hovers
