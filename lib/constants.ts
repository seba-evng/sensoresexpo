// lib/constants.ts
import { MotionThresholds } from '@/types/accelerometer.types';

/**
 * Configuración del acelerómetro
 */
export const ACCELEROMETER_CONFIG = {
  updateInterval: 100, // ms - Frecuencia de actualización
} as const;

/**
 * Umbrales para detección de movimiento
 * shakeThreshold: Mayor valor = necesita más fuerza para detectar
 * cooldownMs: Tiempo mínimo entre detecciones para evitar múltiples disparos
 */
export const MOTION_THRESHOLDS: MotionThresholds = {
  shakeThreshold: 2.5,  // Ajustar según sensibilidad deseada (1.5 - 3.5)
  cooldownMs: 1000,     // 1 segundo entre lanzamientos
} as const;

/**
 * Configuración de animación del dado
 */
export const DICE_ANIMATION = {
  rollingDuration: 800,  // ms - Duración de la animación
  rollingSteps: 12,      // Número de cambios durante animación
} as const;

/**
 * Valores del dado
 */
export const DICE_VALUES = [1, 2, 3, 4, 5, 6] as const;

/**
 * Colores del tema
 */
export const COLORS = {
  dice: {
    background: '#1f2937',  // gray-800
    active: '#3b82f6',      // blue-500
    rolling: '#8b5cf6',     // purple-500
  },
  status: {
    active: '#10b981',      // green-500
    inactive: '#6b7280',    // gray-500
  }
} as const;