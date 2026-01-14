// components/atoms/ControlButton.tsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ControlButtonProps {
  onPress: () => void;
  isActive: boolean;
  activeText: string;
  inactiveText: string;
  activeColor: string;
  inactiveColor: string;
}

export function ControlButton({
  onPress,
  isActive,
  activeText,
  inactiveText,
  activeColor,
  inactiveColor,
}: ControlButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-xl overflow-hidden"
      activeOpacity={0.8}
    >
      <View
        className="py-4 px-6 items-center"
        style={{ backgroundColor: isActive ? activeColor : inactiveColor }}
      >
        <Text className="text-white text-base font-bold">
          {isActive ? activeText : inactiveText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}