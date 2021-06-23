import { useState } from 'react';
import { ISettings } from '../../utils/interfaces';
import BooleanSetting from '../common/BooleanSetting';
import Modal from '../common/Modal';
import IconButton from '../common/IconButton';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

function Settings({ settings, setSettings }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName="Settings" onClick={() => setIsOpen(true)} />

      <Modal title="SETTINGS" isOpen={isOpen} setIsOpen={setIsOpen}>
        <BooleanSetting
          label="COLOURFUL BACKGROUND"
          value={settings.colourfulBackground}
          update={(value: boolean) => setSettings({ ...settings, colourfulBackground: value })}
        />
        <BooleanSetting
          label="ALWAYS SHOW NUMBERS"
          value={settings.displayNumbers}
          update={(value: boolean) => setSettings({ ...settings, displayNumbers: value })}
        />
      </Modal>
    </div>
  );
}

export default Settings;
