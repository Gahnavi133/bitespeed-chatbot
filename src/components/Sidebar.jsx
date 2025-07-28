import React from 'react';

function Sidebar({ addTextNode }) {
  return (
    <div style={{ width: '200px', padding: '10px', background: '#f0f0f0' }}>
      <h4>📌 Nodes Panel</h4>
      <button onClick={addTextNode}>➕ Text Node</button>
    </div>
  );
}

export default Sidebar;