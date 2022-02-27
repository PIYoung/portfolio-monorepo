import React, { useCallback, useEffect, useState } from 'react';

export default function ContextMenuContainer({ children }) {
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const drawContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    if (target instanceof HTMLDivElement) {
      if (target.dataset.removable) {
        switch (target.dataset.type) {
          case 'menu':
            break;

          default:
            break;
        }

        setTop(e.pageY);
        setLeft(e.pageX);
        setShowContextMenu(true);
      }
    }
  }, []);

  const removeContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      if (showContextMenu) setShowContextMenu(false);
    },
    [showContextMenu],
  );

  useEffect(() => {
    setShowContextMenu(false);
  }, []);

  return (
    <div className='relative' onClick={removeContextMenu} onContextMenu={drawContextMenu}>
      {children}
      {showContextMenu && (
        <div className='absolute rounded-md' style={{ top, left, backgroundColor: 'var(--color-primary)' }}>
          <div className='text-sm rounded-md hover:bg-slate-500 hover:text-gray-200 p-3'>Rename</div>
          <div className='text-sm rounded-md hover:bg-slate-500 hover:text-gray-200 p-3'>Delete</div>
        </div>
      )}
    </div>
  );
}
