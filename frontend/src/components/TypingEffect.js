import React, { useState, useEffect } from 'react';
import '../assets/css/TypingEffect.css'; // Make sure to import your CSS file

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 100; // Speed of typing in milliseconds
  const pauseDuration = 1000; // Duration to pause before restarting

  useEffect(() => {
    let index = 0;
    var typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index > text.length - 1) {
        clearInterval(typingInterval);
        // Pause before starting to erase text
        setTimeout(() => {
          setDisplayedText('');
          index = 0;
          // Restart typing effect
          typingInterval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index += 1;
            if (index > text.length - 1) {
              clearInterval(typingInterval);
              // Pause before starting again
              setTimeout(() => {
                setDisplayedText('');
                index = 0;
                typingInterval = setInterval(() => {
                  setDisplayedText((prev) => prev + text[index]);
                  index += 1;
                  if (index > text.length - 1) {
                    clearInterval(typingInterval);
                  }
                }, typingSpeed);
              }, pauseDuration);
            }
          }, typingSpeed);
        }, pauseDuration);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [text]);

  return (
    <div className="typing-container">
      <h1>{displayedText}<span className="cursor">|</span></h1>
    </div>
  );
};

export default TypingEffect;
