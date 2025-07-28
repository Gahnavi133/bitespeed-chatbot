// components/TextNode.jsx
import React from 'react';
import { Handle, Position } from 'reactflow';

function TextNode({ data }) {
  return (
    <div className="p-2 bg-white border rounded shadow w-40">
      <Handle type="target" position={Position.Top} />
      <input
        type="text"
        value={data.label}
        onChange={(e) => data.onChange(e.target.value)}
        className="border px-2 py-1 w-full text-sm"
      />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default TextNode;
