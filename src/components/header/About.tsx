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
          PyxelGlyphs are a collection of avatar NFTs that are generated completely on-chain
          using a cellular automaton. ALLGLYPHS.COM displays the entire collection of PixelGlyphs.
          Learn more about PixelGlyphs at <Link to="https://pixelglyphs.io/" text="pixelglyphs.io" />.
        </div>
      </Modal>
    </div>
  );
}

export default About;
