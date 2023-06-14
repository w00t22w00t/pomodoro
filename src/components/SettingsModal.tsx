import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, FC, useMemo } from 'react';
import Modal from '@mui/material/Modal';
import DotesIcon from '../UI/Icons/DotesIcon';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import ControlledSwitch from './ControlledSwitch'; // https://mui.com/material-ui/react-switch/
import SettingsInput from './SettingsInput';
import { useAppDispatch, useAppSelector } from './../hook';
import { setTheme, setFocusLength, setBreakLength } from '../features/themeSlice';
import { Theme } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import { formatTime } from '../formatter';

interface ModalProps {
  theme: Theme;
}

const SettingsModal: FC<ModalProps> = ({ theme }) => {
  const dispatch = useAppDispatch();
  const { focusLength, breakLength } = useAppSelector((state) => state.theme);
  const focusFormatedTime = useMemo(() => formatTime(focusLength), [focusLength]);
  const breakFormatedTime = useMemo(() => formatTime(breakLength), [breakLength]);
  const [focusTime, setFocusTime] = useState(`${focusFormatedTime.minutes}:${focusFormatedTime.seconds}`); // change to default value
  const [breakTime, setBreakTime] = useState(`${breakFormatedTime.minutes}:${breakFormatedTime.seconds}`);
  const [checked, setChecked] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    dispatch(
      setFocusLength({
        minutes: +focusTime.split(':')[0],
        seconds: +focusTime.split(':')[1],
      }),
    );

    dispatch(
      setBreakLength({
        minutes: +breakTime.split(':')[0],
        seconds: +breakTime.split(':')[1],
      }),
    );
    setOpen(false);
  };

  useEffect(() => {
    dispatch(setTheme(checked ? 'light' : 'dark'));
  }, [checked]);

  const focusHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusTime(e.target.value);
  };

  const breakHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBreakTime(e.target.value);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // color: 'currentColor',
    color: theme.palette.text.primary,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} sx={defaultBttn}>
        <DotesIcon fill={theme.palette.text.primary} sx={{ fontSize: '20px', width: '28px', height: '8px' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={header}>
            <Typography variant="h1" component="h2" sx={{ fontSize: '2.4rem' }}>
              Settings
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon color="inherit" />
            </IconButton>
          </Box>
          <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Dark mode
            </Typography>
            <ControlledSwitch checked={checked} setChecked={setChecked} />
          </Box>
          <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Focus length
            </Typography>
            <InputMask
              mask="99:99"
              value={focusTime}
              disabled={false}
              maskPlaceholder={focusTime}
              onChange={focusHanlder}
            >
              <TextField variant="filled" />
            </InputMask>
          </Box>
          <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Short break length
            </Typography>
            {/* <SettingsInput /> */}
            <InputMask
              mask="99:99"
              value={breakTime}
              disabled={false}
              maskPlaceholder={breakTime}
              onChange={breakHanlder}
            >
              <TextField variant="filled" />
            </InputMask>
          </Box>
          {/* <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Long break length
            </Typography>
            <SettingsInput />
          </Box>
          <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Notifications
            </Typography>
            <ControlledSwitch />
          </Box> */}
        </Box>
      </Modal>
    </>
  );
};

export default SettingsModal;

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

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const rowItem = {
  minHeight: '6.4rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
