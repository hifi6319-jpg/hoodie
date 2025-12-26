'use client'

import { useFrame } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useLayoutEffect, useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStore } from '../../store'

gsap.registerPlugin(ScrollTrigger)

export default function Hoodie() {
    const group = useRef()
    const { color } = useStore()

    // 1. Setup Global Loading Manager for Drei Loader compatibility
    const [fbx, setFbx] = useState(null)
    const [textures, setTextures] = useState({ diffuse: null, normal: null, roughness: null })

    useLayoutEffect(() => {
        THREE.DefaultLoadingManager.setURLModifier((url) => {
            if (url.includes('<UDIM>') || url.includes('%3CUDIM%3E')) {
                return url.replace(/<UDIM>|%3CUDIM%3E/g, '1001')
            }
            return url
        })
    }, [])

    // 2. Load FBX and Textures using DefaultLoadingManager
    useEffect(() => {
        const manager = THREE.DefaultLoadingManager
        const fbxLoader = new FBXLoader(manager)
        const texLoader = new THREE.TextureLoader(manager)

        // Load FBX
        fbxLoader.load('/models/hoodie.fbx', (obj) => {
            console.log("FBX Model Loaded Successfully")
            setFbx(obj)
        }, (progress) => {
            console.log(`Loading FBX: ${(progress.loaded / progress.total * 100).toFixed(2)}%`)
        }, (err) => {
            console.error("FBX Load Error:", err)
        })

        // Load Textures
        Promise.all([
            texLoader.loadAsync('/models/hoodie_diffuse_1001.png'),
            texLoader.loadAsync('/models/hoodie_normal_1001.png'),
            texLoader.loadAsync('/models/hoodie_roughness_1001.png')
        ]).then(([d, n, r]) => {
            d.flipY = false
            n.flipY = false
            r.flipY = false
            setTextures({ diffuse: d, normal: n, roughness: r })
            console.log("Textures Loaded Successfully")
        }).catch(err => console.error("Texture Load Error:", err))
    }, [])

    // 3. Create ultra-matte fabric material (No gloss, pure cotton/fleece)
    const fabricMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 1.0,       // Maximum matte - no gloss at all
            metalness: 0.0,       // Zero metallic
            side: THREE.DoubleSide,
            envMapIntensity: 0.0, // No environment reflections
            flatShading: false,   // Smooth shading
        })
    }, [])

    // Apply textures with proper filtering to prevent rendering lines
    useLayoutEffect(() => {
        if (textures.diffuse) {
            // Configure texture filtering to prevent artifacts/lines
            textures.diffuse.anisotropy = 16 // Maximum anisotropic filtering
            textures.diffuse.minFilter = THREE.LinearMipmapLinearFilter
            textures.diffuse.magFilter = THREE.LinearFilter

            textures.normal.anisotropy = 16
            textures.normal.minFilter = THREE.LinearMipmapLinearFilter
            textures.normal.magFilter = THREE.LinearFilter

            textures.roughness.anisotropy = 16
            textures.roughness.minFilter = THREE.LinearMipmapLinearFilter
            textures.roughness.magFilter = THREE.LinearFilter

            fabricMaterial.map = textures.diffuse
            fabricMaterial.normalMap = textures.normal
            fabricMaterial.roughnessMap = textures.roughness
            fabricMaterial.needsUpdate = true
        }
    }, [textures, fabricMaterial])

    // Update color from store smoothly
    useLayoutEffect(() => {
        gsap.to(fabricMaterial.color, {
            r: new THREE.Color(color).r,
            g: new THREE.Color(color).g,
            b: new THREE.Color(color).b,
            duration: 0.8,
            ease: 'power2.out'
        })
    }, [color, fabricMaterial])

    // 4. Model Position and Scale Optimization
    useLayoutEffect(() => {
        if (!fbx) return

        // Calculate bounds
        const box = new THREE.Box3().setFromObject(fbx)
        const size = new THREE.Vector3()
        box.getSize(size)
        const center = new THREE.Vector3()
        box.getCenter(center)

        const maxDim = Math.max(size.x, size.y, size.z)
        console.log("Model Stats -> Size:", size, "Center:", center, "maxDim:", maxDim)

        // Scale to 7.0 units for a smaller "Medium" presence
        if (maxDim > 0) {
            const scale = 7.0 / maxDim
            fbx.scale.setScalar(scale)
            // Center the model relative to its own geometry, perfectly centered in view
            fbx.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
        }

        fbx.traverse((child) => {
            if (child.isMesh) {
                child.material = fabricMaterial
                child.castShadow = true
                child.receiveShadow = true
                child.frustumCulled = false // Ensure it's never culled for visibility debugging
            }
        })
    }, [fbx, fabricMaterial])

    // 5. Scroll Animation (Sync color changes to background/UI) - All Ultra Matte
    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#scroll-container',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true,
            }
        })

        // All colors maintain ultra-matte finish (roughness: 1.0, metalness: 0.0)
        // No material property changes - only color transitions

        // At 33% scroll -> Snap to Purple (Void)
        tl.to(fabricMaterial.color, {
            r: new THREE.Color('#8a2be2').r,
            g: new THREE.Color('#8a2be2').g,
            b: new THREE.Color('#8a2be2').b,
            duration: 0.1,
            ease: "power2.inOut"
        }, 0.33)

        // At 66% scroll -> Snap to Red (Rose)
        tl.to(fabricMaterial.color, {
            r: new THREE.Color('#f43f5e').r,
            g: new THREE.Color('#f43f5e').g,
            b: new THREE.Color('#f43f5e').b,
            duration: 0.1,
            ease: "power2.inOut"
        }, 0.66)
    }, [fabricMaterial])

    // 6. Entry Animation - Slide Up to Center
    useLayoutEffect(() => {
        if (group.current) {
            gsap.from(group.current.position, {
                y: -10,
                duration: 1.5,
                ease: 'power3.out'
            })
            gsap.from(group.current.rotation, {
                y: Math.PI / 2,
                duration: 1.5,
                ease: 'power3.out'
            })
        }
    }, [fbx])

    if (!fbx) return null

    return (
        <group ref={group}>
            <primitive object={fbx} />
        </group>
    )
}
