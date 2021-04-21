import { ISettings } from '../utils/interfaces';
import FooterBackground from './p5/FooterBackground';

const useDimensions = require('react-use-dimensions').default;

interface Props {
  settings: ISettings;
}

function Footer({ settings }: Props) {
  const [ref, { x, y, width, height }] = useDimensions()

  return (
    <>
      <header className={`sticky inset-0 z-20 p-2 ${settings.colourfulBackground || 'bg-white'}`} ref={ref}>
        <div className="font-charriot text-footer md:text-footer-md lg:text-footer-lg">
          <div className="grid grid-cols-1">
            <div className="flex justify-center items-center">
              <div>WEBSITE CREATED BY <a className="text-blue-500" href="https://kalis.me">ROSCO KALIS</a> (<a className="text-red-500" href="https://github.com/rkalis/allbastards.com">SOURCE CODE</a>)</div>
            </div>
          </div>
        </div>
      </header>
      {settings.colourfulBackground && <FooterBackground x={x} y={y} width={width} height={height} />}
    </>
  );
}

export default Footer;
