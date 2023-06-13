import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SettingsInput = () => {
  const [totalBill, setTotalBill] = useState(''); // rework

  return (
    <Box component="form">
      <TextField
        type="number"
        name="totalBill"
        label="Total Bill"
        variant="filled"
        value={totalBill}
        onChange={(event) => setTotalBill(event.target.value)}
      />
    </Box>
  );
};

export default SettingsInput;
