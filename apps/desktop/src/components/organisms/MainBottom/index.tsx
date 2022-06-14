import React, { useCallback } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

import * as Styled from './styled';

export default function MainBottom() {
  // const gltf = useLoader(GLTFLoader, '/character_witch.gltf');

  const stopAnimation = useCallback(e => {
    const target = e.target;
    const parent = target.closest('.main-circle');
    const spinDivs = parent.querySelectorAll('.main-circle > div');

    for (const spin of spinDivs) {
      const against = spin.firstChild;
      const pulse = against.firstChild;

      spin.classList.add('paused');
      against.classList.add('paused');
      pulse.classList.add('paused');
    }
  }, []);

  const restartAnimation = useCallback(e => {
    const target = e.target;
    const parent = target.closest('.main-circle');
    const spinDivs = parent.querySelectorAll('.main-circle > div');

    for (const spin of spinDivs) {
      const against = spin.firstChild;
      const pulse = against.firstChild;

      spin.classList.remove('paused');
      against.classList.remove('paused');
      pulse.classList.remove('paused');
    }
  }, []);

  return (
    <React.Fragment>
      <Styled.MainCircle className='main-circle'>
        {/*<Canvas>
          <OrbitControls />
          <pointLight position={[10, 10, 10]} />
          <primitive object={gltf.scene} /> 
        </Canvas>
        */}
        <Styled.SpinCircle style={{ '--i': 0 } as any} onMouseOver={stopAnimation} onMouseOut={restartAnimation}>
          <Styled.AgainstSpinCircle>
            <Styled.Pulse>포폴1</Styled.Pulse>
          </Styled.AgainstSpinCircle>
        </Styled.SpinCircle>
        <Styled.SpinCircle style={{ '--i': 1 } as any} onMouseOver={stopAnimation} onMouseOut={restartAnimation}>
          <Styled.AgainstSpinCircle>
            <Styled.Pulse>포폴2</Styled.Pulse>
          </Styled.AgainstSpinCircle>
        </Styled.SpinCircle>
        <Styled.SpinCircle style={{ '--i': 2 } as any} onMouseOver={stopAnimation} onMouseOut={restartAnimation}>
          <Styled.AgainstSpinCircle>
            <Styled.Pulse>포폴3</Styled.Pulse>
          </Styled.AgainstSpinCircle>
        </Styled.SpinCircle>
        {/* <Styled.SpinCircle style={{ '--i': 3 } as any} onMouseOver={stopAnimation} onMouseOut={restartAnimation}>
          <Styled.AgainstSpinCircle>
            <Styled.Pulse>포폴4</Styled.Pulse>
          </Styled.AgainstSpinCircle>
        </Styled.SpinCircle>
        <Styled.SpinCircle style={{ '--i': 4 } as any} onMouseOver={stopAnimation} onMouseOut={restartAnimation}>
          <Styled.AgainstSpinCircle>
            <Styled.Pulse>포폴5</Styled.Pulse>
          </Styled.AgainstSpinCircle>
        </Styled.SpinCircle>
        <Styled.SpinCircle style={{ '--i': 5 } as any} onMouseOver={stopAnimation} onMouseOut={restartAnimation}>
          <Styled.AgainstSpinCircle>
            <Styled.Pulse>포폴6</Styled.Pulse>
          </Styled.AgainstSpinCircle>
        </Styled.SpinCircle> */}
      </Styled.MainCircle>
    </React.Fragment>
  );
}
