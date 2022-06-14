import styled from 'styled-components';

export const MainCircle = styled.div`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  color: black;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SpinCircle = styled.div`
  width: 140px;
  height: 140px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  transform-origin: center center;
  animation: piy-spin 60s linear infinite;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export const AgainstSpinCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  transform-origin: center center;
  animation: piy-spin-against 60s linear infinite;

  display: inherit;
  justify-content: inherit;
  align-items: inherit;
`;

export const Pulse = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  border-radius: 50%;
  animation: piy-pulse 1.5s infinite;

  display: inherit;
  justify-content: inherit;
  align-items: inherit;
`;
