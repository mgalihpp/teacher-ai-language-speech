"use client";

import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { Leva } from "leva";
import {
  Environment,
  Gltf,
  Float,
  Html,
  Loader,
  useGLTF,
} from "@react-three/drei";
import TypingBox from "./typing-box";
import { Canvas } from "@react-three/fiber";
import { Suspense, memo } from "react";
import { itemPlacement } from "@/constants";
import { Teacher } from "./teacher";
import { degToRad } from "three/src/math/MathUtils.js";
import MessagesList from "./messages-list";
import BoardSettings from "./board-settings";
import CameraManager from "./camera-manager";

const Experience = ({ credits }: { credits: number | null }) => {
  const { teacher, classroom } = useAiTeacher();

  return (
    <>
      <div
        className="fixed bottom-4 left-4 right-4 z-10 flex flex-wrap justify-stretch 
      gap-3 md:justify-center
      "
      >
        <TypingBox credits={credits} />
      </div>
      <Leva hidden />
      <Loader />
      <Canvas
        camera={{
          position: [0, 0, 0.0001],
        }}
        className="z-[1]"
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
              <BoardSettings />
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

useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");

export default memo(Experience);
