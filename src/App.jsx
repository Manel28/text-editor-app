import React, { useState, useEffect } from 'react'

import FileList from './components/FileList'
import TextEditor from './components/TextEditor'

import Header from './components/Header'
import './App.css'

function App() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [content, setContent] = useState("")

  const openFolder = async () => {
    const fileList = await window.electronAPI.openFolder()
    setFiles(fileList)
    setSelectedFile(null)
    setContent("")
  }

  const handleSelect = async (file) => {
    const text = await window.electronAPI.readFile(file.path)
    setSelectedFile(file)
    setContent(text)
  }

  const handleSave = async () => {
    if (selectedFile) {
      await window.electronAPI.saveFile({ filePath: selectedFile.path, content })
      alert('💾 Sauvegarde réussie !')
  
      //  on ferme le fichier
      setSelectedFile(null)
      setContent("")
    }
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }
  
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSave, selectedFile, content])
  

  return (
    <div className="app-container">
      <Header onOpen={openFolder} onSave={handleSave} selectedFile={selectedFile} />
      <div className="main">
        <div className="sidebar">
          <h3>📁 Fichiers .txt</h3>
          <ul className="file-list">
            {files.map((file, i) => (
              <li key={i} onClick={() => handleSelect(file)}>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="editor-area">
  {selectedFile ? (
    <TextEditor content={content} onChange={setContent} />
  ) : (
    <p style={{ color: '#777' }}>
      Sélectionne un fichier à gauche pour l’éditer.
    </p>
  )}
</div>

      </div>
    </div>
  )
}

export default App
