import { CogIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ISettings } from '../utils/interfaces';
import BooleanSetting from './BooleanSetting';

interface Props {
  settings: ISettings;
  setSettings: (settings: ISettings) => void;
}

// The UI code in this component has been taken from https://headlessui.dev/react/dialog and amended

function Settings({ settings, setSettings }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center align-middle items-center">
      <button type="button"
        className="inline-flex justify-center text-sm font-medium"
        onClick={() => setIsOpen(true)}>
        <CogIcon className="w-5 h-5 sm:w-10 sm:h-10" />
      </button>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-50 inset-0 overflow-y-auto"
          open={isOpen}
          onClose={setIsOpen}
          initialFocus={undefined}
        >
          <div className="flex items-end justify-center min-h-screen px-4 text-center sm:block">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white border-2 border-black text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white p-6">
                  <div className="text-left">
                    <Dialog.Title as="h3" className="text-3xl leading-6 my-2 font-bold font-charriot text-gray-900 text-center">
                      SETTINGS
                    </Dialog.Title>
                    <div>
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
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-4 flex flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center border-2 border-black shadow-sm px-4 py-2 bg-blue-500 text-sm text-white font-charriot font-bold hover:bg-red-500 focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Settings;
