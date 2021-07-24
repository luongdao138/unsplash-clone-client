import { Button, Content, Icon, LogoWrapper, SmallScreenInput, Wrapper } from './Navbar.styles';
import Logo from '../../assets/my_unsplash_logo.svg';
import { FormEvent, useState } from 'react';
import AddImageModal from '../AddImageModal';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getImages } from '../../features/images/imageSlice';

const Navbar = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const {
    page_info: { items_per_page },
    searchTerm,
  } = useAppSelector((state) => state.images);

  const handleSearchImages = (e: FormEvent) => {
    e.preventDefault();
    if (value === searchTerm) return;

    dispatch(
      getImages({
        searchTerm: value,
        skip: 0,
        limit: items_per_page,
      })
    );
  };

  return (
    <Wrapper>
      <AddImageModal openAddForm={openAddForm} setOpenAddForm={setOpenAddForm} />
      <Content>
        <LogoWrapper>
          <img src={Logo} alt="" />
          <div className="search">
            <Icon />
            <form onSubmit={handleSearchImages}>
              <input
                type="text"
                placeholder="Search by name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </form>
          </div>
        </LogoWrapper>
        <Button onClick={() => setOpenAddForm(true)}>Add a photo</Button>
      </Content>
      <SmallScreenInput>
        <Icon />
        {/* <input type="text" placeholder="Search by name" /> */}
        <form onSubmit={handleSearchImages}>
          <input
            type="text"
            placeholder="Search by name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </SmallScreenInput>
    </Wrapper>
  );
};

export default Navbar;
