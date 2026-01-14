// lib/modules/sensors/accelerometer.service.ts

import { AccelerometerData } from '@/types/accelerometer.types';
import { Accelerometer } from 'expo-sensors';

/**
 * Servicio para interactuar con el acelerómetro del dispositivo
 */
class AccelerometerService {
  private subscription: { remove: () => void } | null = null;
  private isAvailable: boolean | null = null;

  /**
   * Verifica si el acelerómetro está disponible en el dispositivo
   */
  async checkAvailability(): Promise<boolean> {
    if (this.isAvailable !== null) {
      return this.isAvailable;
    }

    try {
      this.isAvailable = await Accelerometer.isAvailableAsync();
      return this.isAvailable;
    } catch (error) {
      console.error('Error checking accelerometer availability:', error);
      this.isAvailable = false;
      return false;
    }
  }

  /**
   * Inicia la escucha del acelerómetro
   * @param callback - Función que recibe los datos del sensor
   * @param updateInterval - Intervalo de actualización en ms
   */
  start(
    callback: (data: AccelerometerData) => void,
    updateInterval: number = 100
  ): void {
    // Detener suscripción anterior si existe
    this.stop();

    // Configurar intervalo de actualización
    Accelerometer.setUpdateInterval(updateInterval);

    // Iniciar suscripción
    this.subscription = Accelerometer.addListener((accelerometerData) => {
      const data: AccelerometerData = {
        x: accelerometerData.x,
        y: accelerometerData.y,
        z: accelerometerData.z,
        timestamp: Date.now(),
      };
      callback(data);
    });
  }

  /**
   * Detiene la escucha del acelerómetro
   */
  stop(): void {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
  }

  /**
   * Verifica si el servicio está actualmente escuchando
   */
  isListening(): boolean {
    return this.subscription !== null;
  }
}

// Exportar instancia única (Singleton)
export const accelerometerService = new AccelerometerService();