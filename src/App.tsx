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
import { defaultTime } from './features/themeSlice';

const focusSettings = {
  chipName: 'Focus',
  time: { ...defaultTime },
  theme: focusTheme,
};

const breakSettings = {
  chipName: 'Break',
  time: { ...defaultTime },
  theme: breakTheme,
};

const phaseCircles = [focusSettings, breakSettings, focusSettings, breakSettings, focusSettings];

function App() {
  const { mode, focusLength, breakLength } = useAppSelector((state) => state.theme);
  const [phase, setPhase] = useState(0);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [timer, setTimer] = useState({ ...phaseCircles[phase].time });
  const formatedTime = useMemo(() => formatTime(timer), [timer]);
  const theme = useMemo(() => createTheme(phaseCircles[phase].theme(mode)), [mode, phase]);

  useEffect(() => {
    breakSettings.time = { ...breakLength };
    setTimer({ ...phaseCircles[phase].time });
  }, [breakLength]);

  useEffect(() => {
    focusSettings.time = { ...focusLength };
    setTimer({ ...phaseCircles[phase].time });
  }, [focusLength]);

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

  function toNextPhase() {
    const currentPhase = phase + 1;
    if (phaseCircles.length <= currentPhase) {
      setTimer({ ...phaseCircles[0].time });
      setPhase(0);
      setIsPause(true);
      return;
    }
    setPhase(currentPhase);
    setTimer({
      minutes: phaseCircles[currentPhase].time.minutes,
      seconds: phaseCircles[currentPhase].time.seconds,
    });
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
                label={phaseCircles[phase].chipName}
                variant="outlined"
                sx={chipStyles}
              />
              <Box sx={timerStyles}>
                <Typography component="div" sx={timeNumbers}>
                  {formatedTime.minutes}
                </Typography>
                <Typography component="div" sx={timeNumbers}>
                  {formatedTime.seconds}
                </Typography>
              </Box>
              <Box className="pomodoro__nav" sx={pomodoroNav}>
                <SettingsModal theme={theme} />
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
              <Box>
                <Typography component="p" sx={{ marginTop: '30px', fontSize: '2rem' }}>
                  {phase + 1} / {phaseCircles.length}
                </Typography>
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
// 4. bttn hovers
