// components/atoms/ShakeIndicator.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, Text, View } from 'react-native';

interface ShakeIndicatorProps {
  isActive: boolean;
  magnitude?: number;
}

export const ShakeIndicator: React.FC<ShakeIndicatorProps> = ({ 
  isActive,
  magnitude = 0 
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isActive && magnitude > 1) {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [magnitude, isActive]);

  return (
    <View className="items-center py-6">
      <Animated.View
        style={{
          transform: [{ translateX: animatedValue }],
        }}
      >
        <View className={`p-4 rounded-full ${isActive ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
          <Ionicons 
            name="phone-portrait-outline"
            size={48} 
            color={isActive ? '#3b82f6' : '#6b7280'}
          />
        </View>
      </Animated.View>
      
      <Text className={`mt-3 text-sm font-medium ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
        {isActive ? '¡Agita tu dispositivo!' : 'Inicia el sensor para jugar'}
      </Text>
      
      {isActive && magnitude > 0 && (
        <View className="mt-2 px-4 py-1 bg-gray-800 rounded-full">
          <Text className="text-gray-400 text-xs">
            Fuerza: {magnitude.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};