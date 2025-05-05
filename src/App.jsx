import React from 'react'
import FileList from './components/FileList'

function App() {
  // Fake liste de fichiers pour test
  const fakeFiles = [
    { name: 'test1.txt', path: '/fake/path/test1.txt' },
    { name: 'note.txt', path: '/fake/path/note.txt' },
    { name: 'exemple.txt', path: '/fake/path/exemple.txt' }
  ]

  const handleSelect = (file) => {
    alert(`Fichier sélectionné : ${file.name}`)
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <FileList files={fakeFiles} onSelect={handleSelect} />
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Partie droite (éditeur à venir)</h2>
      </div>
    </div>
  )
}

export default App
