import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postImages } from '../../features/images/imageSlice';
import {
  ButtonWrapper,
  Content,
  DropZone,
  Input,
  Label,
  Spinner,
  Title,
  UploadButton,
  Wrapper,
} from './AddImageModal.styles';
import { useDropzone } from 'react-dropzone';
import DropImage from '../../assets/image.svg';

interface Props {
  openAddForm: boolean;
  setOpenAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormType {
  label: string;
  url: string;
}

const AddImageModal = ({ openAddForm, setOpenAddForm }: Props) => {
  const [isUploadFromDevice, setIsUploadFromDevice] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);

  const getPreviewUrl = useCallback((file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreviewUrl(fileReader.result);
    };
  }, []);

  useEffect(() => {
    if (file) {
      getPreviewUrl(file);
    }
  }, [file, getPreviewUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
  });
  const handleCloseModal = () => {
    setImage({ label: '', url: '' });
    setFile(null);
    setIsUploadFromDevice(false);
    setPreviewUrl(null);
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
    if (!image.label || (!image.url && !file)) return;

    let formData = new FormData();
    formData.append('label', image.label);
    if (image.url && image.url.trim().length > 0) formData.append('url', image.url);

    if (file) formData.append('image', file);

    dispatch(
      postImages({
        data: formData,
        cb: handleCloseModal,
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
          {!isUploadFromDevice ? (
            <>
              <Label>Photo URL</Label>
              <Input type="text" name="url" value={image.url} onChange={handleChange} />
            </>
          ) : (
            <>
              <DropZone {...getRootProps()}>
                <input {...getInputProps()} />
                {previewUrl ? (
                  <img src={previewUrl as string} alt="" className="img" />
                ) : (
                  <>
                    <img src={DropImage} alt="" className="logo" />
                    <p>Drag & Drop your image here</p>
                  </>
                )}
              </DropZone>
            </>
          )}

          {isUploadFromDevice ? (
            <UploadButton
              onClick={() => {
                setFile(null);
                setPreviewUrl(null);
                setIsUploadFromDevice(false);
              }}
            >
              Upload by url
            </UploadButton>
          ) : (
            <UploadButton
              onClick={() => {
                setImage({
                  ...image,
                  url: '',
                });
                setIsUploadFromDevice(true);
              }}
            >
              Upload from this device
            </UploadButton>
          )}

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
