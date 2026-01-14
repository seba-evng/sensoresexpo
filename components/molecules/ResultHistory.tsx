// components/molecules/ResultHistory.tsx
import { getDiceStatistics } from '@/lib/core/logic/dice-logic';
import { DiceRoll } from '@/types/dice.types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ResultHistoryProps {
  history: DiceRoll[];
  onClear?: () => void;
}

export const ResultHistory: React.FC<ResultHistoryProps> = ({ history, onClear }) => {
  if (history.length === 0) {
    return (
      <View className="bg-gray-800 rounded-2xl p-6">
        <Text className="text-gray-500 text-center">
          No hay lanzamientos aún
        </Text>
      </View>
    );
  }

  const stats = getDiceStatistics(history);

  return (
    <View className="bg-gray-800 rounded-2xl p-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Ionicons name="trending-up" size={20} color="#9ca3af" />
          <Text className="text-gray-400 text-sm font-medium ml-2">
            Historial ({stats.total})
          </Text>
        </View>
        
        {onClear && (
          <TouchableOpacity 
            onPress={onClear}
            className="flex-row items-center bg-gray-700 px-3 py-1.5 rounded-lg"
          >
            <MaterialCommunityIcons name="delete-outline" size={14} color="#ef4444" />
            <Text className="text-red-400 text-xs font-medium ml-1">
              Limpiar
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Estadísticas */}
      <View className="flex-row justify-around mb-4 bg-gray-700/50 rounded-xl py-3">
        <View className="items-center">
          <Text className="text-gray-500 text-xs mb-1">Promedio</Text>
          <Text className="text-white text-lg font-bold">
            {stats.average.toFixed(1)}
          </Text>
        </View>
        
        <View className="w-px bg-gray-700" />
        
        <View className="items-center">
          <Text className="text-gray-500 text-xs mb-1">Más común</Text>
          <Text className="text-white text-lg font-bold">
            {stats.mostCommon}
          </Text>
        </View>
        
        <View className="w-px bg-gray-700" />
        
        <View className="items-center">
          <Text className="text-gray-500 text-xs mb-1">Total</Text>
          <Text className="text-white text-lg font-bold">
            {stats.total}
          </Text>
        </View>
      </View>

      {/* Lista de resultados */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {[...history].reverse().slice(0, 10).map((roll, index) => (
          <View 
            key={`${roll.timestamp}-${index}`}
            className="bg-gray-700 rounded-lg w-12 h-12 items-center justify-center mr-2"
          >
            <Text className="text-white text-xl font-bold">
              {roll.value}
            </Text>
          </View>
        ))}
      </ScrollView>

      {history.length > 10 && (
        <Text className="text-gray-500 text-xs text-center mt-2">
          Mostrando últimos 10 de {history.length}
        </Text>
      )}
    </View>
  );
};