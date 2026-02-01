import React from 'react'

function ActionPanel({onEdit, onDelete}) {
  return (
    <div className='actions-panel'>
      <div onClick={onEdit}>✏️ Edit</div>
      <div onClick={onDelete}>❌ Delete </div>
    </div>
  )
}

export default ActionPanel
