// components/atoms/AxisCard.tsx
import React from 'react';
import { Text, View } from 'react-native';

interface AxisCardProps {
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
}

export const AxisCard: React.FC<AxisCardProps> = ({ 
  label, 
  value, 
  color,
  icon 
}) => {
  // Normalizar el valor para la barra de progreso (-2 a 2 es típico)
  const maxRange = 2;
  const normalizedValue = Math.abs(value);
  const percentage = Math.min((normalizedValue / maxRange) * 100, 100);

  return (
    <View className="bg-gray-800 rounded-xl p-4 flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className="text-gray-400 text-sm font-semibold">
            Eje {label}
          </Text>
        </View>
        <Text 
          className="text-lg font-bold"
          style={{ color }}
        >
          {value.toFixed(2)}
        </Text>
      </View>

      {/* Barra de progreso */}
      <View className="bg-gray-900 rounded-full h-2 overflow-hidden">
        <View
          className="h-full rounded-full transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </View>

      {/* Indicador de dirección */}
      <Text className="text-gray-500 text-xs mt-2 text-center">
        {value > 0 ? '→ Positivo' : value < 0 ? '← Negativo' : '• Neutral'}
      </Text>
    </View>
  );
};