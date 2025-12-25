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
    const [fbx, setFbx] = useState(null)
    const [textures, setTextures] = useState({ diffuse: null, normal: null, roughness: null })

    // 1. Setup Loading Manager to handle the <UDIM> textures internal to FBX
    const manager = useMemo(() => {
        const m = new THREE.LoadingManager()
        m.setURLModifier((url) => {
            if (url.includes('<UDIM>') || url.includes('%3CUDIM%3E')) {
                return url.replace(/<UDIM>|%3CUDIM%3E/g, '1001')
            }
            return url
        })
        return m
    }, [])

    // 2. Load FBX and Textures
    useEffect(() => {
        const fbxLoader = new FBXLoader(manager)
        const texLoader = new THREE.TextureLoader(manager)

        // Load FBX
        fbxLoader.load('/models/hoodie.fbx', (obj) => {
            console.log("FBX Model Loaded")
            setFbx(obj)
        })

        // Load Textures explicitly for our premium material
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
    }, [manager])

    // 3. Simple red material for verification
    const fabricMaterial = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: 'red',
            roughness: 0.5,
            metalness: 0,
        })
    }, [])

    // Update material when textures load
    useLayoutEffect(() => {
        // if (textures.diffuse) {
        //     fabricMaterial.map = textures.diffuse
        //     fabricMaterial.normalMap = textures.normal
        //     fabricMaterial.roughnessMap = textures.roughness
        //     fabricMaterial.needsUpdate = true
        // }
    }, [textures, fabricMaterial])

    // Update color from store
    useLayoutEffect(() => {
        gsap.to(fabricMaterial.color, {
            r: new THREE.Color(color).r,
            g: new THREE.Color(color).g,
            b: new THREE.Color(color).b,
            duration: 0.8,
            ease: 'power2.out'
        })
    }, [color, fabricMaterial])

    // 4. Model Normalization
    useLayoutEffect(() => {
        if (!fbx) return

        const box = new THREE.Box3().setFromObject(fbx)
        const size = new THREE.Vector3()
        box.getSize(size)
        const center = new THREE.Vector3()
        box.getCenter(center)

        console.log("FBX Scaling to 10 units")

        // Offset the model inside the group
        fbx.position.set(-center.x, -center.y, -center.z)

        // Scale to fit (10 units for more impact)
        const maxDim = Math.max(size.x, size.y, size.z)
        console.log("FBX Raw Size:", size, "maxDim:", maxDim)

        if (maxDim > 0) {
            const scale = 5 / maxDim // Scale to 5 units instead of 10
            fbx.scale.setScalar(scale)
            console.log("FBX Applied Scale:", scale)
        }

        fbx.traverse((child) => {
            if (child.isMesh) {
                console.log("Found mesh:", child.name)
                child.material = fabricMaterial
                child.material.color.set('red') // Force red for debugging
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }, [fbx, fabricMaterial])

    // 5. Scroll Interaction (Pinned behavior is managed by CSS/Layout, but we sync color)
    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
            }
        })

        tl.to(fabricMaterial.color, {
            r: new THREE.Color('#3b82f6').r,
            g: new THREE.Color('#3b82f6').g,
            b: new THREE.Color('#3b82f6').b,
            duration: 1
        })
            .to(fabricMaterial.color, {
                r: new THREE.Color('#f43f5e').r,
                g: new THREE.Color('#f43f5e').g,
                b: new THREE.Color('#f43f5e').b,
                duration: 1
            })
    }, [fabricMaterial])

    useFrame((state) => {
        if (group.current) {
            // No animation for now
            group.current.position.y = 0
            group.current.rotation.y = state.clock.elapsedTime * 0.2
        }
    })

    if (!fbx) return null

    return (
        <group ref={group}>
            <primitive object={fbx} />
        </group>
    )
}
