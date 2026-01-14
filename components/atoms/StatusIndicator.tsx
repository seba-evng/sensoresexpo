// components/atoms/StatusIndicator.tsx
import React from 'react';
import { Text, View } from 'react-native';

interface StatusIndicatorProps {
  isActive: boolean;
  label: string;
}

export function StatusIndicator({ isActive, label }: StatusIndicatorProps) {
  return (
    <View className="flex-row items-center bg-gray-800 rounded-lg px-3 py-2">
      <View
        className="w-2 h-2 rounded-full mr-2"
        style={{ backgroundColor: isActive ? '#10b981' : '#6b7280' }}
      />
      <Text className="text-gray-300 text-sm font-medium">
        {label}: {isActive ? 'Activo' : 'Inactivo'}
      </Text>
    </View>
  );
}