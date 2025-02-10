import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Layout from "../components/layout/Layout";

interface Lead {
  id: number;
  name: string;
  phone: string;
}

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, name: "John Doe", phone: "1234567890" },
    { id: 2, name: "Jane Smith", phone: "0987654321" },
    { id: 3, name: "Bob Brown", phone: "4445556666" },
    { id: 4, name: "Charlie White", phone: "7778889999" },
    { id: 5, name: "David Black", phone: "1011121314" },
  ]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleAddLead = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newLead = { id: leads.length + 1, name, phone };
    setLeads([...leads, newLead]);
    handleCancel(); // Reset form and hide
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setShowEditPanel(true);
  };

  const handleUpdateLead = () => {
    if (!editingLead) return;

    if (!editingLead.name.trim() || !editingLead.phone.trim()) {
      setErrors({
        name: editingLead.name ? "" : "Name is required",
        phone: editingLead.phone ? "" : "Phone number is required",
      });
      return;
    }

    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === editingLead.id ? { ...editingLead } : lead
      )
    );
    handleCancel();
  };

  const handleDeleteLead = (id: number) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
      if (editingLead?.id === id) {
        handleCancel();
      }
    }
  };

  const handleCancel = () => {
    setEditingLead(null);
    setName("");
    setPhone("");
    setErrors({});
    setShowForm(false);
    setShowEditPanel(false);
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
  );

  return (
    <Layout>
      {/* Top Section: Search Bar & Create Button (Aligned Left) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, mt: 2 }}>
        <TextField
          label="Search by Name or Phone"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 250 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={() => setShowForm(true)}
        >
          Create Lead
        </Button>
      </Box>

      {/* Add Lead Form */}
      {showForm && (
        <Card sx={{ width: 350, mb: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">Add New Lead</Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333" },
                  flex: 1,
                }}
                onClick={handleAddLead}
              >
                Save Lead
              </Button>
              <Button variant="outlined" sx={{ flex: 1 }} onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Edit Lead Panel */}
      {showEditPanel && editingLead && (
        <Card sx={{ width: 350, mb: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">Edit Lead</Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={editingLead.name}
              onChange={(e) =>
                setEditingLead({ ...editingLead, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              value={editingLead.phone}
              onChange={(e) =>
                setEditingLead({ ...editingLead, phone: e.target.value })
              }
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "#333" },
                  flex: 1,
                }}
                onClick={handleUpdateLead}
              >
                Update Lead
              </Button>
              <Button variant="outlined" sx={{ flex: 1 }} onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Lead Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Phone Number</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        "&:hover": { backgroundColor: "#333" },
                        mr: 1,
                      }}
                      onClick={() => handleEditLead(lead)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteLead(lead.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No matching leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default LeadsPage;
