import axios from 'axios';

const testServer = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/test');
    console.log(response.data); // {message: "Server is working!"}
  } catch (error) {
    console.error('Connection failed:', error);
  }
};

// Call the function
testServer();