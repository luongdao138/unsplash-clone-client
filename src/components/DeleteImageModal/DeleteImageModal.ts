import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  opacity: ${({ openDeleteForm }: { openDeleteForm: boolean }) => (openDeleteForm ? 1 : 0)};
  visibility: ${({ openDeleteForm }: { openDeleteForm: boolean }) =>
    openDeleteForm ? 'visible' : 'hidden'};
`;

export const Content = styled.div`
  position: fixed;
  width: 620px;
  max-width: 95%;
  background-color: #fff;
  border-radius: 12px;
  padding: 23px 32px;
  z-index: 120;
  top: 50%;
  left: 50%;
  transform: ${({ openDeleteForm }: { openDeleteForm: boolean }) =>
    openDeleteForm ? 'translate(-50%, -50%)' : 'translate(-50%, -250%)'};
  transition: all 0.3s ease-in-out;
`;

export const Title = styled.h3`
  font-weight: 500;
  font-size: 24px;
  color: #333333;
  margin-bottom: 20px;
`;

export const Label = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #4f4f4f;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  border-radius: 12px;
  border: 1px solid #4f4f4f;
  padding: 18px;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  font-size: 400;
  font-weight: 500;
  color: #bdbdbd;
  margin-bottom: 24px;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    border-radius: 12px;
    padding: 14px 26px;
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
  }

  button:first-child {
    background-color: transparent;
    font-weight: 500;
    color: #bdbdbd;
  }

  button:nth-child(2) {
    background: #3db46d;
    color: #fff;
    width: 105px;
    display: flex;
    justify-content: center;
  }
`;

export const Spinner = styled.span`
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 3px solid #bdbdbd;
  border-top: 3px solid #3db46d;

  animation: spin 0.8s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

//#b3d8c2
