import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageFallbackProps extends ImageProps {
  fallback?: string;
  height: number;
  width: number;
}

const ImageFallback: React.FC<ImageFallbackProps> = (props) => {
  const [imgSrc, setImageSrc] = useState(props.src);

  const { height, width } = props;

  const _height = Number(height) / 2;
  const _width = Number(width) / 2;

  const options: ImageProps = {
    ...props,
    src: imgSrc,
    onError: () => {
      console.error(`>>> error on image: `, imgSrc);
      setImageSrc(props.fallback!);
    },
  };

  return (
    <Image height={_height} width={_width} style={{ width: _width + 'px', height: _height + 'px' }} {...options} />
  );
};

export default ImageFallback;
