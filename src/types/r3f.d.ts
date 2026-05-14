/// <reference types="@react-three/fiber" />

import type { Object3DNode, LightNode, MaterialNode } from "@react-three/fiber";
import type {
  AmbientLight,
  DirectionalLight,
  PointLight,
  Mesh,
  Group,
  Points,
  Line,
  BufferGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  PointsMaterial,
  LineBasicMaterial,
  TorusGeometry,
  SphereGeometry,
  BoxGeometry,
  PlaneGeometry,
  CapsuleGeometry,
} from "three";

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
      points: Object3DNode<Points, typeof Points>;
      line: any;

      // Geometries
      torusGeometry: any;
      sphereGeometry: any;
      boxGeometry: any;
      planeGeometry: any;
      capsuleGeometry: any;
      bufferGeometry: any;
      bufferAttribute: any;

      // Materials
      meshStandardMaterial: MaterialNode<MeshStandardMaterial, typeof MeshStandardMaterial>;
      meshBasicMaterial: any;
      pointsMaterial: any;
      lineBasicMaterial: any;
    }
  }
}

export {};
