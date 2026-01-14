// lib/core/logic/dice-logic.ts
import { DiceValue, DiceRoll } from '@/types/dice.types';
import { DICE_VALUES } from '@/lib/constants';
/**
 * Genera un valor aleatorio del dado (1-6)
 */
export function rollDice(): DiceValue {
  const randomIndex = Math.floor(Math.random() * DICE_VALUES.length);
  return DICE_VALUES[randomIndex] as DiceValue;
}

/**
 * Genera un valor aleatorio para animación (puede repetir el actual)
 */
export function getRandomDiceValue(): DiceValue {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue;
}

/**
 * Crea un registro de lanzamiento
 */
export function createDiceRoll(value: DiceValue): DiceRoll {
  return {
    value,
    timestamp: Date.now()
  };
}

/**
 * Obtiene estadísticas del historial de lanzamientos
 */
export function getDiceStatistics(history: DiceRoll[]) {
  if (history.length === 0) {
    return {
      total: 0,
      average: 0,
      mostCommon: null,
      distribution: {}
    };
  }

  const distribution: Record<number, number> = {};
  let sum = 0;

  // Calcular distribución y suma
  history.forEach(roll => {
    distribution[roll.value] = (distribution[roll.value] || 0) + 1;
    sum += roll.value;
  });

  // Encontrar el valor más común
  const mostCommon = Object.entries(distribution)
    .reduce((a, b) => (b[1] > a[1] ? b : a))[0];

  return {
    total: history.length,
    average: sum / history.length,
    mostCommon: parseInt(mostCommon) as DiceValue,
    distribution
  };
}

/**
 * Valida si un número es un valor válido de dado
 */
export function isValidDiceValue(value: number): value is DiceValue {
  return DICE_VALUES.includes(value as DiceValue);
}