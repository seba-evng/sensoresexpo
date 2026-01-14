// components/molecules/DiceDisplay.tsx

import { DICE_ANIMATION } from '@/lib/constants';
import { getRandomDiceValue } from '@/lib/core/logic/dice-logic';
import { DiceValue } from '@/types/dice.types';
import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { DiceFace } from '../atoms/DiceFace';

interface DiceDisplayProps {
  value: DiceValue;
  isRolling: boolean;
}

export const DiceDisplay: React.FC<DiceDisplayProps> = ({ value, isRolling }) => {
  const [displayValue, setDisplayValue] = useState<DiceValue>(value);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  // Animación de rolling (cambio rápido de valores)
  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(getRandomDiceValue());
      }, DICE_ANIMATION.rollingDuration / DICE_ANIMATION.rollingSteps);

      return () => clearInterval(interval);
    } else {
      // Cuando termina el rolling, mostrar el valor final
      setDisplayValue(value);
    }
  }, [isRolling, value]);

  // Animación de escala y rotación
  useEffect(() => {
    if (isRolling) {
      // Animación durante el rolling
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1.2,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    } else {
      // Animación de "pop" al terminar
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.3,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();

      // Reset rotación
      rotateAnim.setValue(0);
    }
  }, [isRolling]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="items-center justify-center py-8">
      {/* Contenedor del dado */}
      <View className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
        <Animated.View
          style={{
            transform: [
              { scale: scaleAnim },
              { rotate: isRolling ? rotate : '0deg' },
            ],
          }}
        >
          <DiceFace
            value={displayValue}
            size={140}
            color={isRolling ? '#8b5cf6' : '#3b82f6'}
            isRolling={isRolling}
          />
        </Animated.View>
      </View>

      {/* Texto del valor */}
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