import React from 'react';
import styles from './NoteContainer.module.css';

const NotesContainer = ({
	notes,
	onAddNote,
	onDeleteNote,
	currentNote,
	setCurrentNote,
}) => {

	const sortedNotes = notes.sort((a,b) => b.modifiedDate - a.modifiedDate);

	return (
		<div className={styles.notesContainer}>
			<div className={styles.header}>
				<h2> Start a Note </h2>

				<button onClick={onAddNote}> Add </button>
			</div>

			<div className={styles.notesHolder}>
				{sortedNotes.map(note => {
          return (
            <div
              className={`${styles.note} ${note.id === currentNote ? styles.activeNote : ''}`}
							key={note.id}
							onDoubleClick={() => setCurrentNote(note.id)}
						>
							<div className={styles.noteHeader}>
								<h3> {note.title} </h3>
								<button
									className={styles.btnDelete}
									onClick={e => onDeleteNote(note.id)}
								>
									{' '}
									Delete{' '}
								</button>
							</div>

							<p className={styles.noteDetails}>{note.body && note.body.substr(0, 120) + "..."}</p>

							<small className={styles.noteMeta}>
								Last Modified{' '}
								{new Date(note.modifiedDate).toLocaleDateString(
									'en-GB',
									{
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit'
									}
								)}
							</small>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default NotesContainer;