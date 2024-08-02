import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('https://your-api-url.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    let filteredResponse = {};
    selectedOptions.forEach(option => {
      filteredResponse[option] = response[option];
    });
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder="Enter JSON input" />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <select multiple={true} value={selectedOptions} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
