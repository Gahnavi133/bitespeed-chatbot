// SettingsPanel.jsx
import React from 'react';

function SettingsPanel({ selectedNode }) {
  const handleChange = (e) => {
    const newLabel = e.target.value;

    // Call the node's onChange function to update its label
    if (selectedNode?.data?.onChange) {
      selectedNode.data.onChange(newLabel);
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 border-r h-full">
      <h2 className="text-lg font-semibold mb-2">Settings</h2>
      <label className="text-sm text-gray-600">Label:</label>
      <input
        type="text"
        value={selectedNode?.data?.label || ''}
        onChange={handleChange}
        className="border px-2 py-1 w-full text-sm mt-1"
      />
    </div>
  );
}

export default SettingsPanel;
