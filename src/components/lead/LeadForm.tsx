import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface LeadFormProps {
  initialData?: { id?: number; name: string; phone: string };
  onSubmit: (data: { name: string; phone: string }) => void;
  onCancel: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    let newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name, phone });
    }
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
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          disabled={!!errors.name || !!errors.phone}
        >
          {initialData ? "Update Lead" : "Create Lead"}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default LeadForm;
