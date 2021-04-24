import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import Bastard from './Bastard';
import { ISettings } from '../utils/interfaces';

interface Props {
  scrollPosition: { x: number, y: number };
  indices: number[];
  settings: ISettings;
  marginTop: number;
  marginBottom: number;
}

function Gallery({ scrollPosition, indices, settings, marginTop, marginBottom }: Props) {
  const initialLoad = 500;
  const loadCount = 100;

  const [loadedIndices, setLoadedIndices] = useState(indices.slice(0, initialLoad));

  useEffect(() => {
    setLoadedIndices(indices.slice(0, initialLoad));
    console.log(indices);
  }, [indices]);

  const nextIndices = () => {
    setLoadedIndices(indices.slice(0, loadedIndices.length + loadCount));
  };

  return (
    <div className="container mx-auto px-8" style={{ paddingTop: 6, marginTop, marginBottom }}>
      <InfiniteScroll
        className="flex flex-row flex-wrap justify-center"
        dataLength={loadedIndices.length}
        next={nextIndices}
        hasMore={loadedIndices.length < indices.length}
        loader={<div className="content-center">Loading...</div>}
        scrollThreshold="300px"
      >
        {loadedIndices.map((index) => (<Bastard index={index} scrollPosition={scrollPosition} settings={settings} />))}
      </InfiniteScroll>
    </div>
  );
}

export default trackWindowScroll(Gallery);
