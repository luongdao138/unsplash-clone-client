import styled from 'styled-components';
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

  button.delete {
    top: 20px;
    right: 20px;
    border-radius: 38px;
    border: 1px solid #eb5757;
    color: #eb5757;
    background-color: transparent;
    padding: 5px 10px;
  }

  button.copy {
    top: 20px;
    right: 90px;
    border-radius: 38px;
    border: 1px solid #3db46d;
    color: #3db46d;
    background-color: transparent;
    padding: 5px 10px;
  }
`;
