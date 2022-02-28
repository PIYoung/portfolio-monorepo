import * as Styled from './styled';

import React, { useCallback, useLayoutEffect } from 'react';
import { setCurrentViewedPalettes, setSelectedMenu } from '../../reducers/pastel.reducer';
import { useDispatch, useSelector } from 'react-redux';

import ContextMenuContainer from '../../components/templates/ContextMenuContainer';
import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMain from '../../components/organisms/PastelMain';
import PastelMainAside from '../../components/organisms/PastelMainAside';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import { RootState } from '../../reducers';
import { Steps } from 'intro.js-react';
import { restartIntro } from '../../reducers/user.reducer';

export default function Pastel() {
  const dispatch = useDispatch();
  const { configurations } = useSelector((state: RootState) => state.user);
  const { menus, selectedMenu } = useSelector((state: RootState) => state.pastel);

  const handleExit = useCallback(() => {
    dispatch(restartIntro(false));
  }, [dispatch]);

  useLayoutEffect(() => {
    if (selectedMenu.isDetail) {
      let hasDone = false;
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        for (let j = 0; j < menu.children.length; j++) {
          const child = menu.children[j];

          if (child.uid === selectedMenu.uid) {
            dispatch(setSelectedMenu(child));
            dispatch(setCurrentViewedPalettes(null));
            hasDone = true;

            break;
          }
        }

        if (hasDone) break;
      }
    }
  }, [dispatch, menus, selectedMenu]);

  return (
    <React.Fragment>
      <ContextMenuContainer>
        <Styled.FlexContainer>
          <PastelNavigation />
          <Styled.Container>
            <PastelHeader />
            <Styled.FlexContainer style={{ height: 'calc(100vh - 60px)' }}>
              <PastelMain />
              <PastelMainAside />
            </Styled.FlexContainer>
          </Styled.Container>
        </Styled.FlexContainer>
      </ContextMenuContainer>
      <Steps
        enabled={configurations.showIntro}
        steps={[
          {
            element: '.piystel-1',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  <b>piystel</b>에 오신 걸 환영합니다.
                </p>
                <br />
                <p>
                  저는 <b>piystel</b>을 좀 더 쉽게 사용할 수 있게 도와주는 <b>piystel</b> Helper입니다.
                </p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-1',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  <b>piystel</b>은 내가 즐겨쓰는 색상을 쉽게 관리하게 해주는 작업도구입니다.
                </p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-1',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  지금부터, <b>piystel</b>에 대해서 말씀드리겠습니다.
                </p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-1',
            intro: (
              <div style={{ width: '260px' }}>
                <p>먼저, Header 영역부터 알아보겠습니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-2',
            intro: (
              <div style={{ width: '260px' }}>
                <p>현재 조회 중인 메뉴를 표시합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-3',
            intro: (
              <div style={{ width: '260px' }}>
                <p>인트로를 다시 재생합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-4',
            intro: (
              <div style={{ width: '260px' }}>
                <p>처음 페이지로 돌아갑니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-5',
            intro: (
              <div style={{ width: '260px' }}>
                <p>다크모드를 켜고 끌 수 있습니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-6',
            intro: (
              <div style={{ width: '260px' }}>
                <p>지금까지 수행한 모든 것들을 초기화합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-7',
            intro: (
              <div style={{ width: '260px' }}>
                <p>새로운 파레트 혹은 색상을 추가합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-8',
            intro: (
              <div style={{ width: '260px' }}>
                <p>등록된 파레트를 검색합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-9',
            intro: (
              <div style={{ width: '260px' }}>
                <p>Navigation 영역입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-all-paletts',
            intro: (
              <div style={{ width: '260px' }}>
                <p>모든 파레트 목록입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-recents',
            intro: (
              <div style={{ width: '260px' }}>
                <p>최근 조회한 파레트 목록입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-colors',
            intro: (
              <div style={{ width: '260px' }}>
                <p>예제 색상을 조회합니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-themes',
            intro: (
              <div style={{ width: '260px' }}>
                <p>예제 파레트(Themes)입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-reference',
            intro: (
              <div style={{ width: '260px' }}>
                <p>예제 파레트(Reference)입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-10',
            intro: (
              <div style={{ width: '260px' }}>
                <p>새로운 컬렉션을 등록합니다.</p>
                <br />
                <p>새로운 컬렉션은 마우스 오른쪽을 눌러 이름을 변경하거나 삭제할 수 있습니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-11',
            intro: (
              <div style={{ width: '260px' }}>
                <p>Main 영역입니다.</p>
                <br />
                <p>색상 혹은 파레트 목록을 표시합니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-paletts',
            intro: (
              <div style={{ width: '260px' }}>
                <p>파레트입니다.</p>
                <br />
                <p>마우스 오른쪽을 눌러 이름을 변경하거나 삭제할 수 있습니다.</p>
                <br />
                <p>어떤 파레트는 변경하거나 삭제할 수 없습니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-12',
            intro: (
              <div style={{ width: '260px' }}>
                <p>aside 영역입니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-13',
            intro: (
              <div style={{ width: '260px' }}>
                <p>색상 선택화면입니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-14',
            intro: (
              <div style={{ width: '260px' }}>
                <p>내가 선택한 색상을 나타냅니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-15',
            intro: (
              <div style={{ width: '260px' }}>
                <p>Main 영역으로 저를 드래그 앤 드랍 해주세요!</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-16',
            intro: (
              <div style={{ width: '260px' }}>
                <p>내가 선택한 색상을 초기색(#ffffff)으로 바로 변경합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  지금까지 <b>piystel</b> Helper 였습니다.
                </p>
                <br />
                <p>
                  <b>piystel</b>과 즐거운 시간 되세요!
                </p>
                <br />
                <p>감사합니다.</p>
              </div>
            ),
          },
        ]}
        initialStep={0}
        onExit={handleExit}
      />
    </React.Fragment>
  );
}
