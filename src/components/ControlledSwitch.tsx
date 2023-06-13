import React, { FC } from 'react';
import Switch from '@mui/material/Switch';

interface switchProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlledSwitch: FC<switchProps> = ({ checked, setChecked }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />;
};

export default ControlledSwitch;
