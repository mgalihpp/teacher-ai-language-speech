/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { Leva, button, useControls } from "leva";
import {
  CameraControls,
  Environment,
  Gltf,
  Float,
  Html,
  Loader,
  useGLTF,
} from "@react-three/drei";
import TypingBox from "./typing-box";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, Suspense } from "react";
import { CAMERA_POSITION, CAMERA_ZOOMS, itemPlacement } from "@/constants";
import { Teacher } from "./teacher";
import { degToRad } from "three/src/math/MathUtils.js";
import MessagesList from "./messages-list";

export const Experience = () => {
  const { teacher, classroom } = useAiTeacher();

  return (
    <>
      <div
        className="fixed bottom-4 left-4 right-4 z-10 flex flex-wrap justify-stretch 
      gap-3 md:justify-center
      "
      >
        <TypingBox />
      </div>
      <Leva hidden />
      <Loader />
      <Canvas
        camera={{
          position: [0, 0, 0.0001],
        }}
      >
        <CameraManager />

        <Suspense>
          <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
            <Html
              transform
              {...itemPlacement[classroom].board}
              distanceFactor={1}
            >
              <MessagesList />
              {/* <BoardSettings /> */}
            </Html>
            <Environment preset="sunset" />
            <ambientLight intensity={0.8} color="pink" />

            <Gltf
              src={`/models/classroom_${classroom}.glb`}
              {...itemPlacement[classroom].classroom}
            />
            <Teacher
              teacher={teacher}
              key={teacher}
              {...itemPlacement[classroom].teacher}
              scale={1.5}
              rotationY={degToRad(20)}
            />
          </Float>
        </Suspense>
      </Canvas>
    </>
  );
};

const CameraManager = () => {
  const controls = useRef<CameraControls | null>(null);
  const { loading, currentMessage } = useAiTeacher();

  useEffect(() => {
    if (loading) {
      controls.current?.setPosition(...CAMERA_POSITION.loading, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
    } else if (currentMessage) {
      controls.current?.setPosition(...CAMERA_POSITION.speaking, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
    }
  }, [currentMessage, loading]);

  useControls("Helper", {
    getCameraPosition: button(() => {
      const camera = controls.current?.camera;
      if (camera) {
        const position = camera.position;
        const zoom = camera.zoom;
        console.log([...position], zoom);
      }
    }),
  });

  return (
    <CameraControls
      ref={controls}
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-0.3}
      azimuthRotateSpeed={-0.3}
      mouseButtons={{
        left: 1,
        middle: 0,
        right: 0,
        wheel: 16,
      }}
      touches={{
        one: 32,
        two: 512,
        three: 1024,
      }}
    />
  );
};

useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");
