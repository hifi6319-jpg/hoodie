'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Hoodie from './Hoodie'
import * as THREE from 'three'

function LightingSetup() {
    return (
        <>
            {/* Premium Studio Lighting - Soft and Diffused */}

            {/* Ambient base - warm and soft */}
            <ambientLight intensity={1.2} color="#f5f5f5" />

            {/* Key light - main soft light from top-front */}
            <directionalLight
                position={[8, 12, 8]}
                intensity={2.5}
                color="#ffffff"
                castShadow={false}
            />

            {/* Fill light - softens shadows from the left */}
            <directionalLight
                position={[-6, 8, 4]}
                intensity={1.8}
                color="#fafaff"
            />

            {/* Rim light - subtle back highlight for depth */}
            <directionalLight
                position={[0, 4, -8]}
                intensity={1.2}
                color="#ffffff"
            />

            {/* Soft bottom fill - prevents harsh bottom shadows */}
            <hemisphereLight
                intensity={0.8}
                color="#ffffff"
                groundColor="#444444"
            />
        </>
    )
}

function AnisotropyManager() {
    const { gl } = useThree()

    useEffect(() => {
        // Enable maximum anisotropic filtering for crisp textures
        const maxAnisotropy = gl.capabilities.getMaxAnisotropy()
        console.log('Max Anisotropy:', maxAnisotropy)
    }, [gl])

    return null
}

function ResponsiveCamera() {
    const { size } = useThree()
    const isMobile = size.width < 768
    const isSmallMobile = size.width < 480

    // Adjusted for larger, centered hoodie on mobile
    // Closer camera = larger model
    const targetZ = isSmallMobile ? 24 : isMobile ? 22 : 15
    const targetY = isMobile ? 1 : 0 // Centered vertical position
    const fov = isSmallMobile ? 40 : isMobile ? 38 : 35

    return (
        <PerspectiveCamera
            makeDefault
            position={[0, targetY, targetZ]}
            fov={fov}
            near={0.1}
            far={100}
            onUpdate={(c) => c.updateProjectionMatrix()}
        />
    )
}

export default function Scene({ onLoadingComplete }) {
    const [dpr, setDpr] = useState(1.5)

    return (
        <Canvas
            shadows={false}
            dpr={dpr}
            gl={{
                powerPreference: 'high-performance',
                antialias: true,
                stencil: false,
                depth: true,
                alpha: true
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
            onCreated={({ gl, scene }) => {
                // Make canvas transparent
                gl.setClearColor(0x000000, 0)

                // Notify when canvas is created
                if (onLoadingComplete) {
                    // Give textures time to load
                    setTimeout(() => {
                        onLoadingComplete()
                    }, 2000)
                }
            }}
        >
            {/* Performance Monitoring */}
            <PerformanceMonitor
                onIncline={() => setDpr(2)}
                onDecline={() => setDpr(1)}
            />

            {/* Adaptive DPR for mobile - Removed pixelated for smooth HD look */}
            <AdaptiveDpr />

            {/* Anisotropy Manager */}
            <AnisotropyManager />

            {/* Optimized Camera with Responsive Positioning */}
            <ResponsiveCamera />

            {/* Premium Studio Lighting */}
            <LightingSetup />

            {/* Model with Suspense for loading */}
            <Suspense fallback={null}>
                <Hoodie />

                {/* Contact Shadows - Baked for performance */}
                <ContactShadows
                    position={[0, -5, 0]}
                    opacity={0.25}
                    scale={40}
                    blur={3}
                    far={10}
                    frames={1}
                    color="#000000"
                />
            </Suspense>
        </Canvas>
    )
}
