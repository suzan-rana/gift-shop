import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [inputData, setInputData] = useState({
    name: "",
  });
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    setInputData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/takesuzan",
      inputData
    );

    setResponse(data.yourname);
  };

  return (
    <>
      <div>
        <input type="text" onChange={handleChange} />
        <button className="btn" onClick={handleSubmit}>
          Submit name
        </button>
      </div>
      <div>{response}</div>
    </>
  );
};

export default App;
