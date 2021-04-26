import { PLACEHOLDER_IMAGE, IMAGE_SIZE_SMALL } from '../../utils/constants';

function PlaceholderImage() {
  return (
    <img
      width={`${IMAGE_SIZE_SMALL}px`}
      height={`${IMAGE_SIZE_SMALL}px`}
      src={PLACEHOLDER_IMAGE}
      alt="Placeholder"
    />
  );
}

export default PlaceholderImage;
