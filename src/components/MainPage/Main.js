import React, { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import styles from './Main.module.css';

const Main = ({ currentNote, updateNote }) => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [setImageSrc] = useState('');

  const onEditNote = (key, value) => {
    updateNote({
      ...currentNote,
      [key]: value,
      modifiedDate: Date.now()
    });
  };

  const handleFormatClick = (format) => {
    setSelectedFormat(format);
  };
  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  const handleImageInsert = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
      onEditNote('body', `${currentNote.body}![${file.name}](${reader.result})`);
    };
  };

  if (!currentNote) {
    return <div className={styles.dummyText}> No Active Notes </div>;
  }

  return (
    <div className={styles.mainSection}>
      <div className={styles.formControls}>
        <input
          type="text"
          name="noteTitle"
          id="noteTitle"
          placeholder="Title"
          autoComplete="off"
          value={currentNote.title}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
          name=""
          id=""
          placeholder="Start writing your notes ..."
          autoComplete="off"
          value={currentNote.body}
          onChange={(e) => onEditNote('body', e.target.value)}
          style={{ fontWeight: selectedFormat === 'bold' ? 'bold' : 'normal', fontStyle: selectedFormat === 'italic' ? 'italic' : 'normal', textDecoration: selectedFormat === 'underline' ? 'underline' : 'none', fontFamily: selectedFont}}
		  
        ></textarea>
      </div>

      <div className={styles.formatControls}>
        <button onClick={() => handleFormatClick('bold')}><strong>BOLD</strong></button>
        <button onClick={() => handleFormatClick('italic')}><em>Italic</em></button>
        <button onClick={() => handleFormatClick('underline')}><u>Underlin</u></button>
		<select value={selectedFont} onChange={(e) => handleFontChange(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Impact">Impact</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageInsert} className='img' />
      </div>

      <div className={styles.previewArea}>
        <div className={styles.noteTitle}>
          <h3> {currentNote.title} </h3>
		  <p>{currentNote.body}</p>
        </div>

        <div className={styles.noteText}>
          <ReactMarkdown
            className={styles.note}
            source={currentNote.body}
            style={{ fontWeight: selectedFormat === 'bold' ? 'bold' : 'normal', fontStyle: selectedFormat === 'italic' ? 'italic' : 'normal', textDecoration: selectedFormat === 'underline' ? 'underline' : 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
