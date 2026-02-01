import React from 'react'

function StartPanel({onAddAction, onAddBranch, onAddEnd}) {
  return (
    <div>
      <div onClick={onAddAction}>➕ Add Action</div>
      <div onClick={onAddBranch}>➕ Add Branch</div>
      <div onClick={onAddEnd}>➕ Add End</div>
    </div>
  )
}

export default StartPanel
