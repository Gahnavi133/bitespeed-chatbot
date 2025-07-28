import React, { useState } from 'react';
import FlowCanvas from './FlowCanvas';
import Sidebar from './components/Sidebar';
import SettingsPanel from './SettingsPanel';
import ErrorBoundary from './components/ErrorBoundary';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addTextNode = () => {
    const id = uuidv4();

    const newNode = {
      id,
      type: 'textNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: 'New Message',
        onChange: (value) => updateNodeLabel(id, value),
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const updateNodeLabel = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: value,
                onChange: node.data.onChange,
              },
            }
          : node
      )
    );

    // Sync with selectedNode (to update SettingsPanel in real-time)
    setSelectedNode((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            data: {
              ...prev.data,
              label: value,
              onChange: prev.data.onChange,
            },
          }
        : prev
    );
  };

  const saveFlow = () => {
    const nodesWithOutgoing = new Set(edges.map((e) => e.source));
    const nodesWithoutOutgoing = nodes.filter((n) => !nodesWithOutgoing.has(n.id));

    if (nodes.length > 1 && nodesWithoutOutgoing.length > 1) {
      alert('❌ Error: Multiple nodes have empty target handles.');
    } else {
      const flow = { nodes, edges };
      localStorage.setItem('chatbot-flow', JSON.stringify(flow));
      alert('✅ Flow saved to localStorage');
    }
  };

  const loadFlow = () => {
    const flow = JSON.parse(localStorage.getItem('chatbot-flow'));
    if (flow) {
      const updatedNodes = flow.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: (value) => updateNodeLabel(node.id, value),
        },
      }));
      setNodes(updatedNodes);
      setEdges(flow.edges || []);
    } else {
      alert('No saved flow found ❌');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {selectedNode ? (
        <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} />
      ) : (
        <Sidebar addTextNode={addTextNode} />
      )}

      <div style={{ flex: 1 }}>
        <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
          <button onClick={saveFlow}>💾 Save</button>
          <button onClick={loadFlow}>📂 Load</button>
        </div>

        <ErrorBoundary>
          <FlowCanvas
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            setSelectedNode={setSelectedNode}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
