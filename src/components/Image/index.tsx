import { Image as ImageInterface } from '../../features/images/interface';
import { ImageItem } from './Image.styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface Props {
  item: ImageInterface;
  handleDeleleImage: (id: string) => void;
}

const Image = ({ item, handleDeleleImage }: Props) => {
  return (
    <ImageItem>
      <div className="black"></div>
      {/* <img src={item.url} alt="" /> */}
      <LazyLoadImage src={item.url} effect="blur" />
      <p>{item.label}</p>
      <button
        className="delete"
        onClick={() => {
          handleDeleleImage(item._id);
        }}
      >
        delete
      </button>
      <CopyToClipboard text={item.url}>
        <button className="copy">Copy url</button>
      </CopyToClipboard>
    </ImageItem>
  );
};

export default Image;
