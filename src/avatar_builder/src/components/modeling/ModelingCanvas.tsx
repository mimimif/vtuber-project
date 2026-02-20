import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { Suspense } from 'react';

export default function ModelingCanvas() {
    return (
        <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
            <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#111827']} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    <Grid
                        renderOrder={-1}
                        position={[0, 0, 0]}
                        infiniteGrid
                        fadeDistance={20}
                        fadeStrength={5}
                        cellColor="#4b5563"
                        sectionColor="#6b7280"
                    />

                    <Environment preset="city" />

                    <OrbitControls
                        makeDefault
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 1.5}
                    />

                    {/* Placeholder Mesh */}
                    <mesh position={[0, 1, 0]}>
                        <boxGeometry args={[1, 2, 1]} />
                        <meshStandardMaterial color="#3b82f6" />
                    </mesh>
                </Suspense>
            </Canvas>
        </div>
    );
}
