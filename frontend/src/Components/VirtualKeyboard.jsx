import React, { useState } from 'react';

const VirtualKeyboard = () => {
  const [language, setLanguage] = useState('en-US');
  const [inputValue, setInputValue] = useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleKeyPress = (key) => {
    setInputValue(prevValue => prevValue + key);
  };

  const clearInput = () => {
    setInputValue('');
  };

  const renderKeyboard = () => {
    const keyboardLayouts = {
      'en-US': ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'],
      'es-ES': ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'],
      'hi-IN': ['कखगघङचछजझञटठडढणतथदधनपफबभमयरलळवशषसह'],
      'ta-IN': ['அஆஇஈஉஊஎஏஐஒஓகஙசஞடணதநனபமயரலவழளறனஒஓஔ']
    };

    const layout = keyboardLayouts[language] || [];

    return (
      <div className="keyboard">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.split('').map((key, index) => (
              <button key={index} onClick={() => handleKeyPress(key)}>{key}</button>
            ))}
          </div>
        ))}
        <button onClick={clearInput}>Clear</button>
      </div>
    );
  };

  return (
    <div>
      <h2>Virtual Keyboard</h2>
      <select value={language} onChange={handleLanguageChange}>
        <option value="en-US">English (US)</option>
        <option value="es-ES">Spanish</option>
        <option value="hi-IN">Hindi</option>
        <option value="ta-IN">Tamil</option>
      </select>
      <input type="text" value={inputValue} readOnly />
      {renderKeyboard()}
    </div>
  );
};

export default VirtualKeyboard;
