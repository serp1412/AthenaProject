import React, {memo} from 'react';
import {View} from 'react-native';

export interface SpacerProps {
  orientation: 'vertical' | 'horizontal';
  space: number;
}

const Spacer = memo(({orientation, space}: SpacerProps) => {
  return (
    <View
      style={{
        height: orientation == 'vertical' ? space : 0,
        width: orientation == 'horizontal' ? space : 0,
      }}
    />
  );
});

export default Spacer;
