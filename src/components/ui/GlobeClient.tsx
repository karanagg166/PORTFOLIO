"use client";

import { useEffect, useRef } from "react";
import ThreeGlobe from "three-globe";
import * as THREE from "three";

export default function GlobeClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<ThreeGlobe | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 200;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(400, 400);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);

        // Create globe with dark blue atmosphere
        const globe = new ThreeGlobe()
            .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
            .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
            .atmosphereColor("#00d4ff")
            .atmosphereAltitude(0.2);

        // Add arcs for global connections - Updated colors
        const arcsData = [
            { startLat: 28.6139, startLng: 77.2090, endLat: 37.7749, endLng: -122.4194 }, // Delhi to SF
            { startLat: 28.6139, startLng: 77.2090, endLat: 51.5074, endLng: -0.1278 },   // Delhi to London
            { startLat: 28.6139, startLng: 77.2090, endLat: 35.6762, endLng: 139.6503 },  // Delhi to Tokyo
            { startLat: 28.6139, startLng: 77.2090, endLat: 1.3521, endLng: 103.8198 },   // Delhi to Singapore
            { startLat: 28.6139, startLng: 77.2090, endLat: -33.8688, endLng: 151.2093 }, // Delhi to Sydney
        ];

        globe.arcsData(arcsData)
            .arcColor(() => "#00d4ff")
            .arcStroke(0.6)
            .arcDashLength(0.5)
            .arcDashGap(0.2)
            .arcDashAnimateTime(2500);

        // Add points - Updated with dark blue accent
        const pointsData = [
            { lat: 28.6139, lng: 77.2090, size: 0.12, color: "#00d4ff" }, // Delhi (Home)
            { lat: 37.7749, lng: -122.4194, size: 0.06, color: "#1e3a5f" },
            { lat: 51.5074, lng: -0.1278, size: 0.06, color: "#1e3a5f" },
            { lat: 35.6762, lng: 139.6503, size: 0.06, color: "#1e3a5f" },
            { lat: 1.3521, lng: 103.8198, size: 0.06, color: "#1e3a5f" },
            { lat: -33.8688, lng: 151.2093, size: 0.06, color: "#1e3a5f" },
        ];

        globe.pointsData(pointsData)
            .pointAltitude("size")
            .pointColor("color");

        scene.add(globe);
        globeRef.current = globe;

        // Lighting - Adjusted for darker theme
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x1e3a5f, 0.5);
        pointLight.position.set(-1, -1, 1);
        scene.add(pointLight);

        // Animation
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            globe.rotation.y += 0.002;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center"
            style={{ width: "100%", height: "400px" }}
        />
    );
}
