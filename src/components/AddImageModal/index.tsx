import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReactDom from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postImages } from '../../features/images/imageSlice';
import {
  ButtonWrapper,
  Content,
  Input,
  Label,
  Spinner,
  Title,
  Wrapper,
} from './AddImageModal.styles';

interface Props {
  openAddForm: boolean;
  setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormType {
  label: string;
  url: string;
}

const AddImageModal = ({ openAddForm, setOpenAddForm }: Props) => {
  const handleCloseModal = () => {
    setOpenAddForm(false);
  };
  const dispatch = useAppDispatch();
  const {
    loading: { create },
  } = useAppSelector((state) => state.images);
  const [image, setImage] = useState<FormType>({ label: '', url: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage({
      ...image,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!image.label || !image.url) return;

    dispatch(
      postImages({
        ...image,
        cb: () => {
          setOpenAddForm(false);
          setImage({ label: '', url: '' });
        },
      })
    );
  };

  return ReactDom.createPortal(
    <>
      <Wrapper openAddForm={openAddForm}></Wrapper>
      <Content openAddForm={openAddForm}>
        <Title>Add a new photo</Title>
        <form onSubmit={handleSubmit}>
          <Label>Label</Label>
          <Input type="text" name="label" value={image.label} onChange={handleChange} />
          <Label>Photo URL</Label>
          <Input type="text" name="url" value={image.url} onChange={handleChange} />
          <ButtonWrapper>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
            {!create ? (
              <button type="submit">Submit</button>
            ) : (
              <button>
                <Spinner />
              </button>
            )}
          </ButtonWrapper>
        </form>
      </Content>
    </>,
    document.getElementById('add-portal') as HTMLElement
  );
};
export default AddImageModal;
