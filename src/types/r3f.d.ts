/// <reference types="@react-three/fiber" />

// Augment global JSX namespace with R3F intrinsic elements
import type { Object3DNode, LightNode, MaterialNode } from "@react-three/fiber";
import type { AmbientLight, DirectionalLight, PointLight, Mesh, Group, MeshStandardMaterial, TorusGeometry } from "three";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            // Lights
            ambientLight: LightNode<AmbientLight, typeof AmbientLight>;
            directionalLight: LightNode<DirectionalLight, typeof DirectionalLight>;
            pointLight: LightNode<PointLight, typeof PointLight>;

            // Objects
            mesh: Object3DNode<Mesh, typeof Mesh>;
            group: Object3DNode<Group, typeof Group>;

            // Geometries
            torusGeometry: any;

            // Materials
            meshStandardMaterial: MaterialNode<MeshStandardMaterial, typeof MeshStandardMaterial>;
        }
    }
}

export { };
