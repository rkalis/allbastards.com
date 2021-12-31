import { NavLink } from 'react-router-dom';
import { ISettings } from '../../utils/interfaces';
import Settings from './Settings';
import About from './About';
import HeaderBackground from '../p5/HeaderBackground';
import Shuffle from './Shuffle';
import Filters from './Filters';
import Sort from './Sort';
import Wallet from './Wallet';
import DonateButton from './DonateButton';

const useDimensions = require('react-use-dimensions').default;

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
  indices?: number[];
  setIndices?: (indices: number[]) => void;
}

function Header({ settings, setSettings, indices, setIndices }: Props) {
  const [ref, { x, y, width, height }] = useDimensions();

  return (
    <>
      <header className={`sticky flex flex-col fixed top-0 left-0 right-0 z-20 py-2 px-4 border-b-4 border-black ${settings.colourfulBackground || 'bg-white'}`} ref={ref}>
        <div className="bg-white absolute" />
        <div className="grid grid-cols-5">
          <div className="flex justify-start items-center gap-2">
            <div className="block md:hidden"><DonateButton /></div>
          </div>
          <div className="flex justify-center items-center text-header col-span-3">
            <NavLink to={{ pathname: '/', search: window.location.search }}>ALL BASTARDS</NavLink>
          </div>
          <div className="flex justify-end items-center gap-2">
            <div className="hidden md:block"><DonateButton /></div>
            <Wallet />
          </div>
        </div>
        <div className="flex justify-center align-middle items-center gap-2">
          <About />
          <Settings settings={settings} setSettings={setSettings} />
          {indices && setIndices && <Filters settings={settings} indices={indices} setIndices={setIndices} />}
          {indices && setIndices && <Sort indices={indices} setIndices={setIndices} />}
          {indices && setIndices && <Shuffle indices={indices} setIndices={setIndices} />}
        </div>
      </header>
      {settings.colourfulBackground && <HeaderBackground x={x} y={y} width={width} height={height} />}
    </>
  );
}

export default Header;
