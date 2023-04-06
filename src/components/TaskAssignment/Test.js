import React, { useState } from 'react';

export default function Test() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  }

  return (
    <div>
      <label htmlFor="my-select">Select a value:</label>
      <select id="my-select" value={selectedValue} onChange={handleValueChange}>
        <option value="">--Please choose an option--</option>
        <option value="value1">Value 1</option>
        <option value="value2">Value 2</option>
        <option value="value3">Value 3</option>
      </select>
      <p>You have selected: {selectedValue}</p>
    </div>
  );
}