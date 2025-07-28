import React from 'react';

function SaveFlowButton({ nodes, edges }) {
  const handleSave = () => {
    // ... your validation logic
  };

  return (
    <button
      onClick={handleSave}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: 'calc(250px + 20px)',
        padding: '10px 20px',
        fontSize: '16px',
      }}
    >
      Save Changes
    </button>
  );
}

export default SaveFlowButton;
