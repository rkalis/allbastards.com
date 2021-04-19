import React from 'react';
import { OPENSEA_BASE, IMAGE_BASE, PLACEHOLDER_IMAGE, IMAGE_SIZE_SMALL, IMAGE_SIZE_LARGE } from '../utils/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useMouse from '@react-hook/mouse-position';
import { useWindowSize } from '@react-hook/window-size';
import useHover from '@react-hook/hover';

interface Props {
  index: number;
  scrollPosition: { x: number, y: number };
}

function Bastard({ index, scrollPosition }: Props) {
  const target = React.useRef(null);
  const mouse = useMouse(target);
  const isHovering = useHover(target);

  const [windowWidth, windowHeight] = useWindowSize();

  const MOUSE_OFFSET = 10;

  const mouseX = mouse.clientX ?? 0;
  const mouseY = mouse.clientY ?? 0;

  const isPastHalfX = mouseX > windowWidth / 2;
  const isPastHalfY = mouseY > windowHeight / 2;

  const hoverX = isPastHalfX ? mouseX - IMAGE_SIZE_LARGE - MOUSE_OFFSET : mouseX + MOUSE_OFFSET;
  const hoverY = isPastHalfY ? mouseY - IMAGE_SIZE_LARGE - MOUSE_OFFSET : mouseY + MOUSE_OFFSET;

  return (
    <div key={index} className="px-1">
      <a href={`${OPENSEA_BASE}/${index}`} ref={target}>
        <LazyLoadImage
          width={`${IMAGE_SIZE_SMALL}px`}
          height={`${IMAGE_SIZE_SMALL}px`}
          src={`${IMAGE_BASE}/${index}.webp`}
          placeholderSrc={PLACEHOLDER_IMAGE}
          alt={`Bastard ${index}`}
          title={`Bastard ${index}`}
          scrollPosition={scrollPosition}
        />
      </a>

      {isHovering &&
        <img
          width={`${IMAGE_SIZE_LARGE}px`}
          height={`${IMAGE_SIZE_LARGE}px`}
          src={`${IMAGE_BASE}/${index}.webp`}
          className="fixed"
          alt={`Bastard ${index}`}
          style={{ left: hoverX, top: hoverY }}
        />
      }
    </div>
  );
}

export default Bastard;
