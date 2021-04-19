import { useState } from 'react';
import { range } from '../utils';
import { HIGHEST_BASTARD_ID } from '../utils/constants';
import InfiniteScroll from 'react-infinite-scroll-component';
import Bastard from './Bastard';
import { trackWindowScroll } from 'react-lazy-load-image-component';

interface Props {
  scrollPosition: { x: number, y: number };
  filteredIndices?: number[];
}

function Gallery({ scrollPosition, filteredIndices }: Props) {
  const galleryIndices = filteredIndices ?? range(HIGHEST_BASTARD_ID + 1);
  const initialLoad = 500;
  const loadCount = 100;

  const [indices, setIndices] = useState(galleryIndices.slice(0, initialLoad));

  const nextIndices = () => {
    setIndices(galleryIndices.slice(0, indices.length + loadCount));
  }

  return (
    <div className="container mx-auto px-8">
      <InfiniteScroll
        className="flex flex-row flex-wrap justify-center"
        dataLength={indices.length}
        next={nextIndices}
        hasMore={indices.length < HIGHEST_BASTARD_ID + 1}
        loader={<div className="content-center">Loading...</div>}
        scrollThreshold="300px"
      >
        {indices.map(index => (<Bastard index={index} scrollPosition={scrollPosition} />))}
      </InfiniteScroll>
    </div>
  );
}

export default trackWindowScroll(Gallery);
