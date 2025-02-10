export type Lead = {
  id: string;
  name: string;
  phone: string;
  documents?: { name: string }[];
};

export type Property = {
  id: string;
  type: string;
  location: string;
  size: string;
  budget: string;
};