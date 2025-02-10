import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../components/layout/Layout';
import LeadForm from '../components/lead/LeadForm'; // Ensure correct import

interface Lead {
  id: number;
  name: string;
  phone: string;
}

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, name: 'John Doe', phone: '1234567890' },
    { id: 2, name: 'Jane Smith', phone: '0987654321' },
    { id: 3, name: 'Alice Johnson', phone: '1112223333' },
    { id: 4, name: 'Bob Brown', phone: '4445556666' },
    { id: 5, name: 'Charlie White', phone: '7778889999' },
    { id: 6, name: 'David Black', phone: '1011121314' },
    
    
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddLead = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  const handleSubmitLead = (data: { name: string; phone: string }) => {
    if (editingLead) {
      // Update existing lead
      const updatedLeads = leads.map((lead) =>
        lead.id === editingLead.id ? { ...lead, ...data } : lead
      );
      setLeads(updatedLeads);
    } else {
      // Add new lead
      const newLead = { id: leads.length + 1, ...data };
      setLeads([...leads, newLead]);
    }
    setIsFormOpen(false);
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
  );

  return (
    <Layout>
      <Box>
        <TextField
          label="Search by Name or Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddLead}>
          Add New Lead
        </Button>
        {isFormOpen && (
          <LeadForm
            initialData={editingLead || undefined}
            onSubmit={handleSubmitLead}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditLead(lead)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default LeadsPage;