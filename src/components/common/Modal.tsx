import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from './Button';

interface Props {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode | React.ReactNode[];
  additionalButtons?: React.ReactNode[];
}

// The UI code in this component has been taken from https://headlessui.dev/react/dialog and amended
function Modal({ title, isOpen, setIsOpen, children, additionalButtons }: Props) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-40 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={setIsOpen}
      >
        <div className="flex items-start justify-center min-h-screen px-4 text-center pt-40">
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
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-white border-2 border-black text-left overflow-visible shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
              <div className="bg-white p-6">
                <div className="text-left">
                  <Dialog.Title as="h3" className="text-3xl leading-6 pb-4 font-bold text-gray-900 text-center">
                    {title}
                  </Dialog.Title>
                  <div>{children}</div>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-4 flex gap-2">
                {additionalButtons}
                <Button onClick={() => setIsOpen(false)} label="CLOSE" className="w-full inline-flex justify-center" inverted />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
