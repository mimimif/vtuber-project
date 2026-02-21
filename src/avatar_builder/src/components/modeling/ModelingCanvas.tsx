import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useMotion } from '../../contexts/MotionContext';

function AvatarPreviewMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { motionData, isConnected } = useMotion();

    useFrame(() => {
        if (meshRef.current && isConnected && motionData.is_tracked) {
            // Apply 2D tracking parameters to the 3D mesh for visual feedback
            // Pitch (Up/Down)
            meshRef.current.rotation.x = THREE.MathUtils.degToRad(motionData.param_angle_x);
            // Yaw (Left/Right)
            meshRef.current.rotation.y = THREE.MathUtils.degToRad(motionData.param_angle_y);
            // Roll (Tilt)
            meshRef.current.rotation.z = THREE.MathUtils.degToRad(motionData.param_angle_z);
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 1, 0]}>
            <boxGeometry args={[1, 1.5, 1]} />
            <meshStandardMaterial color={isConnected && motionData.is_tracked ? "#10b981" : "#3b82f6"} />

            {/* Eye indicators */}
            <mesh position={[-0.25, 0.4, 0.51]}>
                <planeGeometry args={[0.3, 0.2 * (isConnected ? motionData.param_eye_l_open : 1)]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.25, 0.4, 0.51]}>
                <planeGeometry args={[0.3, 0.2 * (isConnected ? motionData.param_eye_r_open : 1)]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
        </mesh>
    );
}

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

                    <AvatarPreviewMesh />
                </Suspense>
            </Canvas>
        </div>
    );
}
