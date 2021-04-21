import { CogIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ISettings } from '../utils/interfaces';
import BooleanSetting from './BooleanSetting';
import Modal from './Modal';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

function Settings({ settings, setSettings }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center align-middle items-center">
      <button type="button"
        className="inline-flex justify-center text-sm font-medium"
        onClick={() => setIsOpen(true)}>
        <CogIcon className="w-5 h-5 sm:w-10 sm:h-10" />
      </button>

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
