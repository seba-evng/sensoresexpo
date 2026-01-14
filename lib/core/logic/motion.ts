// lib/core/logic/motion.ts
import { AccelerometerData, MotionDetectionResult, MotionThresholds } from '@/types/accelerometer.types';
/**
 * Calcula la magnitud del vector de aceleración
 * Usa el teorema de Pitágoras en 3D: √(x² + y² + z²)
 */
export function calculateMagnitude(data: AccelerometerData): number {
  return Math.sqrt(
    data.x * data.x + 
    data.y * data.y + 
    data.z * data.z
  );
}

/**
 * Detecta si el dispositivo está siendo sacudido
 * @param data - Datos del acelerómetro
 * @param thresholds - Umbrales de configuración
 * @param lastDetectionTime - Timestamp de la última detección
 * @returns Resultado de la detección
 */
export function detectShake(
  data: AccelerometerData,
  thresholds: MotionThresholds,
  lastDetectionTime: number = 0
): MotionDetectionResult {
  const now = Date.now();
  const magnitude = calculateMagnitude(data);
  
  // Verificar cooldown
  const isInCooldown = (now - lastDetectionTime) < thresholds.cooldownMs;
  
  // Detectar sacudida
  const isShaking = magnitude > thresholds.shakeThreshold && !isInCooldown;
  
  return {
    isShaking,
    magnitude,
    timestamp: now
  };
}

/**
 * Normaliza los valores del acelerómetro a un rango específico
 * Útil para visualizaciones
 */
export function normalizeAccelerometerData(
  data: AccelerometerData,
  maxRange: number = 1
): AccelerometerData {
  const magnitude = calculateMagnitude(data);
  
  if (magnitude === 0) return { x: 0, y: 0, z: 0 };
  
  const scale = maxRange / magnitude;
  
  return {
    x: data.x * scale,
    y: data.y * scale,
    z: data.z * scale
  };
}