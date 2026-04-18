"use client";

import React from 'react';
import styles from './page.module.css';

// The "Bundle" stays here, tucked away
const STICKER_BUNDLE = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueHdwZzZ0eHdwZzZ0eHdwZzZ0eHdwZzZ0eHdwZzZ0eHdwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3o7TKVUn7iM8FMEU24/giphy.gif", // Happy Panda
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmpqMzQyOWo2NTZ0bzF0em9ubzF4NTVicTRscjE0czhwOGlldnEyOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ONyTeYeH696IpVL95D/giphy.gif", // Cool Dino
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXVwbmlqNXdueHoybzRicDF0Y293bGE4aXh3a24zZDl5Y202d3BybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zhL1ju4S5mKcEBmSD7/giphy.gif", // Cool Dino

];

export default function Celebration({ currentLesson, onNextLesson, onBackToMenu }) {
  // Pick a random sticker every time this component loads
  const randomSticker = STICKER_BUNDLE[Math.floor(Math.random() * STICKER_BUNDLE.length)];

  return (
    <div className={styles.container}>
      <div className={styles.celebrationCard}>
        <div className={styles.stickerAnim}>🎉</div>
        <h2 className={styles.title}>Great Job!</h2>
        <p>You finished Lesson {currentLesson}!</p>
        
        <img 
          src={randomSticker} 
          alt="Reward Sticker" 
          style={{ width: '180px', height: '180px', objectFit: 'contain', marginBottom: '20px' }}
        />

        <button className={styles.gotItBtn} onClick={onNextLesson}>
          Next Lesson 🚀
        </button>
        
        <button 
          className={styles.backBtn} 
          style={{ position: 'static', marginTop: '15px' }} 
          onClick={onBackToMenu}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}