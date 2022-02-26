import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
  cursor: pointer;

  & > * {
    width: 100%;
  }

  & > p {
    margin: 0;
    margin-top: var(--size-small);
  }
`;
