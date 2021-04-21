import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useWindowSize } from '@react-hook/window-size';
import { OPENSEA_BASE, IMAGE_BASE, PLACEHOLDER_IMAGE, IMAGE_SIZE_SMALL, IMAGE_SIZE_LARGE } from '../utils/constants';
import { ISettings } from '../utils/interfaces';

interface Props {
  index: number;
  scrollPosition: { x: number, y: number };
  settings: ISettings;
}

interface MousePosition {
  x?: number;
  y?: number;
}

function Bastard({ index, scrollPosition, settings }: Props) {
  const [mouse, setMouse] = useState<MousePosition>({});
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [windowWidth, windowHeight] = useWindowSize();

  const mouseX = mouse.x ?? 0;
  const mouseY = mouse.y ?? 0;

  const isPastHalfX = mouseX > windowWidth / 2;
  const isPastHalfY = mouseY > windowHeight / 2;

  const MOUSE_OFFSET = 10;
  const hoverImageX = isPastHalfX ? mouseX - IMAGE_SIZE_LARGE - MOUSE_OFFSET : mouseX + MOUSE_OFFSET;
  const hoverImageY = isPastHalfY ? mouseY - IMAGE_SIZE_LARGE - MOUSE_OFFSET : mouseY + MOUSE_OFFSET;

  // Track mouse position and hovering status

  const onMouseEnter = (event: React.MouseEvent) => {
    setMouse({ x: event.clientX, y: event.clientY });
    setIsHovering(true);
  };

  const onMouseLeave = (event: React.MouseEvent) => {
    setMouse({ x: event.clientX, y: event.clientY });
    setIsHovering(false);
  };

  const onMouseMove = (event: React.MouseEvent) => setMouse({ x: event.clientX, y: event.clientY });

  return (
    <div key={index} className="px-1 relative">
      <a href={`${OPENSEA_BASE}/${index}`}>
        <LazyLoadImage
          width={`${IMAGE_SIZE_SMALL}px`}
          height={`${IMAGE_SIZE_SMALL}px`}
          src={`${IMAGE_BASE}/${index}.webp`}
          placeholderSrc={PLACEHOLDER_IMAGE}
          alt={`Bastard ${index}`}
          scrollPosition={scrollPosition}
          className="absolute inset-0 z-0"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
        />

        {
          settings.displayNumbers &&
          <div
            className="absolute inset-0 z-1 mx-1 text-2xl text-white font-charriot"
            style={{ WebkitTextStroke: '1px black' }}
          >
            {index}
          </div>
        }
      </a>

      {
        isHovering &&
        <div>
          <img
            width={`${IMAGE_SIZE_LARGE}px`}
            height={`${IMAGE_SIZE_LARGE}px`}
            src={`${IMAGE_BASE}/${index}.webp`}
            className="fixed z-30"
            alt={`Bastard ${index}`}
            style={{ left: hoverImageX, top: hoverImageY }}
          />

          <div
            className="fixed z-30 mx-2 text-6xl text-white font-charriot"
            style={{ WebkitTextStroke: '2px black', left: hoverImageX, top: hoverImageY }}
          >
            {index}
          </div>
        </div>
      }
    </div>
  );
}

export default Bastard;
