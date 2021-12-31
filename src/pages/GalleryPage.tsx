import { useState } from 'react';
import Gallery from '../components/gallery/Gallery';
import Header from '../components/header/Header';
import Background from '../components/p5/Background';
import { range } from '../utils';
import { HIGHEST_BASTARD_ID } from '../utils/constants';
import { ISettings } from '../utils/interfaces';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

function GalleryPage({ settings, setSettings }: Props) {
  const [indices, setIndices] = useState<number[]>(range(HIGHEST_BASTARD_ID + 1));

  return (
    <div>
      <Header
        settings={settings}
        setSettings={setSettings}
        indices={indices}
        setIndices={setIndices}
      />
      <Gallery settings={settings} indices={indices} />
      {settings.colourfulBackground && <Background />}
    </div>
  );
}

export default GalleryPage;
