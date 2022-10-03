import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
 }`;

const SpinnerWrapper = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #383636; /* Black */
  border-radius: 50%;
  animation: ${spinnerAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;

function Loading({ text }) {
  return (
    <SpinnerWrapper>
      <Spinner />
      <div>{text}</div>
    </SpinnerWrapper>
  );
}

export default Loading;
