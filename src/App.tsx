import createPersistedState from 'use-persisted-state';
import Gallery from './components/Gallery';
import Header from './components/header/Header';
import Footer from './components/Footer';
import Background from './components/p5/Background';
import { range } from './utils';
import { DEFAULT_SETTINGS, HIGHEST_BASTARD_ID } from './utils/constants';
import { ISettings } from './utils/interfaces';

const useSettingsState = createPersistedState('allbastards-settings');

function App() {
  const [settings, setSettings] = useSettingsState<ISettings>(DEFAULT_SETTINGS);

  const filteredIndices = range(HIGHEST_BASTARD_ID + 1);

  return (
    <div>
      <Header settings={settings} setSettings={setSettings} />
      <Gallery settings={settings} filteredIndices={filteredIndices} />
      <Footer settings={settings} />
      {settings.colourfulBackground && <Background />}
    </div>
  );
}

export default App;
