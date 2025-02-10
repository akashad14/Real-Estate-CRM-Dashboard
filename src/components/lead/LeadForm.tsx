import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface LeadFormProps {
  initialData?: { id?: number; name: string; phone: string };
  onSubmit: (data: { name: string; phone: string }) => void;
  onCancel: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, phone });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
        {initialData ? 'Update Lead' : 'Create Lead'}
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default LeadForm;