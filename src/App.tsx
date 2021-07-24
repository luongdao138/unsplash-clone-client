import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Gallery from './components/Gallery';
import Navbar from './components/Navbar';
import { getImages } from './features/images/imageSlice';
import GlobalStyle from './GlobalStyle';

function App() {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImages({ skip: 0, limit: 10, searchTerm }));
  }, [dispatch]);

  return (
    <Wrapper>
      <Navbar />
      <Gallery />
      <GlobalStyle />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 95%;
  max-width: 1100px;
  margin: 0 auto;
  overflow: hidden;
`;

export default App;
