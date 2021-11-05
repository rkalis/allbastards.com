import { useState } from 'react';
import Gallery from '../components/gallery/Gallery';
import Header from '../components/header/Header';
import Footer from '../components/Footer';
import Background from '../components/p5/Background';
import { range } from '../utils';
import { HIGHEST_BASTARD_ID } from '../utils/constants';
import { ISettings } from '../utils/interfaces';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
  marginTop: number;
  setMarginTop: (marginTop: number) => void;
  marginBottom: number;
  setMarginBottom: (marginBottom: number) => void;
}

function GalleryPage({ settings, setSettings, marginTop, marginBottom, setMarginTop, setMarginBottom }: Props) {
  const [indices, setIndices] = useState<number[]>(range(HIGHEST_BASTARD_ID + 1));

  return (
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
  );
}

export default GalleryPage;
