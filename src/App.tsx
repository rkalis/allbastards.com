import { Web3ReactProvider } from '@web3-react/core';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import createPersistedState from 'use-persisted-state';
import { ToastContainer } from 'react-toastify';
import { displayGitcoinToast } from './components/common/gitcoin-toast';
import { DEFAULT_SETTINGS } from './utils/constants';
import { ISettings } from './utils/interfaces';
import { getLibrary } from './utils/web3';
import MarketplaceOptin from './components/header/MarketplaceOptIn';
import GalleryPage from './pages/GalleryPage';
import DetailsPage from './pages/DetailsPage';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const useSettingsState = createPersistedState('allbastards-settings');

function App() {
  const [settings, setSettings] = useSettingsState<ISettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    displayGitcoinToast();
  }, []);

  useEffect(() => {
    // Ensure that new settings are added alongside the old ones if settings are already saved
    const combinedSettings = { ...DEFAULT_SETTINGS, ...settings };
    if (JSON.stringify(combinedSettings) !== JSON.stringify(settings)) {
      setSettings(combinedSettings);
    }
  }, [settings]);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
      <MarketplaceOptin settings={settings} setSettings={setSettings} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GalleryPage settings={settings} setSettings={setSettings} />
            }
          />
          <Route
            path="/details/:bastardId"
            element={
              <DetailsPage settings={settings} setSettings={setSettings} />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;
