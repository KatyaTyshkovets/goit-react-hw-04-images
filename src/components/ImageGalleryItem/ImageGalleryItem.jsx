import PropTypes from 'prop-types';
import { Images, GalleryItem } from "./ImageGalleryItem.styled";

 const ImageGalleryItem = ({ id, src, tag, onClick, largeImageURL }) => {
  return (
    <GalleryItem key={id} id={id}>
      <Images src={src} alt={tag} onClick={onClick} data-set={largeImageURL} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string,
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};


export default ImageGalleryItem;