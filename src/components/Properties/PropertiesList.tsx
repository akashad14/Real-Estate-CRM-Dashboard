
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const PropertiesList: React.FC = () => {
  const properties = [
    { id: 1, address: '123 Main St', price: '$500,000', status: 'For Sale' },
    { id: 2, address: '456 Elm St', price: '$300,000', status: 'Sold' },
    
  ];

  return (
    <List>
      {properties.map((property) => (
        <ListItem key={property.id}>
          <ListItemText primary={property.address} secondary={`${property.price} - ${property.status}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default PropertiesList;