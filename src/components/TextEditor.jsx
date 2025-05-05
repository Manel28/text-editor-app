import React from 'react'
import '../App.css'

function TextEditor({ content, onChange }) {
  return (
    <textarea
      className="text-editor"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Commence à écrire ici..."
    />
  )
}

export default TextEditor
