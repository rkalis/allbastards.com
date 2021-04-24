import { ISettings } from '../../utils/interfaces';
import Settings from './Settings';
import About from './About';
import HeaderBackground from '../p5/HeaderBackground';
import Shuffle from './Shuffle';
import Filters from './Filters';

const useDimensions = require('react-use-dimensions').default;

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
  indices: number[];
  setIndices: (indices: number[]) => void;
}

function Header({ settings, setSettings, indices, setIndices }: Props) {
  const [ref, { x, y, width, height }] = useDimensions();

  return (
    <>
      <header className={`grid grid-cols-5 sticky inset-0 z-20 p-2 border-b-4 border-black ${settings.colourfulBackground || 'bg-white'}`} ref={ref}>
        <div className="bg-white absolute" />
        <div className="flex justify-center align-middle items-center gap-2">
          <About />
          <Settings settings={settings} setSettings={setSettings} />
          <Filters setIndices={setIndices} />
          <Shuffle indices={indices} setIndices={setIndices} />
        </div>
        <div className="col-span-3 flex justify-center items-center font-charriot text-header">
          ALL BASTARDS
        </div>
        <div />
      </header>
      {settings.colourfulBackground && <HeaderBackground x={x} y={y} width={width} height={height} />}
    </>
  );
}

export default Header;
