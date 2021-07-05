import { Web3ReactProvider } from '@web3-react/core';
import { useState } from 'react';
import createPersistedState from 'use-persisted-state';
import Gallery from './components/gallery/Gallery';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Background from './components/p5/Background';
import { range } from './utils';
import { DEFAULT_SETTINGS, HIGHEST_BASTARD_ID } from './utils/constants';
import { ISettings } from './utils/interfaces';
import { getLibrary } from './utils/web3';

const useSettingsState = createPersistedState('allbastards-settings');

function App() {
  const [settings, setSettings] = useSettingsState<ISettings>(DEFAULT_SETTINGS);
  const [indices, setIndices] = useState<number[]>(range(HIGHEST_BASTARD_ID + 1));

  const [marginTop, setMarginTop] = useState<number>(0);
  const [marginBottom, setMarginBottom] = useState<number>(0);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>
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
