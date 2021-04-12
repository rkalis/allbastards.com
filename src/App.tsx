import { useState } from 'react';
import { range } from './utils';
import { HIGHEST_BASTARD_ID, OPENSEA_BASE, IMAGE_BASE } from './utils/constants';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const loadCount = 100;

  const [indices, setIndices] = useState(range(loadCount));

  const nextIndices = () => {
    setIndices(range(indices.length + loadCount).slice(0, HIGHEST_BASTARD_ID + 1));
  }

  return (
    <div className="container mx-auto">
      <header className="flex justify-center w-full bg-white font-charriot text-8xl p-2">ALL BASTARDS</header>
      <InfiniteScroll
        className="grid grid-cols-10 gap-4 wx-auto px-10"
        dataLength={indices.length}
        next={nextIndices}
        hasMore={indices.length < HIGHEST_BASTARD_ID + 1}
        loader={<div className="content-center">Loading...</div>}
      >
        {
          indices.map(index => (
            <div key={index}>
              <a href={`${OPENSEA_BASE}/${index}`}>
                <img alt={`Bastard ${index}`} className="bastard-image" src={`${IMAGE_BASE}/${index}.png`}></img>
              </a>
            </div>
          ))
        }
      </InfiniteScroll>
    </div>
  );
}

export default App;
