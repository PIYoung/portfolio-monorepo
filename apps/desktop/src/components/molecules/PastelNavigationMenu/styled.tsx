import styled from 'styled-components';

export const Container = styled.div`
  & > div:first-child {
    color: var(--color-pastel-text-secondary);
  }

  & > div:not(:first-child) {
    color: var(--color-pastel-text);
  }
`;
