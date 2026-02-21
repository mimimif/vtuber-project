import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera, Grid } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useMotion } from '../../contexts/MotionContext';

function AvatarPreview2DMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { motionData, isConnected } = useMotion();

    // Create a 4x4 segmented plane for deformation
    const geometryRef = useRef<THREE.PlaneGeometry>(null);

    useFrame(() => {
        if (geometryRef.current && isConnected && motionData.is_tracked) {
            const positions = geometryRef.current.attributes.position;

            // Basic 2D Deformation (Pseudo-3D)
            // We loop through vertices and shift them based on face angles
            for (let i = 0; i < positions.count; i++) {
                // Original positions (rest pose) can be derived from index
                // Since it's a 4x4 plane, width/height is 1. x goes from -0.5 to 0.5
                const row = Math.floor(i / 5);
                const col = i % 5;

                const baseX = (col / 4) - 0.5;
                const baseY = (row / 4) - 0.5;

                // Apply deformation
                // param_angle_y (Yaw): Looking left/right. Range usually -30 to 30.
                // param_angle_x (Pitch): Looking up/down. Range usually -30 to 30.

                let dx = 0;
                let dy = 0;

                // Simulate "Depth" by moving the center of the face differently than edges
                const depthFactor = Math.cos(baseX * Math.PI) * Math.cos(baseY * Math.PI);

                // Shift X based on Yaw (left/right)
                dx = (motionData.param_angle_y / 30.0) * depthFactor * 0.2;

                // Shift Y based on Pitch (up/down)
                dy = (motionData.param_angle_x / 30.0) * depthFactor * 0.2;

                positions.setXY(i, baseX + dx, baseY + dy);
            }

            positions.needsUpdate = true;
        } else if (geometryRef.current && (!isConnected || !motionData.is_tracked)) {
            // Return to neutral
            const positions = geometryRef.current.attributes.position;
            for (let i = 0; i < positions.count; i++) {
                const row = Math.floor(i / 5);
                const col = i % 5;
                const baseX = (col / 4) - 0.5;
                const baseY = (row / 4) - 0.5;
                positions.setXY(i, baseX, baseY);
            }
            positions.needsUpdate = true;
        }
    });

    return (
        <group>
            {/* 2D Face Mesh */}
            <mesh ref={meshRef} position={[0, 0, 0]} scale={[2, 2, 1]}>
                <planeGeometry ref={geometryRef} args={[1, 1, 4, 4]} />
                <meshBasicMaterial
                    color={isConnected && motionData.is_tracked ? "#10b981" : "#3b82f6"}
                    wireframe={true} // Wireframe makes it easy to see deformation
                />
            </mesh>

            {/* 2D Eye Left */}
            <mesh position={[-0.4, 0.2, 0.01]} scale={[0.3, 0.2 * (isConnected ? Math.max(0.1, motionData.param_eye_l_open) : 1), 1]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* 2D Eye Right */}
            <mesh position={[0.4, 0.2, 0.01]} scale={[0.3, 0.2 * (isConnected ? Math.max(0.1, motionData.param_eye_r_open) : 1), 1]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial color="#ffffff" />
            </mesh>
        </group>
    );
}

// Control component to easily pan the 2D orthographic camera
function CameraController() {
    const { camera, gl } = useThree();
    useEffect(() => {
        // Basic panning logic could be added here later
    }, [camera, gl]);
    return null;
}

export default function ModelingCanvas() {
    return (
        <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 relative">
            <Canvas>
                <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={200} />

                <Suspense fallback={null}>
                    <color attach="background" args={['#111827']} />
                    <ambientLight intensity={1} />
                    <Grid infiniteGrid fadeDistance={50} sectionColor="#444" cellColor="#222" rotation={[Math.PI / 2, 0, 0]} />

                    <AvatarPreview2DMesh />
                    <CameraController />
                </Suspense>
            </Canvas>
        </div>
    );
}
