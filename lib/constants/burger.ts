// lib/constants/burger.ts
import { IngredientDefinition, IngredientType } from '@/types/burger.types';

const MODELS = {
  panInferior: require('../../assets/burgers/paninferior.glb'),
  carne: require('../../assets/burgers/carne.glb'),
  queso: require('../../assets/burgers/queso.glb'),
  lechuga: require('../../assets/burgers/lechuga.glb'),
  panSuperior: require('../../assets/burgers/pansuperior.glb'),
};

export const INGREDIENT_DEFINITIONS: Record<IngredientType, IngredientDefinition> = {
  'pan-inferior': {
    type: 'pan-inferior',
    name: 'Pan Inferior',
    color: '#d97706',
    icon: '🍞',
    modelPath: MODELS.panInferior,
    height: 0.15,
  },
  'carne': {
    type: 'carne',
    name: 'Carne',
    color: '#92400e',
    icon: '🥩',
    modelPath: MODELS.carne,
    height: 0.12,
  },
  'queso': {
    type: 'queso',
    name: 'Queso',
    color: '#fbbf24',
    icon: '🧀',
    modelPath: MODELS.queso,
    height: 0.08,
  },
  'lechuga': {
    type: 'lechuga',
    name: 'Lechuga',
    color: '#65a30d',
    icon: '🥬',
    modelPath: MODELS.lechuga,
    height: 0.10,
  },
  'pan-superior': {
    type: 'pan-superior',
    name: 'Pan Superior',
    color: '#d97706',
    icon: '🍔',
    modelPath: MODELS.panSuperior,
    height: 0.15,
  },
};

export const AVAILABLE_INGREDIENTS: IngredientType[] = [
  'carne',
  'queso',
  'lechuga',
];

export const BURGER_CONFIG = {
  baseHeight: 0,
  spacing: 0.02,
} as const;