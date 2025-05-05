import React from 'react'
import '../App.css'

function Header({ onOpen, onSave, selectedFile }) {
  return (
    <header className="header">
      <div className="header-title">
        📄 Text Editor Pro
        {selectedFile && <span>{selectedFile.name}</span>}
      </div>
      <div className="header-buttons">
        <button onClick={onOpen}>📂 Ouvrir</button>
        <button onClick={onSave} disabled={!selectedFile}>💾 Sauvegarder</button>
      </div>
    </header>
  )
}

export default Header
