// components/atoms/IngredientModel.tsx
import { INGREDIENT_DEFINITIONS } from '@/lib/constants/burger';
import { IngredientType } from '@/types/burger.types';
import { Center, useGLTF } from '@react-three/drei';
import { Asset } from 'expo-asset';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface IngredientModelProps {
  type: IngredientType;
  yPosition: number;
}

// Escala específica por tipo de ingrediente
const scaleByType: Record<IngredientType, number> = {
  'pan-inferior': 0.5,
  'carne': 0.5,
  'queso': 0.5,
  'lechuga': 0.5,
  'pan-superior': 0.5,
};

export function IngredientModel({ type, yPosition }: IngredientModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [modelUri, setModelUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const ingredient = INGREDIENT_DEFINITIONS[type];

  useEffect(() => {
    async function loadModel() {
      try {
        setLoading(true);
        console.log(`🍔 Cargando modelo: ${type}`);
        
        const asset = Asset.fromModule(ingredient.modelPath);
        await asset.downloadAsync();
        
        const uri = asset.localUri || asset.uri;
        
        if (!uri) {
          throw new Error(`No se pudo obtener la URI del modelo ${type}`);
        }
        
        console.log(`✅ Modelo ${type} cargado`);
        setModelUri(uri);
      } catch (error) {
        console.error(`❌ Error loading ${type} model:`, error);
      } finally {
        setLoading(false);
      }
    }
    loadModel();
  }, [type]);

  if (loading || !modelUri) return null;

  const { scene } = useGLTF(modelUri);

  return (
    <group ref={groupRef} position={[0, yPosition, 0]}>
      <Center top bottom={false}>
        <primitive 
          object={scene.clone()} 
          scale={scaleByType[type]} 
        />
      </Center>
    </group>
  );
}