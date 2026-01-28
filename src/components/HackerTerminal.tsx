"use client";

import { useState, useEffect } from 'react';

const HackerTerminal = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  const terminalCommands = [
    '> Initializing neural interface...',
    '> Connecting to mainframe...',
    '> Bypassing firewall...',
    '> Access granted. Welcome, user.',
    '> Loading quantum encryption...',
    '> Hacking the matrix...',
    '> System compromised.',
    '> Deploying cyber weapons...',
    '> Mission complete.'
  ];

  useEffect(() => {
    let commandIndex = 0;
    let charIndex = 0;
    let currentCommand = '';
    
    const typeWriter = () => {
      if (commandIndex < terminalCommands.length) {
        const fullCommand = terminalCommands[commandIndex];
        
        if (charIndex < fullCommand.length) {
          currentCommand += fullCommand[charIndex];
          setText(currentCommand);
          charIndex++;
          setTimeout(typeWriter, 50);
        } else {
          setTimeout(() => {
            currentCommand = '';
            charIndex = 0;
            commandIndex++;
            if (commandIndex < terminalCommands.length) {
              setText(text + '<br>');
              typeWriter();
            }
          }, 2000);
        }
      }
    };

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    setTimeout(typeWriter, 1000);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="terminal-overlay">
      <div 
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {showCursor && <span className="terminal-cursor" />}
    </div>
  );
};

export default HackerTerminal;