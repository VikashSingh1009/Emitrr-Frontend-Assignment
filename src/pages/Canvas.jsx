import React from 'react'
import StartNode from "../components/StartNode"
import StartPanel from '../panels/StartPanel'
import { useState } from 'react'
import ActionNode from '../components/ActionNode';
import ActionPanel from '../panels/ActionPanel';

function Canvas() {
    const [showPanel, setShowPanel] = useState(false);

    // action useState 
    const [actions, setActions] = useState([]);

    // active action state add 
    const [activeActionId, setActiveActionId] = useState(null)

    // has end 
    // const [hasEnd, setHasEnd] = useState(false);



    const handleStartClick = () => {
        console.log("start clicked");
        setShowPanel(prev => !prev);
        
    }

    // add action logic 
    const handleAddAction = () => {
        setActions(prev => [
            ...prev, 
            {
                id: Date.now(), 
                label: "New Action"
            }
        ])
    }

     const handleActionClick = (id) => {
        setActiveActionId(prev => (prev === id ? null : id));
     };

     const [editingActionId, setEditingActionId] = useState(null);
     const [editingValue, setEditingValue] = useState("");


    //  Edit + save handler 
    const handleEditAction = (action) => {
        setEditingActionId(action.id);
        setEditingValue(action.label);
    }

    const handleSaveEdit = () => {
        setActions(prev => prev.map(action => 
            action.id === editingActionId
            ? { ...action, label : editingValue} : action
        ));

        setEditingActionId(null);
        setEditingValue("");
    }

    // add delete handler 
    const handleDeleteAction = (id) => {
        setActions(prev => prev.filter(action => action.id !== id));
        setActiveActionId(null);
    }

    const handleSaveWorkflow = () => {
        const workflow = {
            start: true,
            actions: actions,
        };

        console.log("saved workflow", JSON.stringify(workflow, null, 2));
        
    }
    

  return (
    <div className='canvas-wrapper'>
        <div className='canvas'>
            <h1 className='title'>Workflow Builder</h1>

            <div onClick={handleStartClick}>
                <StartNode/>

            </div>

            {showPanel && (
                <StartPanel 
                
                // onAddAction={() => console.log("Add Action")
                // }

                onAddAction={handleAddAction}

                // onAddBranch={() => console.log("Add Branch")
                // }
                onAddBranch={() => console.log(" Branch later")
                }

                // onAddEnd={() => console.log("Add End")}
                
                onAddEnd={() => console.log("End later")}

                />
            )}

            {/* action list  */}
            {/* <div className='actions-area'>
                {actions.map(action => (
                    <ActionNode key={action.id}
                    label={action.label} />
                ))}

            </div> */}


            {/* updated action list 
             */}
             <div className="actions-area">
                {actions.map(action => (
                    <div key={action.id}>
                        {/* <div onClick={() => handleActionClick(action.id)}>
                            <ActionNode label={action.label}
                            />
                        </div> */}

                        {editingActionId === action.id  ? (
                            <input autoFocus
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onBlur={handleSaveEdit}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                            style={{marginTop: "10px" , padding: "6px"}}/> ) : (
                                <div onClick={() => handleActionClick(action.id)}>
                                    <ActionNode label={action.label} />
                                </div>
                        )}

                        {activeActionId === action.id && (
                            <ActionPanel 
                            // onEdit={() => console.log("Edit", action.id)}

                            onEdit={() => handleEditAction(action)}
                            onDelete={() => handleDeleteAction(action.id)}

                            


                            // onDelete={() => console.log("Delete", action.id)} 
                            />
                        )}

                    </div>
                ))}
             </div>
        </div>

        <button onClick={handleSaveWorkflow} style={{marginTop: "30px",
            padding: "10px 16px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
        }}>
            Save Workflow
        </button>
      
    </div>

    // add save button 
    
  )
}

export default Canvas
