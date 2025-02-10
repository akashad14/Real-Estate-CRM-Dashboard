import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface PropertyFormProps {
  initialData?: { id?: number; type: string; size: string; location: string; budget: string; availability: string };
  onSubmit: (data: { type: string; size: string; location: string; budget: string; availability: string }) => void;
  onCancel: () => void;
  onDelete?: (id: number) => void; // Delete function if ID exists
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit, onCancel, onDelete }) => {
  const [type, setType] = useState(initialData?.type || "");
  const [size, setSize] = useState(initialData?.size || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [budget, setBudget] = useState(initialData?.budget || "");
  const [availability, setAvailability] = useState(initialData?.availability || "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation function
  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!type.trim()) newErrors.type = "Property type is required";
    if (!size.trim()) newErrors.size = "Size is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!budget.trim()) newErrors.budget = "Budget is required";
    if (!availability.trim()) newErrors.availability = "Availability is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ type, size, location, budget, availability });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal" error={!!errors.type}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)} label="Type">
          <MenuItem value="Residential">Residential</MenuItem>
          <MenuItem value="Commercial">Commercial</MenuItem>
          <MenuItem value="Land">Land</MenuItem>
        </Select>
        {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
      </FormControl>

      <TextField
        label="Size"
        variant="outlined"
        fullWidth
        margin="normal"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        error={!!errors.size}
        helperText={errors.size}
      />
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        margin="normal"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        error={!!errors.location}
        helperText={errors.location}
      />
      <TextField
        label="Budget"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        error={!!errors.budget}
        helperText={errors.budget}
      />
      <TextField
        label="Availability"
        variant="outlined"
        fullWidth
        margin="normal"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        error={!!errors.availability}
        helperText={errors.availability}
      />

      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          {initialData ? "Update Property" : "Add Property"}
        </Button>
        <Button variant="outlined" onClick={onCancel} sx={{ mr: 2 }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyForm;
