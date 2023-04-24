import React, { useState } from 'react';
import '/ondo-app/src/index';

function App() {
  const [messageInput, setMessageInput] = useState('');

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleButtonClick = () => {
    // 버튼 클릭 시 실행되는 로직
  };

  return (
    <>
      <h1>ONDO</h1>

      <input id="message-input" type="text" value={messageInput} onChange={handleInputChange} />
      <button className="RUN" onClick={handleButtonClick}>RUN</button>

      <div className="chatroom"></div>

      <div className="button-group">
        <button className="button1" onClick={() => { window.location.href = 'https://www.musinsa.com/app/'; }}>MUSINSA</button>
        <button className="button2" onClick={() => { window.location.href = 'https://www.wconcept.co.kr/'; }}>W CONCEPT</button>
        <button className="button3" onClick={() => { window.location.href = 'https://www.29cm.co.kr/home/'; }}>29cm</button>
        <button className="button4" onClick={() => { window.location.href = 'https://www.black-up.kr/'; }}>BLACKUP</button>
        <button className="button5" onClick={() => { window.location.href = 'https://kream.co.kr/'; }}>Kream</button>
      </div>

      <object data="https://api-inference.huggingface.co/docs/python/html/quicktour.html" type="text/html"></object>
    </>
  );
}

export default App;