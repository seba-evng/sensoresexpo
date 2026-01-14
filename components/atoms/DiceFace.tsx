// components/atoms/DiceFace.tsx
import { DiceValue } from '@/types/dice.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

interface DiceFaceProps {
  value: DiceValue;
  size?: number;
  color?: string;
  isRolling?: boolean;
}

export const DiceFace: React.FC<DiceFaceProps> = ({ 
  value, 
  size = 120,
  color = '#3b82f6',
  isRolling = false
}) => {
  const iconName = getDiceIconName(value);
  
  return (
    <View 
      className="items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <MaterialCommunityIcons 
        name={iconName}
        size={size} 
        color={color}
      />
    </View>
  );
};

/**
 * Retorna el nombre del ícono correspondiente al valor del dado
 */
function getDiceIconName(value: DiceValue): any {
  const icons = {
    1: 'dice-1',
    2: 'dice-2',
    3: 'dice-3',
    4: 'dice-4',
    5: 'dice-5',
    6: 'dice-6',
  };
  
  return icons[value];
}