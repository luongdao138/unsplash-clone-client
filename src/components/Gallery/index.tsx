import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImagesContainer, Spinner } from './Gallery.styles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getImages } from '../../features/images/imageSlice';
import DeleteImageModal from '../DeleteImageModal';
import { useState } from 'react';
import Image from '../Image';

const Gallery = () => {
  const {
    error,
    list,
    page_info,
    searchTerm,
    loading: { fetch },
  } = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const fetchMoreImages = () => {
    dispatch(
      getImages({
        limit: page_info.items_per_page,
        skip: list.length,
        searchTerm,
      })
    );
  };

  const handleDeleleImage = (id: string) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  if (fetch && !list.length) return <Spinner />;

  return (
    <div>
      <DeleteImageModal
        openDeleteForm={openDeleteModal}
        setOpenDeleteForm={setOpenDeleteModal}
        _id={id}
      />
      <ImagesContainer>
        {/* <Spinner /> */}
        <InfiniteScroll
          dataLength={list.length}
          hasMore={list.length < page_info.total_results}
          next={fetchMoreImages}
          loader={<p style={{ textAlign: 'center', margin: '20px 0' }}> Loading...</p>}
        >
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry>
              {list.map((item) => {
                return <Image item={item} key={item._id} handleDeleleImage={handleDeleleImage} />;
              })}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      </ImagesContainer>
    </div>
  );
};

export default Gallery;
