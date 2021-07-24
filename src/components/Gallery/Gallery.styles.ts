import styled from 'styled-components';
export const ImagesContainer = styled.div`
  margin: 0 -16px;

  @media (max-width: 900px) {
    margin: 0 -8px;
  }
`;
export const ImageItem = styled.div`
  position: relative;
  img {
    width: 100%;
    border-radius: 16px;
  }
  margin: 16px;

  @media (max-width: 900px) {
    margin: 8px;
  }

  .black {
    position: absolute;
    transition: all 0.3s;
    top: 0;
    left: 0;
    bottom: 5px;
    border-radius: 16px;
    right: 0;
    z-index: 4;
    background-color: rgba(0, 0, 0, 0.65);
    opacity: 0;
    visibility: hidden;
  }

  :hover .black,
  :hover p,
  :hover button {
    opacity: 1;
    visibility: visible;
  }

  p,
  button {
    position: absolute;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s;
    visibility: hidden;
  }

  p {
    bottom: 20px;
    left: 20px;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
  }

  button {
    top: 20px;
    right: 20px;
    border-radius: 38px;
    border: 1px solid #eb5757;
    color: #eb5757;
    background-color: transparent;
    padding: 5px 10px;
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
