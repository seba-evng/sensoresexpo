// components/molecules/DiceDisplay.tsx
import { DICE_ANIMATION } from '@/lib/constants';
import { getRandomDiceValue } from '@/lib/core/logic/dice-logic';
import { DiceValue } from '@/types/dice.types';
import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { DiceFace3D } from '../atoms/DiceFace3D'; // ← Debe ser DiceFace3D, NO DiceFace

interface DiceDisplayProps {
  value: DiceValue;
  isRolling: boolean;
}

export const DiceDisplay: React.FC<DiceDisplayProps> = ({ value, isRolling }) => {
  const [displayValue, setDisplayValue] = useState<DiceValue>(value);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(getRandomDiceValue());
      }, DICE_ANIMATION.rollingDuration / DICE_ANIMATION.rollingSteps);
      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
    }
  }, [isRolling, value]);

  useEffect(() => {
    if (!isRolling) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isRolling]);

  return (
    <View className="items-center justify-center py-8">
      <View className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* ← AQUÍ debe usar DiceFace3D */}
          <DiceFace3D
            value={displayValue}
            size={220}
            isRolling={isRolling}
          />
        </Animated.View>
      </View>

      <View className="mt-6">
        <Text className="text-gray-400 text-center text-sm font-medium mb-1">
          {isRolling ? 'Lanzando...' : 'Resultado'}
        </Text>
        <Text className="text-white text-center text-5xl font-bold">
          {displayValue}
        </Text>
      </View>
    </View>
  );
};