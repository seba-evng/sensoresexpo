// components/molecules/BurgerScene.tsx
import { BURGER_CONFIG, INGREDIENT_DEFINITIONS } from '@/lib/constants/burger';
import { Ingredient } from '@/types/burger.types';
import { Canvas } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { IngredientModel } from '../atoms/IngredientModel';

interface BurgerSceneProps {
  ingredients: Ingredient[];
  size?: number;
}

function Scene({ ingredients }: { ingredients: Ingredient[] }) {
  let currentY = BURGER_CONFIG.baseHeight;
  const positions: { id: string; type: any; yPosition: number }[] = [];

  ingredients.forEach((ingredient) => {
    positions.push({
      id: ingredient.id,
      type: ingredient.type,
      yPosition: currentY,
    });
    const def = INGREDIENT_DEFINITIONS[ingredient.type];
    currentY += def.height + BURGER_CONFIG.spacing;
  });

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.7} />
      <hemisphereLight groundColor="#444444" intensity={0.5} />

      {/* Renderizar ingredientes */}
      {positions.map((item) => (
        <IngredientModel
          key={item.id}
          type={item.type}
          yPosition={item.yPosition}
        />
      ))}
    </>
  );
}

export function BurgerScene({ ingredients, size = 300 }: BurgerSceneProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ width: size, height: size }}>
      <Canvas
        camera={{ 
          position: [4, 3, 12],  // Cámara diagonal y alejada
          fov: 35,               // Campo de visión más cerrado
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Scene ingredients={ingredients} />
      </Canvas>
      
      {loading && (
        <View className="absolute inset-0 justify-center items-center bg-gray-800/50">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-white text-sm mt-2">Cargando modelos...</Text>
        </View>
      )}
    </View>
  );
}