import { CogIcon } from '@heroicons/react/outline';
import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface ISettings {
  colourfulBackground: boolean;
}

function Settings() {
  const defaultSettings = {
    colourfulBackground: true
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [settings, setSettings] = useState<ISettings>(defaultSettings);

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
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={setIsOpen}
        initialFocus={undefined}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 my-4 font-medium text-gray-900">
                      Settings
                    </Dialog.Title>
                    <div>
                    <div className="p-2 grid grid-cols-5 border-2">
                      <div className="col-span-4">Colourful background</div>
                      <div className="inline-flex justify-end">
                        <Switch
                            checked={settings.colourfulBackground ?? false}
                            onChange={(value: boolean) => setSettings({ ...settings, colourfulBackground: value })}
                          className={`${
                            settings.colourfulBackground ? "bg-blue-500" : "bg-gray-200"
                          } relative inline-flex items-center h-6 border-2 border-black w-11 focus:outline-none`}
                        >
                          <span
                            className={`${
                              settings.colourfulBackground ? "translate-x-6" : "translate-x-1"
                            } inline-block w-4 h-4 transform bg-white rounded-full border-black border-2`}
                          />
                        </Switch>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center border-2 border-black shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-red-500 focus:outline-none sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Close
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
