import axios from 'axios';

const useApi = () => {
  const get = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { get };
};

export default useApi;