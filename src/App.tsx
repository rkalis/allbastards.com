import { Web3ReactProvider } from '@web3-react/core';
import { useEffect, useState } from 'react';
import createPersistedState from 'use-persisted-state';
import { ToastContainer } from 'react-toastify';
import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Background from './components/p5/Background';
import { range } from './utils';
import { DEFAULT_SETTINGS, HIGHEST_BASTARD_ID } from './utils/constants';
import { ISettings } from './utils/interfaces';
import { getLibrary } from './utils/web3';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const useSettingsState = createPersistedState('allbastards-settings');

function App() {
  const [settings, setSettings] = useSettingsState<ISettings>(DEFAULT_SETTINGS);
  const [indices, setIndices] = useState<number[]>(range(HIGHEST_BASTARD_ID + 1));

  const [marginTop, setMarginTop] = useState<number>(0);
  const [marginBottom, setMarginBottom] = useState<number>(0);

  useEffect(() => {
    // Ensure that new settings are added alongside the old ones if settings are already saved
    const combinedSettings = { ...DEFAULT_SETTINGS, ...settings };
    if (JSON.stringify(combinedSettings) !== JSON.stringify(settings)) {
      setSettings(combinedSettings);
    }
  }, [settings]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header
          settings={settings}
          setSettings={setSettings}
          indices={indices}
          setIndices={setIndices}
          setMarginTop={setMarginTop}
        />
        <Gallery settings={settings} indices={indices} marginTop={marginTop} marginBottom={marginBottom} />
        <Footer settings={settings} setMarginBottom={setMarginBottom} />
        {settings.colourfulBackground && <Background />}
      </div>
    </Web3ReactProvider>
  );
}

export default App;
