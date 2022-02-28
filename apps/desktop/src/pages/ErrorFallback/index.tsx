import React, { useCallback } from 'react';

import { BsHouseDoor } from 'react-icons/bs';
import { PATHS } from '../../constants';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: Props) {
  const goHome = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = PATHS.MAIN;
  }, []);

  return (
    <div
      className='flex justify-center items-center text-center w-full'
      style={{ height: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <div>
        <h1 className='text-8xl mb-16'>Error Page</h1>
        <p className='text-lg'>에러가 발생했습니다.</p>
        <p className='text-lg'>잠시 후 다시 시도해주세요.</p>
        <div className='mt-16 cursor-pointer' onClick={goHome}>
          <div className='flex justify-center items-center p-2 text-lg border rounded'>
            <div className='mr-2'>
              <BsHouseDoor size={20} />
            </div>
            <div>돌아가기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
