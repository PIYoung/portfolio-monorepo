import styled from 'styled-components';

export const Outline = styled.div`
  padding: var(--size-large);
  border: 2px solid var(--color-primary);
  border-radius: var(--size-extra-small);
  background-color: var(--color-background-secondary);

  & > * {
    margin: var(--size-small);
  }

  & p {
    margin: 0;
  }

  & a {
    color: var(--color-text);
    text-decoration: none;
  }
`;

export const Button = styled.div`
  padding: var(--size-medium);
  color: var(--color-text);
  background-color: var(--color-secondary);
  border-radius: var(--size-extra-small);
  cursor: pointer;
  font-weight: bold;
  font-size: var(--size-large);
  margin-bottom: 16px;
`;

export const Greeting = styled.div`
  & > p {
    font-size: var(--size-large);
  }
`;

export const Info = styled.div`
  & > p {
    font-size: 14px;
  }
`;
