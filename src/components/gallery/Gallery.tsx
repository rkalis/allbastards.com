import { useEffect, useState } from 'react';
import { forceCheck } from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroll-component';
import Bastard from './Bastard';
import { ISettings } from '../../utils/interfaces';

interface Props {
  indices: number[];
  settings: ISettings;
  marginTop: number;
  marginBottom: number;
}

function Gallery({ indices, settings, marginTop, marginBottom }: Props) {
  const initialLoad = 500;
  const loadCount = 250;

  const [loadedIndices, setLoadedIndices] = useState(indices.slice(0, initialLoad));

  useEffect(() => {
    setLoadedIndices(indices.slice(0, initialLoad));
    console.log(indices);
  }, [indices]);

  useEffect(() => {
    forceCheck();
  }, [loadedIndices]);

  const nextIndices = () => {
    setLoadedIndices(indices.slice(0, loadedIndices.length + loadCount));
  };

  return (
    <div className="container mx-auto px-4 sm:px-8" style={{ paddingTop: 6, paddingBottom: 6, marginTop, marginBottom }}>
      <InfiniteScroll
        className="flex flex-row flex-wrap justify-center gap-1.5"
        dataLength={loadedIndices.length}
        next={nextIndices}
        hasMore={loadedIndices.length < indices.length}
        loader={<div className="content-center">Loading...</div>}
        scrollThreshold="500px"
      >
        {loadedIndices.map((index) => (<Bastard key={index} index={index} settings={settings} />))}
      </InfiniteScroll>
    </div>
  );
}

export default Gallery;
