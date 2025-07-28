import React from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './components/TextNode';

const nodeTypes = {
  textNode: TextNode,
};

function FlowCanvas({ nodes, setNodes, edges, setEdges, setSelectedNode }) {
  const onNodesChange = (changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  };

  const onEdgesChange = (changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (params) => {
    const existing = edges.find((e) => e.source === params.source);
    if (!existing) {
      setEdges((eds) => addEdge(params, eds));
    }
  };

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: '70vw', height: '90vh' }}>
      <ReactFlow
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
