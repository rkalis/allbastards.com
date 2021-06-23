import { useEffect } from 'react';
import { ISettings } from '../../utils/interfaces';
import Settings from './Settings';
import About from './About';
import HeaderBackground from '../p5/HeaderBackground';
import Shuffle from './Shuffle';
import Filters from './Filters';
import Sort from './Sort';

const useDimensions = require('react-use-dimensions').default;

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
  indices: number[];
  setIndices: (indices: number[]) => void;
  setMarginTop: (marginTop: number) => void;
}

function Header({ settings, setSettings, indices, setIndices, setMarginTop }: Props) {
  const [ref, { x, y, width, height }] = useDimensions();

  useEffect(() => setMarginTop(height), [height]);

  return (
    <>
      <header className={`flex flex-col fixed top-0 left-0 right-0 z-20 p-2 border-b-4 border-black ${settings.colourfulBackground || 'bg-white'}`} ref={ref}>
        <div className="bg-white absolute" />
        <div className="flex justify-center items-center font-charriot text-header">
          ALL BASTARDS
        </div>
        <div className="flex justify-center align-middle items-center gap-2">
          <About />
          <Settings settings={settings} setSettings={setSettings} />
          <Filters setIndices={setIndices} />
          <Sort indices={indices} setIndices={setIndices} />
          <Shuffle indices={indices} setIndices={setIndices} />
        </div>
      </header>
      {settings.colourfulBackground && <HeaderBackground x={x} y={y} width={width} height={height} />}
    </>
  );
}

export default Header;
