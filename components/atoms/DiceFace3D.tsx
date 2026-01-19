// components/atoms/DiceFace3D.tsx
import { DiceValue } from '@/types/dice.types';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { Asset } from 'expo-asset';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import * as THREE from 'three';

interface DiceFace3DProps {
  value: DiceValue;
  size?: number;
  isRolling?: boolean;
}

function DiceModel({ value, isRolling, modelUri }: { value: DiceValue; isRolling: boolean; modelUri: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelUri);
  const targetRotation = useRef<THREE.Euler>(new THREE.Euler(0, 0, 0));

  const rotations: Record<DiceValue, [number, number, number]> = {
    1: [0, 0, 0],
    2: [0, Math.PI / 2, 0],
    3: [0, Math.PI, 0],
    4: [0, -Math.PI / 2, 0],
    5: [Math.PI / 2, 0, 0],
    6: [-Math.PI / 2, 0, 0],
  };

  useEffect(() => {
    if (!isRolling) {
      const [x, y, z] = rotations[value];
      targetRotation.current.set(x, y, z);
    }
  }, [value, isRolling]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isRolling) {
      groupRef.current.rotation.x += delta * 8;
      groupRef.current.rotation.y += delta * 8;
      groupRef.current.rotation.z += delta * 4;
    } else {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x,
        0.1
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y,
        0.1
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotation.current.z,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

function Scene({ value, isRolling, modelUri }: { value: DiceValue; isRolling: boolean; modelUri: string }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      <DiceModel value={value} isRolling={isRolling} modelUri={modelUri} />
    </>
  );
}

// ID del asset - número que identifica el archivo
const DICE_MODEL = require('../../assets/diceset.glb');

export const DiceFace3D: React.FC<DiceFace3DProps> = ({
  value,
  size = 200,
  isRolling = false,
}) => {
  const [modelUri, setModelUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadModel() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Cargando modelo con ID:', DICE_MODEL);
        
        // Cargar el asset usando fromModule
        const asset = Asset.fromModule(DICE_MODEL);
        
        console.log('Asset creado:', asset);
        
        // Descargar el asset
        await asset.downloadAsync();
        
        console.log('Asset descargado. URI:', asset.uri);
        console.log('Local URI:', asset.localUri);
        
        // Usar localUri si está disponible, sino usar uri
        const uri = asset.localUri || asset.uri;
        
        if (!uri) {
          throw new Error('No se pudo obtener la URI del modelo');
        }
        
        console.log('URI final para GLTFLoader:', uri);
        setModelUri(uri);
      } catch (err) {
        console.error('Error completo:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }
    loadModel();
  }, []);

  if (loading) {
    return (
      <View style={{ width: size, height: size }} className="justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-400 text-xs mt-2">Cargando modelo 3D...</Text>
      </View>
    );
  }

  if (error || !modelUri) {
    return (
      <View style={{ width: size, height: size }} className="justify-center items-center p-5">
        <Text className="text-red-500 text-center text-xs">
          Error: {error || 'URI no disponible'}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
        <Scene value={value} isRolling={isRolling} modelUri={modelUri} />
      </Canvas>
    </View>
  );
};