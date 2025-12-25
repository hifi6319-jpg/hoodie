'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import Hoodie from './Hoodie'

export default function Scene() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 40 }}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Visual debug sphere */}
                <mesh position={[2, 2, 0]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="red" />
                </mesh>

                {/* Normal Lighting Setup */}
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 10]} intensity={2} />
                <pointLight position={[-10, -10, 10]} intensity={2} />

                <Suspense fallback={null}>
                    <Hoodie />
                </Suspense>
                {/* Lock controls to prevent user messing up the view */}
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
        </div>
    )
}
