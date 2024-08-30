import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { styled } from 'nativewind';

const StyledImage = styled(Animated.Image);

const SlidingImages = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const translateXAnim = useRef(new Animated.Value(0)).current;

  const { width } = Dimensions.get('window');
  const imageWidth = Math.min(700, width * 0.9); // Image width max 200 or 50% of screen width
  const imageHeight = (imageWidth / 400) * 200; // Maintain 200x300 aspect ratio

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(translateXAnim, {
        toValue: -imageWidth, // Slide by the image width
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        translateXAnim.setValue(imageWidth); // Reset position
        Animated.timing(translateXAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [translateXAnim, images.length, imageWidth]);

  return (
    <View className="flex justify-center items-center">
      <StyledImage
        source={images[currentImageIndex]}
        style={{
          width: imageWidth,
          height: imageHeight,
          transform: [{ translateX: translateXAnim }],
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SlidingImages;
