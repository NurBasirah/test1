"use client";

import React, { useState } from 'react';
import { hsk1 } from '../data/hsk1';

export default function Login() {
  // Use hsk1 as the initial data, but keep your custom phrases at the top
  const INITIAL_DECK = [
    { id: "custom-1", hanzi: "你好", pinyin: "nǐ hǎo", english: "Hello", level: 0 },
    { id: "custom-2", hanzi: "学习", pinyin: "xué xí", english: "To study", level: 0 },
    { id: "custom-3", hanzi: "我的名字是努尔·巴希拉", pinyin: "wǒ de míngzi shì nǔ'ěr·bāxīlā", english: "My name is Nur Bashira", level: 0 },
    ...hsk1 // This adds all 150 words from your data file automatically
  ];

  const [deck, setDeck] = useState(INITIAL_DECK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = deck[currentIndex];

  const speak = (text) => {
    if (typeof window !== "undefined") {
      // Cancel any current speech so it doesn't overlap
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.8; // Slightly slower for better learning
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleGrade = (difficulty) => {
    const updatedDeck = [...deck];
    if (difficulty === 'easy') updatedDeck[currentIndex].level += 1;
    if (difficulty === 'forgot') updatedDeck[currentIndex].level = 0;

    setDeck(updatedDeck);
    setIsFlipped(false);
    
    // Move to next card, or loop back to start
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Mandarin Mastery</h2>
      
      {/* Progress Counter */}
      <p style={{ fontSize: '0.9rem', color: '#666' }}>
        Card {currentIndex + 1} of {deck.length}
      </p>
      
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          border: '2px solid #333',
          borderRadius: '12px',
          padding: '40px',
          cursor: 'pointer',
          backgroundColor: '#f9f9f9',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000',
          transition: 'all 0.3s ease'
        }}
      >
        <h1 style={{ fontSize: currentCard.hanzi.length > 5 ? '1.8rem' : '3.5rem', margin: '0' }}>
          {currentCard.hanzi}
        </h1>
        
        {isFlipped && (
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '1.2rem' }}>{currentCard.pinyin}</p>
            <h3 style={{ fontWeight: 'normal' }}>{currentCard.english}</h3>
            <button 
              onClick={(e) => { e.stopPropagation(); speak(currentCard.hanzi); }}
              style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '20px', border: '1px solid #ddd' }}
            >
              🔊 Listen
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        {!isFlipped ? (
          <p style={{ color: '#888' }}>Tap card to reveal answer</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button 
              onClick={() => handleGrade('forgot')} 
              style={{ padding: '10px 25px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Forgot
            </button>
            <button 
              onClick={() => handleGrade('easy')} 
              style={{ padding: '10px 25px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Got it!
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
        <small>Current Card Level: {currentCard.level || 0}</small>
      </div>
    </div>
  );
}