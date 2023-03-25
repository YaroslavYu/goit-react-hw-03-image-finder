import { Gallery } from './ImageGallery.styled';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ images }) {
  return (
    <Gallery>
      {images &&
        images.map(image => {
          return <ImageGalleryItem image={image} key={image.id} />;
        })}
    </Gallery>
  );
}
