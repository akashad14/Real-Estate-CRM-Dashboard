import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface PropertyFormProps {
  initialData?: { id?: number; type: string; size: string; location: string; budget: string; availability: string };
  onSubmit: (data: { type: string; size: string; location: string; budget: string; availability: string }) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [type, setType] = useState(initialData?.type || '');
  const [size, setSize] = useState(initialData?.size || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [budget, setBudget] = useState(initialData?.budget || '');
  const [availability, setAvailability] = useState(initialData?.availability || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, size, location, budget, availability });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
        >
          <MenuItem value="Residential">Residential</MenuItem>
          <MenuItem value="Commercial">Commercial</MenuItem>
          <MenuItem value="Land">Land</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Size"
        variant="outlined"
        fullWidth
        margin="normal"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Budget"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <TextField
        label="Availability"
        variant="outlined"
        fullWidth
        margin="normal"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
        {initialData ? 'Update Property' : 'Add Property'}
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default PropertyForm;