"use client";

import { useState } from "react";
import { generateImage } from "../../services/api";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateImage = async () => {
    setIsLoading(true);
    try {
      const result = await generateImage(inputText);
      if (result && result.imageData) {
        setGeneratedImages((prevImages) => {
          const newImages = [...prevImages, result.imageData];
          setCurrentImageIndex(newImages.length - 1);
          return newImages;
        });
      } else {
        throw new Error('No image data received from the server');
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error generating image: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < generatedImages.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">AI Image Generator</h2>
      <div className="max-w-2xl mx-auto">
        <textarea
          className="w-full p-4 border rounded-lg shadow-sm mb-4 h-32 text-gray-800"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Describe the image you want to generate..."
        ></textarea>
        <button
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold mb-8 hover:bg-blue-600 transition duration-300"
          onClick={handleGenerateImage}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>

        {generatedImages.length > 0 && currentImageIndex < generatedImages.length && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {generatedImages.map((imageData, index) => (
              <div key={index} style={{display: index === currentImageIndex ? 'block' : 'none'}}>
                <img src={imageData} alt={`Generated image ${index + 1}`} className="w-full" />
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={handlePreviousImage}
                disabled={currentImageIndex === 0}
              >
                Previous
              </button>
              <span>{`${currentImageIndex + 1} / ${generatedImages.length}`}</span>
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg"
                onClick={handleNextImage}
                disabled={currentImageIndex === generatedImages.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
