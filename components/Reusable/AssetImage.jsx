import React from 'react';
import { Image } from 'react-native';

const AssetImage = ({ data, width, height, mode }) => {
  return (
    <Image
      source={data}
      style={{ width, height }}
      resizeMode={mode || 'cover'}
    />
  );
};

export default AssetImage;
