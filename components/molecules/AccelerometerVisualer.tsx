// components/molecules/AccelerometerVisualizer.tsx
import { AccelerometerData } from '@/types/accelerometer.types';
import React from 'react';
import { Text, View } from 'react-native';

interface AccelerometerVisualizerProps {
  data: AccelerometerData;
  magnitude?: number;
}

export const AccelerometerVisualizer: React.FC<AccelerometerVisualizerProps> = ({ 
  data, 
  magnitude = 0 
}) => {
  // Normalizar valores para la visualización (-2 a 2 rango típico)
  const normalize = (value: number) => {
    const maxRange = 2;
    const percentage = (value / maxRange) * 50; // 50% del contenedor
    return Math.max(-50, Math.min(50, percentage));
  };

  const xPos = normalize(data.x);
  const yPos = normalize(data.y);
  const zHeight = Math.abs(normalize(data.z));

  return (
    <View className="bg-gray-800 rounded-2xl p-6">
      <Text className="text-gray-400 text-sm font-medium mb-4 text-center">
        Visualización del Acelerómetro
      </Text>

      {/* Visualización 2D (X, Y) */}
      <View className="bg-gray-900 rounded-xl h-48 mb-4 relative items-center justify-center overflow-hidden">
        {/* Líneas de referencia */}
        <View className="absolute w-full h-px bg-gray-700" style={{ top: '50%' }} />
        <View className="absolute h-full w-px bg-gray-700" style={{ left: '50%' }} />
        
        {/* Punto indicador */}
        <View
          className="absolute w-6 h-6 rounded-full bg-blue-500"
          style={{
            transform: [
              { translateX: xPos * 1.5 },
              { translateY: yPos * 1.5 },
            ],
          }}
        >
          <View className="w-full h-full rounded-full bg-blue-400 opacity-50 animate-ping" />
        </View>

        {/* Etiquetas de ejes */}
        <View className="absolute bottom-2 right-2">
          <Text className="text-gray-500 text-xs">X →</Text>
        </View>
        <View className="absolute top-2 right-2">
          <Text className="text-gray-500 text-xs">↑ Y</Text>
        </View>
      </View>

      {/* Valores numéricos */}
      <View className="flex-row justify-between mb-4">
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-xs mb-1">X</Text>
          <Text className="text-white text-base font-bold">{data.x.toFixed(2)}</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-xs mb-1">Y</Text>
          <Text className="text-white text-base font-bold">{data.y.toFixed(2)}</Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="text-gray-500 text-xs mb-1">Z</Text>
          <Text className="text-white text-base font-bold">{data.z.toFixed(2)}</Text>
        </View>
      </View>

      {/* Barra de magnitud */}
      <View>
        <Text className="text-gray-500 text-xs mb-2">
          Magnitud: {magnitude.toFixed(2)}
        </Text>
        <View className="bg-gray-900 rounded-full h-3 overflow-hidden">
          <View
            className="bg-blue-500 h-full rounded-full transition-all"
            style={{
              width: `${Math.min((magnitude / 5) * 100, 100)}%`,
            }}
          />
        </View>
      </View>
    </View>
  );
};