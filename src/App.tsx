import { useState } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import Header from './components/Header';
import { DEFAULT_SETTINGS } from './utils/constants';
import { ISettings } from './utils/interfaces';

function App() {
  const [settings, setSettings] = useState<ISettings>(DEFAULT_SETTINGS)

  // Enable/disable Berk's colourful background shader
  const canvas = document.querySelector('canvas');
  if (canvas) {
    if (settings.colourfulBackground) {
      canvas.style.display = 'block';
    } else {
      canvas.style.display = 'none';
    }
  }

  return (
    <div>
      <Header settings={settings} setSettings={setSettings} />
      <Gallery />
    </div>
  );
}

export default App;
