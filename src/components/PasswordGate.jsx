import { useState } from 'react';
import './PasswordGate.css';

const CORRECT_PASSWORD = 'vitalwissen2024';
const STORAGE_KEY = 'vw_access_granted';

export default function PasswordGate({ children }) {
  const [granted, setGranted] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === 'yes'
  );
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (granted) return children;

  function handleSubmit(e) {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'yes');
      setGranted(true);
    } else {
      setError(true);
      setInput('');
      setTimeout(() => setError(false), 2000);
    }
  }

  return (
    <div className="pw-overlay">
      <div className="pw-box">
        <div className="pw-logo">VitalWissen</div>
        <p className="pw-subtitle">Beta · Nur für Tester</p>
        <form onSubmit={handleSubmit} className="pw-form">
          <input
            className={`pw-input${error ? ' pw-input-error' : ''}`}
            type="password"
            placeholder="Passwort eingeben"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          {error && <p className="pw-error">Falsches Passwort</p>}
          <button className="pw-btn" type="submit">Zugang</button>
        </form>
      </div>
    </div>
  );
}
