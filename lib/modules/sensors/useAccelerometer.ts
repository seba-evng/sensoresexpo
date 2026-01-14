// lib/modules/sensors/useAccelerometer.ts

import { ACCELEROMETER_CONFIG, MOTION_THRESHOLDS } from '@/lib/constants';
import { detectShake } from '@/lib/core/logic/motion';
import { AccelerometerData, MotionDetectionResult } from '@/types/accelerometer.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { accelerometerService } from './accelerometer.service';

interface UseAccelerometerOptions {
  updateInterval?: number;
  onShake?: () => void;
  enabled?: boolean;
}

interface UseAccelerometerReturn {
  data: AccelerometerData;
  isActive: boolean;
  isAvailable: boolean;
  motionResult: MotionDetectionResult | null;
  start: () => void;
  stop: () => void;
  toggle: () => void;
}

/**
 * Hook personalizado para usar el acelerómetro con detección de sacudidas
 */
export function useAccelerometer(
  options: UseAccelerometerOptions = {}
): UseAccelerometerReturn {
  const {
    updateInterval = ACCELEROMETER_CONFIG.updateInterval,
    onShake,
    enabled = true,
  } = options;

  const [data, setData] = useState<AccelerometerData>({ x: 0, y: 0, z: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [motionResult, setMotionResult] = useState<MotionDetectionResult | null>(null);
  
  const lastDetectionTimeRef = useRef(0);

  // Verificar disponibilidad al montar
  useEffect(() => {
    accelerometerService.checkAvailability().then(setIsAvailable);
  }, []);

  // Callback para procesar datos del acelerómetro
  const handleAccelerometerData = useCallback(
    (newData: AccelerometerData) => {
      setData(newData);

      // Detectar sacudida
      const result = detectShake(
        newData,
        MOTION_THRESHOLDS,
        lastDetectionTimeRef.current
      );

      setMotionResult(result);

      // Si se detectó sacudida, ejecutar callback
      if (result.isShaking) {
        lastDetectionTimeRef.current = result.timestamp;
        onShake?.();
      }
    },
    [onShake]
  );

  // Función para iniciar el sensor
  const start = useCallback(() => {
    if (!isAvailable) {
      console.warn('Accelerometer is not available on this device');
      return;
    }

    accelerometerService.start(handleAccelerometerData, updateInterval);
    setIsActive(true);
  }, [isAvailable, handleAccelerometerData, updateInterval]);

  // Función para detener el sensor
  const stop = useCallback(() => {
    accelerometerService.stop();
    setIsActive(false);
    setData({ x: 0, y: 0, z: 0 });
    setMotionResult(null);
  }, []);

  // Función para alternar el estado
  const toggle = useCallback(() => {
    if (isActive) {
      stop();
    } else {
      start();
    }
  }, [isActive, start, stop]);

  // Auto-iniciar si está habilitado
  useEffect(() => {
    if (enabled && isAvailable) {
      start();
    }

    // Cleanup al desmontar
    return () => {
      stop();
    };
  }, [enabled, isAvailable]); // Removidos start y stop para evitar loops

  return {
    data,
    isActive,
    isAvailable,
    motionResult,
    start,
    stop,
    toggle,
  };
}