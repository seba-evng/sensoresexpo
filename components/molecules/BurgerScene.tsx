// components/molecules/BurgerScene.tsx
import { BURGER_CONFIG, INGREDIENT_DEFINITIONS } from '@/lib/constants/burger';
import { Ingredient } from '@/types/burger.types';
import { OrbitControls } from '@react-three/drei/native';
import { Canvas } from '@react-three/fiber/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { GltfModel } from '../atoms/GltfModel';

interface BurgerSceneProps {
  ingredients: Ingredient[];
  size?: number;
}

function Scene({ ingredients }: { ingredients: Ingredient[] }) {
  // Calcular posiciones Y para cada ingrediente (apilamiento)
  const calculateYPosition = (index: number): number => {
    let yPosition = BURGER_CONFIG.baseHeight;
    
    // Sumar las alturas de todos los ingredientes anteriores
    for (let i = 0; i < index; i++) {
      const ingredientDef = INGREDIENT_DEFINITIONS[ingredients[i].type];
      yPosition += (ingredientDef.height + BURGER_CONFIG.spacing);
    }
    
    console.log(`Ingrediente ${index} (${ingredients[index].type}): Y=${yPosition}`);
    
    return yPosition;
  };

  return (
    <>
      {/* Iluminación */}
      <ambientLight intensity={0.8} />
      <OrbitControls enableZoom={true} enablePan={true} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 10, -5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.7} />
      <hemisphereLight groundColor="#444444" intensity={0.5} />
      
      {/* Renderizar cada ingrediente apilado y centrado */}
      {ingredients.map((ingredient, index) => {
        const ingredientDef = INGREDIENT_DEFINITIONS[ingredient.type];
        const yPosition = calculateYPosition(index);
        
        return (
          <GltfModel
            key={ingredient.id}
            modelSource={ingredientDef.modelPath}
            position={[0, yPosition, 0]}
            scale={0.5}
          />
        );
      })}
    </>
  );
}

export function BurgerScene({ ingredients, size = 300 }: BurgerSceneProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log('🍔 Total ingredientes:', ingredients.length);
  console.log('📋 Lista:', ingredients.map(i => i.type));

  return (
    <View style={{ width: size, height: size }}>
      <Canvas
        camera={{ 
          position: [4, 2, 10],
          fov: 40,
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