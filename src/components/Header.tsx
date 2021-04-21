import { ISettings } from '../utils/interfaces';
import Settings from './Settings';
import HeaderBackground from './p5/HeaderBackground';

const useDimensions = require('react-use-dimensions').default;

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

function Header({ settings, setSettings }: Props) {
  const [ref, { x, y, width, height }] = useDimensions()

  return (
    <>
      <header className={`grid grid-cols-5 sticky inset-0 z-20 p-2 ${settings.colourfulBackground || 'bg-white'}`} ref={ref}>
        <div className="bg-white absolute"></div>
        <div className="flex justify-center align-middle items-center">
          <Settings settings={settings} setSettings={setSettings} />
        </div>
        <div className="col-span-3 flex justify-center items-center font-charriot text-header">
          ALL BASTARDS
        </div>
        <div></div>
      </header>
      {settings.colourfulBackground && <HeaderBackground x={x} y={y} width={width} height={height} />}
    </>
  );
}

export default Header;
