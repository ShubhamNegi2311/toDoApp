import React from 'react';
import {View} from 'react-native';

type SpaceViewProps = {
  height?: number;
  width?: number;
};

const SpaceView: React.FC<SpaceViewProps> = props => {
  return (
    <View style={{height: props?.height ?? 0, width: props?.width ?? 0}} />
  );
};

export default SpaceView;
