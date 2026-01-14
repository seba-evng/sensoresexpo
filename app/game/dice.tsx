// app/game/dice.tsx

import { ControlButton } from '@/components/atoms/ControlButton';
import { ShakeIndicator } from '@/components/atoms/ShakeIndicator';
import { StatusIndicator } from '@/components/atoms/StatusIndicator';
import { DiceDisplay } from '@/components/molecules/DiceDisplay';
import { ResultHistory } from '@/components/molecules/ResultHistory';
import "@/global.css";
import { DICE_ANIMATION } from '@/lib/constants';
import { createDiceRoll, rollDice } from '@/lib/core/logic/dice-logic';
import { useAccelerometer } from '@/lib/modules/sensors/useAccelerometer';
import { DiceRoll, DiceValue } from '@/types/dice.types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function DiceScreen() {
  // Estado del dado
  const [currentValue, setCurrentValue] = useState<DiceValue>(1);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<DiceRoll[]>([]);

  // Hook del acelerómetro con callback de sacudida
  const { data, isActive, isAvailable, motionResult, toggle } = useAccelerometer({
    enabled: false, // Iniciar manualmente
    onShake: handleShake,
  });

  /**
   * Maneja la detección de sacudida
   */
  function handleShake() {
    if (!isRolling) {
      performDiceRoll();
    }
  }

  /**
   * Ejecuta el lanzamiento del dado con animación
   */
  const performDiceRoll = useCallback(() => {
    setIsRolling(true);

    // Simular animación de rolling
    setTimeout(() => {
      const newValue = rollDice();
      setCurrentValue(newValue);
      setIsRolling(false);

      // Agregar al historial
      const roll = createDiceRoll(newValue);
      setHistory(prev => [...prev, roll]);
    }, DICE_ANIMATION.rollingDuration);
  }, []);

  /**
   * Limpia el historial con confirmación
   */
  const handleClearHistory = useCallback(() => {
    Alert.alert(
      'Limpiar historial',
      '¿Estás seguro de que quieres eliminar todos los resultados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar', 
          style: 'destructive',
          onPress: () => setHistory([])
        },
      ]
    );
  }, []);

  /**
   * Maneja el toggle del sensor con validación
   */
  const handleToggle = useCallback(() => {
    if (!isAvailable) {
      Alert.alert(
        'Sensor no disponible',
        'El acelerómetro no está disponible en este dispositivo.',
        [{ text: 'OK' }]
      );
      return;
    }
    toggle();
  }, [isAvailable, toggle]);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView 
        className="flex-1 px-4 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center">
          <MaterialCommunityIcons name="dice-multiple" size={32} color="#3b82f6" />
          <View className="ml-3">
            <Text className="text-white text-3xl font-bold">
              Lanza el Dado
            </Text>
            <Text className="text-gray-400 text-base">
              Agita tu dispositivo para lanzar
            </Text>
          </View>
        </View>

        {/* Status Indicator */}
        <View className="mb-4 items-start">
          <StatusIndicator 
            isActive={isActive} 
            label="Acelerómetro" 
          />
        </View>

        {/* Shake Indicator */}
        {isActive ? (
          <ShakeIndicator 
            isActive={isActive}
            magnitude={motionResult?.magnitude || 0}
          />
        ) : (
          <View className="items-center py-6">
            <View className="p-4 rounded-full bg-gray-800">
              <MaterialCommunityIcons name="dice-multiple" size={48} color="#6b7280" />
            </View>
            <Text className="mt-3 text-sm font-medium text-gray-500">
              Activa el sensor para comenzar
            </Text>
          </View>
        )}

        {/* Dice Display */}
        <DiceDisplay 
          value={currentValue}
          isRolling={isRolling}
        />

        {/* Control Button */}
        <View className="mb-6">
          <ControlButton 
            onPress={handleToggle}
            isActive={isActive}
            activeText="Detener Sensor"
            inactiveText="Activar Sensor"
            activeColor="#ef4444"
            inactiveColor="#10b981"
          />
        </View>

        {/* Debug Info (opcional en desarrollo) */}
        {isActive && __DEV__ && (
          <View className="mb-4 bg-gray-800 rounded-xl p-4">
            <View className="flex-row items-center mb-3">
              <Ionicons name="pulse" size={16} color="#9ca3af" />
              <Text className="text-gray-400 text-xs ml-2 font-semibold">
                DEBUG INFO
              </Text>
            </View>
            <View className="space-y-1">
              <Text className="text-gray-500 text-xs">
                X: {data.x.toFixed(3)} | Y: {data.y.toFixed(3)} | Z: {data.z.toFixed(3)}
              </Text>
              <Text className="text-gray-500 text-xs">
                Magnitud: {motionResult?.magnitude.toFixed(3) || '0.000'}
              </Text>
              <Text className="text-gray-500 text-xs">
                Umbral: 2.500 (sacudida detectada cuando magnitud {'>'} umbral)
              </Text>
            </View>
          </View>
        )}

        {/* Result History */}
        <View className="mb-6">
          <ResultHistory 
            history={history}
            onClear={handleClearHistory}
          />
        </View>

        {/* Info Card */}
        <View className="mb-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#3b82f6" />
            <View className="flex-1 ml-3">
              <Text className="text-gray-300 text-sm font-semibold mb-1">
                Cómo jugar
              </Text>
              <Text className="text-gray-400 text-sm leading-5">
                Activa el sensor y agita tu dispositivo con un movimiento rápido para lanzar el dado. Los resultados se guardarán en el historial automáticamente.
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Info */}
        {!isAvailable && (
          <View className="mb-4 bg-red-900/20 rounded-xl p-4 border border-red-800">
            <View className="flex-row items-start">
              <Ionicons name="information-circle" size={20} color="#ef4444" />
              <View className="flex-1 ml-3">
                <Text className="text-red-400 text-sm font-semibold mb-1">
                  Sensor no disponible
                </Text>
                <Text className="text-red-300/80 text-sm leading-5">
                  El acelerómetro no está disponible en este dispositivo o en el emulador.
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}