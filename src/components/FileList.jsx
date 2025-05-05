import React from 'react'

function FileList({ files, onSelect }) {
  return (
    <div style={{ width: '30%', background: '#f4f4f4', padding: '10px', overflowY: 'auto' }}>
      <h3>📄 Fichiers .txt</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {files.map((file, i) => (
          <li
            key={i}
            onClick={() => onSelect(file)}
            style={{
              cursor: 'pointer',
              padding: '5px',
              borderBottom: '1px solid #ccc',
              marginBottom: '4px'
            }}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileList
