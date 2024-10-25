// frontend/services/api.js
import axios from 'axios';
import { saveGeneratedImage } from './firebaseService';

const API_URL = 'http://localhost:5000'; // Your backend URL

export const generateDiagram = async (inputText) => {
  try {
    const response = await axios.post(`${API_URL}/generate-diagram`, {
      text: inputText,
    }, {
      responseType: 'text'
    });
    
    if (response.data) {
      return { svgString: response.data };
    } else {
      throw new Error('No SVG data received from the server');
    }
  } catch (error) {
    console.error('Error generating diagram:', error);
    throw error;
  }
};

export const generateImage = async (inputText) => {
  try {
    const response = await axios.post(`${API_URL}/generate-image`, {
      text: inputText,
    }, {
      responseType: 'arraybuffer'
    });
    
    if (response.data) {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      const imageData = `data:image/png;base64,${base64}`;
      const imageUrl = await saveGeneratedImage(imageData, inputText);
      return { imageData, imageUrl };
    } else {
      throw new Error('No image data received from the server');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
