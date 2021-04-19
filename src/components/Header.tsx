import { ISettings } from '../utils/interfaces';
import Settings from './Settings';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

function Header({ settings, setSettings }: Props) {
  return (
    <header className="grid grid-cols-5 p-2">
      <div className="flex justify-center align-middle items-center">
        <Settings settings={settings} setSettings={setSettings} />
      </div>
      <div className="col-span-3 flex justify-center items-center font-charriot text-header">
        ALL BASTARDS
      </div>
      <div></div>
    </header>
  );
}

export default Header;
