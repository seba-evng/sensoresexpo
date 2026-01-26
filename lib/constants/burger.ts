// lib/constants/burger.ts
import { IngredientDefinition, IngredientType } from '@/types/burger.types';
import carne from '../../assets/burgers/carne.glb';
import lechuga from '../../assets/burgers/lechuga.glb';
import panInferior from '../../assets/burgers/paninferior.glb';
import panSuperior from '../../assets/burgers/pansuperior.glb';
import queso from '../../assets/burgers/queso.glb';

export const INGREDIENT_DEFINITIONS: Record<IngredientType, IngredientDefinition> = {
  'pan-inferior': {
    type: 'pan-inferior',
    name: 'Pan Inferior',
    color: '#d97706',
    icon: '🍞',
    modelPath: panInferior,
    height: 0.2, // Ajusta según el tamaño real de tu modelo
  },
  'carne': {
    type: 'carne',
    name: 'Carne',
    color: '#92400e',
    icon: '🥩',
    modelPath: carne,
    height: 0.15,
  },
  'queso': {
    type: 'queso',
    name: 'Queso',
    color: '#fbbf24',
    icon: '🧀',
    modelPath: queso,
    height: 0.1,
  },
  'lechuga': {
    type: 'lechuga',
    name: 'Lechuga',
    color: '#65a30d',
    icon: '🥬',
    modelPath: lechuga,
    height: 0.12, // Ajusta este valor
  },
  'pan-superior': {
    type: 'pan-superior',
    name: 'Pan Superior',
    color: '#d97706',
    icon: '🍔',
    modelPath: panSuperior,
    height: 0.2,
  },
};

export const AVAILABLE_INGREDIENTS: IngredientType[] = [
  'carne',
  'queso',
  'lechuga',
];

export const BURGER_CONFIG = {
  baseHeight: 0,
  spacing: 0.01, // Reduce o aumenta el espacio entre ingredientes
} as const;