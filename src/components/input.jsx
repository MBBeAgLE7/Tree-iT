import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Tree } from 'react-tree-graph';
import './style.css';
import { CgEnter } from 'react-icons/cg';

export default function Input() {
    const [nodes, setNodes] = useState([]);
    const [treeData, setTreeData] = useState(null);
    const [rootnode, setroodnode] = useState(null);
    const nodeMap = new Map();
    const getrootnode = (e) => {
        setroodnode(e.target.value)
    }
    
    const generateTreeData = () => {
        if (nodes.length === 0) {
            return { name: null, children: [] }; 
        }
        nodes.map(node => {
            if(node.child === rootnode){
                alert("Root Node have parent. Hence change the inputs!!!!")
                return;
            }
        })
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

        const rootNode = nodeMap.get(rootnode);
        if (rootNode) {
            return rootNode;
        } else {
            alert("Root node is not part of the nodes. Please ensure the root node is correct.");
            return null;
        }
    };

    const addNode = () => {
        setNodes([...nodes, { id: nodes.length, parent: '', child: '' }]);
    };

    const deleteNode = () => {
        setNodes(nodes.slice(0, -1));
    };

    const updateNodeValue = (id, field, value) => {
        setNodes(nodes.map(node =>
        {
            if(node.id === id){
                if(field == 'child' && value == rootnode){
                    alert("Root Node cannot be a child");
                    return node;
                }
                else return {...node, [field] : value};
            }
            else{
                return node;
            }
        }
        ));
    };

    const formTree = () => {
        if(!rootnode){
            alert("Enter the root node first")
        }
        else{
            setTreeData(generateTreeData());
        }
    };

    return (
        <div className='input-box flex flex-row justify-center py-24'>
            <div className='input-child-1 w-full h-auto border-2 rounded-5 p-10 m-2 border-gray-700'>
                <div className='flex-col justify-center pb-10'><span className='flex justify-center pb-5'>Enter the root node</span><span className='flex justify-center'><input className='flex justify-center text-center border-[2px] rounded-[8px] border-gray-600' placeholder='Enter the root' onChange={getrootnode}></input></span></div>
                <div className='flex justify-around pb-5'>
                    <h2>Parent Node</h2>
                    <h2>Child Node</h2>
                </div>
                {nodes.map(node => (
                    <div key={node.id} className='flex justify-between'>
                        <input
                            className='border-[2px] rounded-[8px] border-gray-600 p-2 m-2'
                            type="text"
                            placeholder="Parent Node"
                            value={node.parent}
                            onChange={(e) => updateNodeValue(node.id, 'parent', e.target.value)}
                        />
                        <input
                            className='border-[2px] rounded-[8px] border-gray-600 p-2 m-2'
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
