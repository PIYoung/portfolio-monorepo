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
            dispatch(
              setSelectedMenu({
                ...child,
                isDetail: false,
              }),
            );
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
        options={{
          nextLabel: '다음',
          prevLabel: '이전',
          doneLabel: '완료',
          skipLabel: '건너뛰기',
          exitOnOverlayClick: false,
        }}
        enabled={configurations.showIntro}
        steps={[
          {
            element: '.piystel-15',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  <b>piystel</b>에 오신 걸 환영합니다.
                </p>
                <br />
                <p>
                  저는 <b>piystel</b>을 좀 더 쉽게 사용할 수 있게 도와주는{' '}
                  <b>
                    <span style={{ color: '#c585c5' }}>HEX</span>
                  </b>
                  입니다.
                </p>
              </div>
            ),
            position: 'left',
          },
          {
            element: '.piystel-15',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  <b>piystel</b>은 내가 즐겨쓰는 색상을 쉽게 관리하게 해주는 작업도구입니다.
                </p>
              </div>
            ),
            position: 'left',
          },
          {
            element: '.piystel-15',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  지금부터, <b>piystel</b>에 대해서 말씀드리겠습니다.
                </p>
              </div>
            ),
            position: 'left',
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
                <p>설명을 처음부터 시작합니다.</p>
                <br />
                <p>모르고 지나친게 있으면 눌러주세요.</p>
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
                <p>모든 데이터를 초기화합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-7',
            intro: (
              <div style={{ width: '260px' }}>
                <p>새로운 팔레트 혹은 색상을 추가합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-8',
            intro: (
              <div style={{ width: '260px' }}>
                <p>등록된 팔레트를 검색합니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-all-paletts',
            intro: (
              <div style={{ width: '260px' }}>
                <p>모든 팔레트 목록입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-recents',
            intro: (
              <div style={{ width: '260px' }}>
                <p>최근 조회한 팔레트 목록입니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-colors',
            intro: (
              <div style={{ width: '260px' }}>
                <p>샘플 색상 목록입니다.</p>
                <br />
                <p>색상 추가/삭제 이름 변경 가능합니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-themes',
            intro: (
              <div style={{ width: '260px' }}>
                <p>샘플 팔레트(Themes)입니다.</p>
                <br />
                <p>삭제/변경할 수 없습니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-reference',
            intro: (
              <div style={{ width: '260px' }}>
                <p>샘플 팔레트(Reference)입니다.</p>
                <br />
                <p>삭제/변경할 수 있습니다.</p>
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
                <p>새로운 컬렉션은 마우스 오른쪽 버튼을 눌러서 이름을 변경하거나 삭제할 수 있습니다.</p>
              </div>
            ),
            position: 'right',
          },
          {
            element: '.piystel-paletts',
            intro: (
              <div style={{ width: '260px' }}>
                <p>팔레트입니다.</p>
                <br />
                <p>마우스 오른쪽을 눌러 이름을 변경하거나 삭제할 수 있습니다.</p>
                <br />
                <p>어떤 팔레트는 변경하거나 삭제할 수 없습니다.</p>
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
            position: 'left',
          },
          {
            element: '.piystel-14',
            intro: (
              <div style={{ width: '260px' }}>
                <p>현재 선택된 색상을 표시합니다.</p>
              </div>
            ),
            position: 'left',
          },
          {
            element: '.piystel-15',
            intro: (
              <div style={{ width: '260px' }}>
                <p>저를 가운데 영역에 드래그 앤 드랍 해주세요!</p>
              </div>
            ),
            position: 'left',
          },
          {
            element: '.piystel-16',
            intro: (
              <div style={{ width: '260px' }}>
                <p>현재 색상을 되돌립니다.</p>
              </div>
            ),
            position: 'bottom',
          },
          {
            element: '.piystel-15',
            intro: (
              <div style={{ width: '260px' }}>
                <p>
                  지금까지{' '}
                  <b>
                    <span style={{ color: '#c585c5' }}>HEX</span>
                  </b>
                  였습니다.
                </p>
                <br />
                <p>
                  <b>piystel</b>과 즐거운 시간 되세요!
                </p>
                <br />
                <p>감사합니다.</p>
              </div>
            ),
            position: 'left',
          },
        ]}
        initialStep={0}
        onExit={handleExit}
      />
    </React.Fragment>
  );
}
