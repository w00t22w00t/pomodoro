import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, FC } from 'react';
import Modal from '@mui/material/Modal';
import DotesIcon from '../UI/Icons/DotesIcon';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import ControlledSwitch from './ControlledSwitch'; // https://mui.com/material-ui/react-switch/
import SettingsInput from './SettingsInput';
import { useAppDispatch } from './../hook';
import { setTheme, setFocusLength, setBreakLength } from '../features/themeSlice';
import { Theme } from '@mui/material/styles';
import InputMask from 'react-input-mask';
import { Time } from '../types';

interface ModalProps {
  theme: Theme;
}

const SettingsModal: FC<ModalProps> = ({ theme }) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(true);
  const [focusTime, setFocusTime] = useState('01:00');

  const [breakTime, setBreakTime] = useState('01:00');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(setTheme(checked ? 'light' : 'dark'));
  }, [checked]);

  const focusHanlder = (e: any) => {
    // any!!!
    setFocusTime(e.target.value);
    const time: Time = {
      minutes: +e.target.value.split(':')[0],
      seconds: +e.target.value.split(':')[1],
    };
    dispatch(setFocusLength({ ...time }));
  };

  const breakHanlder = (e: any) => {
    // any!!!
    setBreakTime(e.target.value);
    const time: Time = {
      minutes: +e.target.value.split(':')[0],
      seconds: +e.target.value.split(':')[1],
    };
    dispatch(setBreakLength({ ...time }));
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
          <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Long break length
            </Typography>
            <SettingsInput />
          </Box>
          <Box sx={rowItem}>
            <Typography variant="body1" component="p">
              Notifications
            </Typography>
            {/* <ControlledSwitch /> */}
          </Box>
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
