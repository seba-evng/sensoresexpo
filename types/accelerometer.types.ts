// types/accelerometer.types.ts
export interface AccelerometerData {
    x: number;
    y: number;
    z: number;
    timestamp?: number;
  }
  
  export interface MotionThresholds {
    shakeThreshold: number;      // Umbral para detectar sacudida
    cooldownMs: number;           // Tiempo entre detecciones
  }
  
  export interface MotionDetectionResult {
    isShaking: boolean;
    magnitude: number;
    timestamp: number;
  }