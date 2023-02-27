import { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/MainPage/Main';
import NotesContainer from './components/NoteContainer/NoteContainer';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(false)

	const addNote = () => {
		const newNote = {
			id: uuid(),
			title: 'Title',
			body: '',
			modifiedDate: Date.now(),
		};

		setNotes([newNote, ...notes]);
	};

  const deleteNote = idToDelete => {
		setNotes(notes.filter(note => note.id !== idToDelete));
  };

  const getCurrentNote = () =>{
		return notes.find((note) => note.id === currentNote)
	}
	
	const updateNoteHandler = (updatedNote) => {
		const updatedNoteArray = notes.map((note) => {
			if (note.id === currentNote) {
				return updatedNote
			}
			return note
		})

		setNotes(updatedNoteArray)
	}

	return (
		<div className="App">
      <Header/>
      <div className='app'>
			<NotesContainer
				notes={notes}
				onAddNote={addNote}
        onDeleteNote={deleteNote}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
			/>
			<Main currentNote={getCurrentNote()} updateNote={ updateNoteHandler } />
		</div>
    </div>
	);
}

export default App;