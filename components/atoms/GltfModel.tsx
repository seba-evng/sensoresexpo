// components/atoms/GltfModel.tsx
import { Gltf } from '@react-three/drei/native';
import React from 'react';

interface GltfModelProps {
  modelSource: any;
  position: [number, number, number];
  scale?: number;
}

export function GltfModel({ modelSource, position, scale = 0.5 }: GltfModelProps) {
//   const [modelUri, setModelUri] = useState<string | null>(null);

//   useEffect(() => {
//     async function loadModel() {
//       try {
//         const asset = Asset.fromModule(modelSource);
//         await asset.downloadAsync();
//         const uri = asset.localUri || asset.uri;
//         if (uri) {
//           setModelUri(uri);
//         }
//       } catch (error) {
//         console.error('Error loading model:', error);
//       }
//     }
//     loadModel();
//   }, [modelSource]);

//   if (!modelUri) return null;

//   const { scene } = useGLTF(modelUri);

//   return (
//     <group position={position}>
//       <Center top bottom={false}>
//         <primitive object={scene.clone()} scale={scale} />
//       </Center>
//     </group>

return <Gltf src={modelSource} position={position} scale={scale} />
  
}