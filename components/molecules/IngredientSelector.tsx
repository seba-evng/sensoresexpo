// components/molecules/IngredientSelector.tsx
import { AVAILABLE_INGREDIENTS, INGREDIENT_DEFINITIONS } from '@/lib/constants/burger';
import { IngredientType } from '@/types/burger.types';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface IngredientSelectorProps {
  onSelectIngredient: (type: IngredientType) => void;
}

export function IngredientSelector({ onSelectIngredient }: IngredientSelectorProps) {
  return (
    <View className="bg-gray-800 rounded-2xl p-4">
      <Text className="text-white text-lg font-bold mb-3">
        Selecciona ingredientes
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex-row gap-3"
      >
        {AVAILABLE_INGREDIENTS.map((type) => {
          const ingredient = INGREDIENT_DEFINITIONS[type];
          return (
            <TouchableOpacity
              key={type}
              onPress={() => onSelectIngredient(type)}
              className="items-center"
              style={{ backgroundColor: ingredient.color }}
              activeOpacity={0.7}
            >
              <View className="w-20 h-20 rounded-xl items-center justify-center">
                <Text className="text-4xl">{ingredient.icon}</Text>
              </View>
              <Text className="text-white text-xs font-medium mt-2 text-center">
                {ingredient.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}