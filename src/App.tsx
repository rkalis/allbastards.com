import './App.css';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Background from './components/Background';
import { range } from './utils';
import { DEFAULT_SETTINGS, HIGHEST_BASTARD_ID } from './utils/constants';
import { ISettings } from './utils/interfaces';
import createPersistedState from 'use-persisted-state';

const useSettingsState = createPersistedState('allbastards-settings');

function App() {
  const [settings, setSettings] = useSettingsState<ISettings>(DEFAULT_SETTINGS);

  const filteredIndices = range(HIGHEST_BASTARD_ID + 1);

  return (
    <div>
      <Header settings={settings} setSettings={setSettings} />
      <Gallery settings={settings} filteredIndices={filteredIndices} />
      {settings.colourfulBackground && <Background />}
    </div>
  );
}

export default App;
