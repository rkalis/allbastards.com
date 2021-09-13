import { useState } from 'react';
import Modal from '../common/Modal';
import Link from '../common/Link';
import IconButton from '../common/IconButton';

function About() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName="HelpCircle" onClick={() => setIsOpen(true)} />

      <Modal title="ABOUT" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="text-lg">
          GLICPIX are a collection of NFTs created by <Link to="http://berkozdemir.com/" text="BERK ÖZDEMIR" />.
          The artwork for GLICPIX was created by cutting 32x32 tiles from images generated with the encoding tool GLIC.
          ALLGLICPIX.COM displays the entire GLICPIX collection.
          Learn more about GLICPIX at <Link to="https://glicpixxx.love/" text="GLICPIXXX.LOVE" inverted />.
        </div>
      </Modal>
    </div>
  );
}

export default About;
