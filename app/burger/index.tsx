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
  ]);

  const addIngredient = (type: IngredientType) => {
    const newIngredient: Ingredient = {
      id: `${type}-${Date.now()}`,
      type,
      position: ingredients.length,
      timestamp: Date.now(),
    };
    
    setIngredients([...ingredients, newIngredient]);
  };

  const finishBurger = () => {
    // Agregar pan superior solo cuando presionas el botón
    const hasTopBun = ingredients.some(i => i.type === 'pan-superior');
    
    if (!hasTopBun) {
      const topBun: Ingredient = {
        id: 'top-bun',
        type: 'pan-superior',
        position: ingredients.length,
        timestamp: Date.now(),
      };
      setIngredients([...ingredients, topBun]);
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
            ]);
          },
        },
      ]
    );
  };

  const ingredientCount = ingredients.length - 1;
  const hasTopBun = ingredients.some(i => i.type === 'pan-superior');

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
                {ingredientCount} ingrediente{ingredientCount !== 1 ? 's' : ''}
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

        {/* Botón para finalizar - SOLO SI NO TIENE PAN SUPERIOR */}
        {!hasTopBun && ingredientCount > 0 && (
          <TouchableOpacity
            onPress={finishBurger}
            className="bg-green-500 rounded-xl py-4 mb-4"
          >
            <Text className="text-white text-center text-lg font-bold">
              🍔 Finalizar Hamburguesa
            </Text>
          </TouchableOpacity>
        )}

        {/* Info si está completa */}
        {hasTopBun && (
          <View className="bg-green-500/20 rounded-xl p-4 mb-4 border border-green-500">
            <Text className="text-green-400 text-center font-bold">
              🍔 ¡Hamburguesa lista!
            </Text>
          </View>
        )}

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