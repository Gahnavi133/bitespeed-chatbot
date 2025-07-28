import React from 'react';
import { nanoid } from 'nanoid';

function NodesPanel({ nodes, setNodes }) {
  const addNode = () => {
    const newNode = {
      id: nanoid(),
      type: 'default',
      position: { x: 100 + nodes.length * 40, y: 100 + nodes.length * 40 },
      data: { label: 'New Message' },
    };
    setNodes((prev) => [...prev, newNode]);
  };

  return (
    <div>
      <h3>Nodes Panel</h3>
      <button onClick={addNode}>Message</button>
    </div>
  );
}

export default NodesPanel;
