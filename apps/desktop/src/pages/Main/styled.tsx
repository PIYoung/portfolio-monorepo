import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

export const TopContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Top = styled.div`
  max-width: 1200px;
  height: 100%;
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
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--color-background-secondary);
  color: var(--color-text);
`;
