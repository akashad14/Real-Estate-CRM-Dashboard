// src/components/Leads/DocumentUpload.tsx
import React, { useState } from 'react';
import { Box, Button, List, ListItem, ListItemText } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

const DocumentUpload: React.FC<{ leadId: number }> = ({ leadId }) => {
  const [documents, setDocuments] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocuments = Array.from(files).map((file) => file.name);
      setDocuments([...documents, ...newDocuments]);
    }
  };

  return (
    <Box>
      <input
        type="file"
        multiple
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id={`upload-${leadId}`}
      />
      <label htmlFor={`upload-${leadId}`}>
        <Button variant="contained" component="span" startIcon={<AttachFile />}>
          Upload Documents
        </Button>
      </label>
      <List>
        {documents.map((doc, index) => (
          <ListItem key={index}>
            <ListItemText primary={doc} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DocumentUpload;