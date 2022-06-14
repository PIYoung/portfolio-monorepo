import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

export const TopContainer = styled.div`
  width: 1200px;
  height: 100vh;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: var(--color-text);
  background-color: var(--color-background);
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  background-color: var(--color-background-secondary);
`;
