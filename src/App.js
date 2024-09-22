import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageSubmit = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post("http://localhost:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data.class);
      setConfidence(response.data.confidence);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <div className="App">
      <h1>Potato Leaf Disease Prediction</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleImageSubmit}>Predict</button>

      {prediction && (
        <div className="result">
          <h3>Prediction: {prediction}</h3>
          <h4>Confidence: {(confidence * 100).toFixed(2)}%</h4>
        </div>
      )}
    </div>
  );
}

export default App;
