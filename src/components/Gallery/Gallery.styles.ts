import styled from 'styled-components';
export const ImagesContainer = styled.div`
  margin: 0 -16px;
  overflow: hidden;

  @media (max-width: 900px) {
    margin: 0 -8px;
  }
`;

export const Spinner = styled.div`
  width: 30px;
  height: 30px;
  position: fixed;
  border-radius: 50%;
  border: 5px solid #bdbdbd;
  border-top: 5px solid #3db46d;
  margin-top: 20px;
  animation: spin 0.8s linear infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
