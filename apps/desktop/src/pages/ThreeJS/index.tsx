import * as chapters from './chapters';

import React, { useEffect, useRef } from 'react';

import Stats from 'three/examples/jsm/libs/stats.module';
import { useSearchParams } from 'react-router-dom';

const ThreeJS = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rendererRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stats = initStats();
    const chapter = searchParams.get('chapter') || 'chapter1_1';
    const div = rendererRef.current;

    try {
      chapters[chapter] ? chapters[chapter](div, stats) : chapters['chapter1_1'](div, stats);
    } catch (err) {
      console.log(err);
      chapters['chapter1_1'](div, stats);
    }

    function initStats() {
      const stats: Stats = new (Stats as any)();
      stats.setMode(0);
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';
      statsRef.current.appendChild(stats.domElement);
      return stats;
    }
  }, [searchParams]);

  return (
    <React.Fragment>
      <div ref={rendererRef}></div>;<div ref={statsRef}></div>;
    </React.Fragment>
  );
};

export default ThreeJS;
