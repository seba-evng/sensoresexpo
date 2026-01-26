// app/burger/index.tsx
import { BurgerScene } from '@/components/molecules/BurgerScene';
import { IngredientSelector } from '@/components/molecules/IngredientSelector';
import '@/global.css';
import { INGREDIENT_DEFINITIONS } from '@/lib/constants/burger';
import { Ingredient, IngredientType } from '@/types/burger.types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function BurgerScreen() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: 'base-bun',
      type: 'pan-inferior',
      position: 0,
      timestamp: Date.now(),
    },
    {
      id: 'top-bun-initial',
      type: 'pan-superior',
      position: 1,
      timestamp: Date.now(),
    },
  ]);

  const addIngredient = (type: IngredientType) => {
    // Encontrar índice del pan superior
    const topBunIndex = ingredients.findIndex(i => i.type === 'pan-superior');
    
    if (topBunIndex !== -1) {
      // Insertar ANTES del pan superior
      const newIngredient: Ingredient = {
        id: `${type}-${Date.now()}`,
        type,
        position: topBunIndex,
        timestamp: Date.now(),
      };
      
      const newIngredients = [...ingredients];
      newIngredients.splice(topBunIndex, 0, newIngredient);
      
      // Reajustar posiciones
      newIngredients.forEach((ing, idx) => {
        ing.position = idx;
      });
      
      setIngredients(newIngredients);
    }
  };

  const resetBurger = () => {
    Alert.alert(
      'Resetear hamburguesa',
      '¿Quieres empezar de nuevo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetear',
          style: 'destructive',
          onPress: () => {
            setIngredients([
              {
                id: 'base-bun',
                type: 'pan-inferior',
                position: 0,
                timestamp: Date.now(),
              },
              {
                id: 'top-bun-reset',
                type: 'pan-superior',
                position: 1,
                timestamp: Date.now(),
              },
            ]);
          },
        },
      ]
    );
  };

  // Contar ingredientes por tipo (sin contar panes)
  const ingredientCounts = ingredients.reduce((acc, ing) => {
    if (ing.type !== 'pan-inferior' && ing.type !== 'pan-superior') {
      acc[ing.type] = (acc[ing.type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalIngredients = ingredients.length - 2; // Sin contar los 2 panes

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="hamburger" size={32} color="#f59e0b" />
            <View className="ml-3">
              <Text className="text-white text-3xl font-bold">
                Arma tu Burger
              </Text>
              <Text className="text-gray-400 text-base">
                {totalIngredients} ingrediente{totalIngredients !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={resetBurger}
            className="bg-red-500/20 p-3 rounded-xl"
          >
            <MaterialCommunityIcons name="restart" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

        {/* Escena 3D */}
        <View className="items-center mb-6 bg-gray-800 rounded-3xl p-6">
          <BurgerScene ingredients={ingredients} size={320} />
        </View>

        {/* Selector de ingredientes */}
        <View className="mb-6">
          <IngredientSelector onSelectIngredient={addIngredient} />
        </View>

        {/* Contador de ingredientes */}
        <View className="bg-gray-800 rounded-2xl p-4 mb-4">
          <Text className="text-gray-400 text-sm font-semibold mb-3">
            Resumen:
          </Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl mb-1">🥩</Text>
              <Text className="text-white font-bold">{ingredientCounts['carne'] || 0}</Text>
              <Text className="text-gray-500 text-xs">Carne</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl mb-1">🧀</Text>
              <Text className="text-white font-bold">{ingredientCounts['queso'] || 0}</Text>
              <Text className="text-gray-500 text-xs">Queso</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl mb-1">🥬</Text>
              <Text className="text-white font-bold">{ingredientCounts['lechuga'] || 0}</Text>
              <Text className="text-gray-500 text-xs">Lechuga</Text>
            </View>
          </View>
        </View>

        {/* Lista de ingredientes */}
        <View className="bg-gray-800 rounded-2xl p-4">
          <Text className="text-gray-400 text-sm font-semibold mb-3">
            Tu hamburguesa:
          </Text>
          {ingredients.map((ingredient, index) => (
            <View
              key={ingredient.id}
              className="flex-row items-center py-2 border-b border-gray-700"
            >
              <Text className="text-2xl mr-3">
                {INGREDIENT_DEFINITIONS[ingredient.type].icon}
              </Text>
              <Text className="text-white flex-1">
                {INGREDIENT_DEFINITIONS[ingredient.type].name}
              </Text>
              <Text className="text-gray-500 text-xs">#{index + 1}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}