import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  history: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})
