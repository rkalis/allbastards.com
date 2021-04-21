import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { HIGHEST_BASTARD_ID } from '../utils/constants';
import Bastard from './Bastard';
import { ISettings } from '../utils/interfaces';

interface Props {
  scrollPosition: { x: number, y: number };
  filteredIndices: number[];
  settings: ISettings;
}

function Gallery({ scrollPosition, filteredIndices, settings }: Props) {
  const initialLoad = 500;
  const loadCount = 100;

  const [indices, setIndices] = useState(filteredIndices.slice(0, initialLoad));

  useEffect(() => {
    setIndices(filteredIndices.slice(0, initialLoad));
    console.log(filteredIndices);
  }, [filteredIndices]);

  const nextIndices = () => {
    setIndices(filteredIndices.slice(0, indices.length + loadCount));
  };

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
        {indices.map((index) => (<Bastard index={index} scrollPosition={scrollPosition} settings={settings} />))}
      </InfiniteScroll>
    </div>
  );
}

export default trackWindowScroll(Gallery);