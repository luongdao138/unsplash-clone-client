import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReactDom from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteImages, postImages } from '../../features/images/imageSlice';
import { ButtonWrapper, Content, Input, Label, Spinner, Title, Wrapper } from './DeleteImageModal';

interface Props {
  openDeleteForm: boolean;
  _id: string;
  setOpenDeleteForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormType {
  password: string;
}

const DeleteImageModal = ({ openDeleteForm, setOpenDeleteForm, _id }: Props) => {
  const handleCloseModal = () => {
    setOpenDeleteForm(false);
  };
  const dispatch = useAppDispatch();
  const {
    loading: { create },
  } = useAppSelector((state) => state.images);
  const [image, setImage] = useState<FormType>({ password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage({
      ...image,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (image.password !== 'huongluong138') {
      alert('Password is not correct!');
      return;
    }

    dispatch(
      deleteImages({
        _id,
        cb: () => {
          setImage({ password: '' });
          setOpenDeleteForm(false);
        },
      })
    );
  };

  return ReactDom.createPortal(
    <>
      <Wrapper openDeleteForm={openDeleteForm}></Wrapper>
      <Content openDeleteForm={openDeleteForm}>
        <Title>Are you sure?</Title>
        <form onSubmit={handleSubmit}>
          <Label>Password</Label>
          <Input type="password" name="password" value={image.password} onChange={handleChange} />

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
export default DeleteImageModal;
