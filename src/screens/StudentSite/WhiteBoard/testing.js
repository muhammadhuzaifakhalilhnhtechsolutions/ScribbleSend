import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Canvas, Path } from '@shopify/react-native-skia';

const TestDraw = () => {
  const [paths, setPaths] = useState([]);

  const pan = Gesture.Pan()
    .onStart(g => addSegment(g.x, g.y, true))
    .onUpdate(g => addSegment(g.x, g.y))
    .minDistance(1)
    .runOnJS(true);

  const addSegment = useCallback((x, y, newPath = false) => {
    setPaths(prevPaths => {
      const pathsCopy = [...prevPaths];
      const index = newPath ? pathsCopy.length : prevPaths.length - 1;
      if (newPath) {
        pathsCopy[index] = { segments: [], color: 'yellow' };
      }
      pathsCopy[index].segments.push(newPath ? `M ${x} ${y}` : `L ${x} ${y}`);
      return pathsCopy;
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: '#c0c0c0' }}>
          <Canvas style={{ flex: 8 }}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(' ')}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default TestDraw;
