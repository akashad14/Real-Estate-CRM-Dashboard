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
} from "@mui/material";
import Layout from "../components/layout/Layout";
import PropertyForm from "../components/Properties/PropertyForm"; // Ensure correct import

interface Property {
  id: number;
  type: string;
  size: string;
  location: string;
  budget: string;
  availability: string;
}

const PropertiesPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([
    { id: 1, type: "Residential", size: "1500 sq ft", location: "New York, NY", budget: "$500,000", availability: "Immediate" },
    { id: 3, type: "Residential", size: "2000 sq ft", location: "Chicago, IL", budget: "$650,000", availability: "6 months" },
    { id: 4, type: "Commercial", size: "3000 sq ft", location: "Houston, TX", budget: "$1,500,000", availability: "Immediate" },
    { id: 5, type: "Land", size: "1 acre", location: "Phoenix, AZ", budget: "$300,000", availability: "12 months" },
    { id: 6, type: "Residential", size: "1800 sq ft", location: "San Diego, CA", budget: "$750,000", availability: "2 months" },
    { id: 7, type: "Commercial", size: "7000 sq ft", location: "San Francisco, CA", budget: "$3,000,000", availability: "9 months" },
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleDeleteProperty = (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      setProperties(properties.filter((property) => property.id !== id));
    }
  };

  const handleSubmitProperty = (data: { type: string; size: string; location: string; budget: string; availability: string }) => {
    if (editingProperty) {
      // Update existing property
      const updatedProperties = properties.map((property) =>
        property.id === editingProperty.id ? { ...property, ...data } : property
      );
      setProperties(updatedProperties);
    } else {
      // Add new property
      const newProperty = { id: properties.length + 1, ...data };
      setProperties([...properties, newProperty]);
    }
    setIsFormOpen(false);
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.budget.includes(searchTerm) ||
      property.availability.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Box>
        <TextField
          label="Search by Type, Location, Budget, or Availability"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddProperty}>
          Add Property
        </Button>
        {isFormOpen && (
          <PropertyForm
            initialData={editingProperty || undefined}
            onSubmit={handleSubmitProperty}
            onCancel={() => setIsFormOpen(false)}
            onDelete={handleDeleteProperty}
          />
        )}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.size}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.budget}</TableCell>
                  <TableCell>{property.availability}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditProperty(property)} sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button onClick={() => handleDeleteProperty(property.id)} color="error">
                      Delete
                    </Button>
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

export default PropertiesPage;