import React from 'react';
import { OPENSEA_BASE, IMAGE_BASE, PLACEHOLDER_IMAGE, IMAGE_SIZE_SMALL, IMAGE_SIZE_LARGE } from './utils/constants';
import './App.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useMouse from '@react-hook/mouse-position';
import { useWindowSize } from '@react-hook/window-size';

interface Props {
  index: number;
}

function Bastard({ index }: Props) {
  const target = React.useRef(null);
  const mouse = useMouse(target)

  const [windowWidth, windowHeight] = useWindowSize();

  const isPastHalfX = () => (mouse.clientX ?? 0) > windowWidth / 2;
  const isPastHalfY = () => (mouse.clientY ?? 0) > windowHeight / 2;

  const MOUSE_OFFSET = 10;

  const hoverX = isPastHalfX()
    ? (mouse.clientX ?? 0) - IMAGE_SIZE_LARGE - MOUSE_OFFSET
    : (mouse.clientX ?? 0) + MOUSE_OFFSET;

  const hoverY = isPastHalfY()
    ? (mouse.clientY ?? 0) - IMAGE_SIZE_LARGE - MOUSE_OFFSET
    : (mouse.clientY ?? 0) + MOUSE_OFFSET;

  return (
    <div key={index} className="px-1">
      <a href={`${OPENSEA_BASE}/${index}`} ref={target}>
        <LazyLoadImage
          width={`${IMAGE_SIZE_SMALL}px`}
          height={`${IMAGE_SIZE_SMALL}px`}
          src={`${IMAGE_BASE}/${index}.webp`}
          placeholderSrc={PLACEHOLDER_IMAGE}
          alt={`Bastard ${index}`}
        />
      </a>

      {mouse.isOver &&
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
