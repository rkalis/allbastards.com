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
          BASTARD GAN PUNKS are a collection of NFTs created by <Link to="http://berkozdemir.com/" text="BERK ÖZDEMIR" />.
          The artwork for BASTARD GAN PUNKS was created by applying a GAN on <Link to="https://larvalabs.com/cryptopunks" text="CRYPTOPUNKS" inverted />.
          ALLBASTARDS.COM displays the entire bastard collection.
          Learn more about BASTARD GAN PUNKS at <Link to="https://bastardganpunks.club/" text="BASTARDGANPUNKS.CLUB" />.
          <br /><br />
          ALLBASTARDS.COM was created by <Link to="https://kalis.me" text="ROSCO KALIS" /> and the website&lsquo;s source code
          can be found on <Link to="https://github.com/rkalis/allbastards.com" text="GITHUB" />.
        </div>
      </Modal>
    </div>
  );
}

export default About;
