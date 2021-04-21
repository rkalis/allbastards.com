import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useMouse from '@react-hook/mouse-position';
import { useWindowSize } from '@react-hook/window-size';
import useHover from '@react-hook/hover';
import { OPENSEA_BASE, IMAGE_BASE, PLACEHOLDER_IMAGE, IMAGE_SIZE_SMALL, IMAGE_SIZE_LARGE } from '../utils/constants';
import { ISettings } from '../utils/interfaces';

interface Props {
  index: number;
  scrollPosition: { x: number, y: number };
  settings: ISettings;
}

function Bastard({ index, scrollPosition, settings }: Props) {
  const target = React.useRef(null);
  const mouse = useMouse(target);
  const isHovering = useHover(target);
  const [secondaryIsHovering, setSecondaryIsHovering] = useState<boolean>(false);

  const [windowWidth, windowHeight] = useWindowSize();

  const MOUSE_OFFSET = 10;

  const mouseX = mouse.clientX ?? 0;
  const mouseY = mouse.clientY ?? 0;

  const isPastHalfX = mouseX > windowWidth / 2;
  const isPastHalfY = mouseY > windowHeight / 2;

  const hoverX = isPastHalfX ? mouseX - IMAGE_SIZE_LARGE - MOUSE_OFFSET : mouseX + MOUSE_OFFSET;
  const hoverY = isPastHalfY ? mouseY - IMAGE_SIZE_LARGE - MOUSE_OFFSET : mouseY + MOUSE_OFFSET;

  // Check the mouse hovering in 4 different ways to (hopefully) eliminate false positives
  const shouldDisplayHoverImage = mouse.isOver && mouse.clientX && mouse.clientY && isHovering && secondaryIsHovering;

  return (
    <div key={index} className="px-1 relative">
      <a href={`${OPENSEA_BASE}/${index}`} ref={target}>
        <LazyLoadImage
          width={`${IMAGE_SIZE_SMALL}px`}
          height={`${IMAGE_SIZE_SMALL}px`}
          src={`${IMAGE_BASE}/${index}.webp`}
          placeholderSrc={PLACEHOLDER_IMAGE}
          alt={`Bastard ${index}`}
          scrollPosition={scrollPosition}
          className="absolute inset-0 z-0"
          onMouseEnter={() => setSecondaryIsHovering(true)}
          onMouseLeave={() => setSecondaryIsHovering(false)}
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
        shouldDisplayHoverImage &&
        <div>
          <img
            width={`${IMAGE_SIZE_LARGE}px`}
            height={`${IMAGE_SIZE_LARGE}px`}
            src={`${IMAGE_BASE}/${index}.webp`}
            className="fixed z-30"
            alt={`Bastard ${index}`}
            style={{ left: hoverX, top: hoverY }}
          />

          <div
            className="fixed z-30 mx-2 text-6xl text-white font-charriot"
            style={{ WebkitTextStroke: '2px black', left: hoverX, top: hoverY }}
          >
            {index}
          </div>
        </div>
      }
    </div>
  );
}

export default Bastard;
