import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Content = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  .search {
    position: relative;
    @media (max-width: 600px) {
      display: none;
    }
  }

  input {
    border: 1px solid #bdbdbd;
    filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
    border-radius: 12px;
    padding: 14px 14px 14px 40px;
    width: 300px;

    ::placeholder {
      font-size: 14px;
      color: #bdbdbd;
    }
  }
`;

export const Icon = styled(MdSearch)`
  color: #bdbdbd;
  font-size: 20px;
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
`;

export const Button = styled.button`
  display: block;
  padding: 14px 24px;
  background: #3db46d;
  color: #fff;
  border-radius: 12px;

  @media (max-width: 500px) {
    padding: 10px 18px;
  }
`;

export const SmallScreenInput = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 32px;

  input {
    width: 100%;
    border: 1px solid #bdbdbd;
    filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
    border-radius: 12px;
    padding: 14px 14px 14px 40px;

    ::placeholder {
      font-size: 14px;
      color: #bdbdbd;
    }
  }
  @media (min-width: 600px) {
    display: none;
  }
`;
