import { useEffect } from 'react';
import { ISettings } from '../utils/interfaces';
import FooterBackground from './p5/FooterBackground';
import Link from './common/Link';

const useDimensions = require('react-use-dimensions').default;

interface Props {
  settings: ISettings;
  setMarginBottom: (marginBottom: number) => void;
}

function Footer({ settings, setMarginBottom }: Props) {
  const [ref, { x, y, width, height }] = useDimensions();

  useEffect(() => setMarginBottom(height), [height]);

  return (
    <>
      <footer className={`fixed left-0 right-0 bottom-0 z-20 p-2 border-t-4 border-black ${settings.colourfulBackground || 'bg-white'}`} ref={ref}>
        <div className="text-footer md:text-footer-md lg:text-footer-lg">
          <div className="grid grid-cols-1">
            <div className="flex justify-center items-center">
              <div>
                WEBSITE CREATED BY <Link to="https://kalis.me" text="ROSCO KALIS" /> (<Link to="https://github.com/rkalis/allbastards.com" text="SOURCE CODE" inverted />)
              </div>
            </div>
          </div>
        </div>
      </footer>
      {settings.colourfulBackground && <FooterBackground x={x} y={y} width={width} height={height} />}
    </>
  );
}

export default Footer;
