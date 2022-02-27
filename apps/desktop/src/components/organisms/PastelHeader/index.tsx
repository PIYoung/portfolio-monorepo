import * as Styled from './styled';

import {
  BsArrowRepeat,
  BsChevronLeft,
  BsFillLightbulbFill,
  BsFillLightbulbOffFill,
  BsHouseDoor,
  BsPlus,
  BsSearch,
} from 'react-icons/bs';
import { Hints, Steps } from 'intro.js-react';
import React, { useCallback } from 'react';
import { addNewColor, addNewPaletts, addPalettsNewColor, setSelectedMenu } from '../../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import { PATHS } from '../../../constants';
import { RootState } from '../../../reducers';
import { setUserConfigurations } from '../../../reducers/user.reducer';
import { useInput } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

export default React.memo(function PastelHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { configurations } = useSelector((state: RootState) => state.user);
  const { paletts, currentViewedPaletts, menus, selectedHex, selectedMenu } = useSelector(
    (state: RootState) => state.pastel,
  );
  const [search, changeSearch, setSearch] = useInput<string>('');

  const goBack = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      if (selectedMenu.isDetail) {
        navigate(-1);
      }
    },
    [selectedMenu, navigate],
  );

  const resetLocalStorage = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    localStorage.clear();
    window.location.reload();
  }, []);

  const addPaletteOrColor = useCallback(() => {
    if (selectedMenu.isDetail && currentViewedPaletts) {
      dispatch(
        addPalettsNewColor({
          index: currentViewedPaletts - 1,
          color: {
            hex: selectedHex,
            removable: true,
          },
        }),
      );
    } else if (selectedMenu.uid === 3) {
      dispatch(
        addNewColor({
          title: 'Untitled Color',
          hex: selectedHex,
          removable: true,
        }),
      );
    } else {
      dispatch(
        addNewPaletts({
          id: paletts[paletts.length - 1].id + 1,
          uid: selectedMenu.uid === 2 ? 1 : selectedMenu.uid,
          title: 'Untitled Palette',
          colors: [{ hex: selectedHex, removable: true }],
          removable: true,
        }),
      );
    }
  }, [dispatch, paletts, currentViewedPaletts, selectedHex, selectedMenu]);

  const searchPaletts = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ('key' in e) {
        if (e.key === 'Enter') {
          dispatch(
            setSelectedMenu({
              uid: -1,
              title: search,
              iconKey: -1,
              removable: false,
            }),
          );
        }
      } else {
        e.preventDefault();
        e.stopPropagation();

        dispatch(
          setSelectedMenu({
            uid: -1,
            title: search,
            iconKey: -1,
            removable: false,
          }),
        );
      }
    },
    [search, dispatch],
  );

  const endSearch = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      dispatch(setSelectedMenu(menus[0].children[0]));
      setSearch('');
    },
    [dispatch, menus, setSearch],
  );

  const changeColorTheme = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const theme = configurations.theme === 'light' ? 'dark' : 'light';
      dispatch(setUserConfigurations(theme));
    },
    [dispatch, configurations],
  );

  const goHome = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      navigate(PATHS.MAIN);
    },
    [navigate],
  );

  return (
    <Styled.Container className='p-4 flex items-center justify-between'>
      <div className='flex items-center'>
        <div onClick={goBack} style={{ color: 'var(--color-pastel-text-secondary)' }} className='cursor-pointer mr-2'>
          <BsChevronLeft />
        </div>
        <div style={{ color: 'var(--color-pastel-text)' }}>{selectedMenu.title}</div>
        {selectedMenu.uid === -1 && (
          <div
            onClick={endSearch}
            className='ml-4 text-sm cursor-pointer border rounded-md p-1'
            style={{ color: 'var(--color-pastel-text)' }}>
            검색 종료
          </div>
        )}
      </div>
      <div style={{ color: 'var(--color-pastel-text)' }} className='flex items-center'>
        <div className='mr-2 cursor-pointer hover:bg-slate-500 hover:rounded-md' onClick={goHome}>
          <BsHouseDoor size={20} />
        </div>
        <div className='mr-2 cursor-pointer hover:bg-slate-500 hover:rounded-md' onClick={changeColorTheme}>
          {configurations.theme === 'light' ? <BsFillLightbulbFill size={20} /> : <BsFillLightbulbOffFill size={20} />}
        </div>
        <div className='mr-2 cursor-pointer hover:bg-slate-500 hover:rounded-md' onClick={resetLocalStorage}>
          <BsArrowRepeat size={20} />
        </div>
        <div className='mr-2 cursor-pointer hover:bg-slate-500 hover:rounded-md' onClick={addPaletteOrColor}>
          <BsPlus size={20} />
        </div>
        <div className='flex items-center p-1 w-48 border rounded-md'>
          <div className='mr-1 ml-1 cursor-pointer' onClick={searchPaletts}>
            <BsSearch size={12} />
          </div>
          <div>
            <input
              value={search}
              onChange={changeSearch}
              onKeyDown={searchPaletts}
              className='bg-transparent focus:outline-none w-full placeholder:text-sm'
              placeholder='Search'
            />
          </div>
        </div>
      </div>
    </Styled.Container>
  );
});
