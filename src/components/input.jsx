import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Tree } from 'react-tree-graph';
import './style.css';
import { CgEnter } from 'react-icons/cg';

export default function Input() {
    const [nodes, setNodes] = useState([]);
    const [treeData, setTreeData] = useState(null);
    const nodeMap = new Map();
    const generateTreeData = () => {
        if (nodes.length === 0) {
            return { name: '', children: [] }; 
        }
        nodes.forEach(({parent, child}) => {
          if(!nodeMap.has(parent)){
            nodeMap.set(parent, {name : parent, children:[]});
          }
          if(!nodeMap.has(child)){
            nodeMap.set(child, {name:child, children:[]});
          }
          const parentnode = nodeMap.get(parent);
          const childnode = nodeMap.get(child);
          parentnode.children.push(childnode);
        });
        // nodeMap.forEach(({parent, child}) => {
        //     // return nodeMap.get(parent);
        // })
        return nodeMap.get(nodes[0].parent);
    };

    const addNode = () => {
        setNodes([...nodes, { id: nodes.length, parent: '', child: '' }]);
    };

    const deleteNode = () => {
        setNodes(nodes.slice(0, -1));
    };

    const updateNodeValue = (id, field, value) => {
        setNodes(nodes.map(node =>
            node.id === id ? { ...node, [field]: value } : node
        ));
    };

    const formTree = () => {
        setTreeData(generateTreeData());
    };

    return (
        <div className='input-box flex flex-row justify-center py-24'>
            <div className='input-child-1 w-full h-auto border-2 rounded-5 p-10 m-2 border-gray-700'>
                <div className='flex justify-around pb-5'>
                    <h2>Parent Node</h2>
                    <h2>Child Node</h2>
                </div>
                {nodes.map(node => (
                    <div key={node.id} className='flex justify-between'>
                        <input
                            className='border p-2 m-2'
                            type="text"
                            placeholder="Parent Node"
                            value={node.parent}
                            onChange={(e) => updateNodeValue(node.id, 'parent', e.target.value)}
                        />
                        <input
                            className='border p-2 m-2'
                            type="text"
                            placeholder="Child Node"
                            value={node.child}
                            onChange={(e) => updateNodeValue(node.id, 'child', e.target.value)}
                        />
                    </div>
                ))}
                <div className='flex justify-between mt-4'>
                    <button onClick={addNode}>
                        <FaPlusCircle size={24} />
                    </button>
                    <button onClick={deleteNode}>
                        <MdDeleteForever size={30} />
                    </button>
                </div>
            </div>
            <div className='input-child-1 w-full h-auto border-2 rounded-5 p-10 m-2 border-gray-700 bg-gray-400'>
                <h3 className='text-lg font-bold mb-2'>Graph For Entered Nodes :</h3>
                <div style={{ height: '400px', width: '400px' }}>
                    <button onClick={formTree} className='border-2 px-5 border-gray-600 rounded-xl mb-4'>
                        Print
                    </button>
                    {treeData && (
                        <Tree
                            data={treeData}
                            height={500}
                            width={500}
                            textProps={{
                                transform: 'rotate(-90)',
                                textAnchor: 'middle',
                                x : -5
                            }}
                            svgProps={
                                {
                                    "text" : "rotate(90)",
                                    "transform": "rotate(90)"
                                  }
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
