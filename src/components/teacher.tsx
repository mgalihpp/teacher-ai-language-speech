import { ANIMATION_FADE_TIME, TEACHERS } from "@/constants";
import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { MathUtils, MeshStandardMaterial, SkinnedMesh } from "three";
import { randInt } from "three/src/math/MathUtils.js";

interface TeacherProps {
  teacher: Teacher;
  scale: number;
  rotationY: number;
  position: readonly [number, number, number];
}

export const Teacher: React.FC<TeacherProps> = ({ teacher, ...props }) => {
  const group = useRef(null);
  const { scene } = useGLTF(`/models/Teacher_${teacher}.glb`);
  const { loading, currentMessage } = useAiTeacher();

  useEffect(() => {
    scene.traverse((child) => {
      if (
        child instanceof SkinnedMesh &&
        child.material instanceof MeshStandardMaterial
      ) {
        child.material = new MeshStandardMaterial({
          map: child.material.map,
        });
      }
    });
  }, [scene]);

  const [thinkingText, setThinkingText] = useState(".");
  const { animations } = useGLTF(`/models/animations_${teacher}.glb`);
  const { actions, mixer } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("Idle");

  const [blink, setBlink] = useState(true);

  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;

    const nextBlink = () => {
      blinkTimeout = setTimeout(
        () => {
          setBlink(true);
          setTimeout(() => {
            setBlink(false);
            nextBlink();
          }, 100);
        },
        randInt(1000, 5000),
      );
    };
    nextBlink();

    return () => clearTimeout(blinkTimeout);
  }, []);

  useEffect(() => {
    if (loading) {
      setAnimation("Thinking");
    } else if (currentMessage) {
      setAnimation(randInt(0, 1) ? "Talking" : "Talking2");
    } else {
      setAnimation("Idle");
    }
  }, [currentMessage, loading]);

  useFrame(({ camera }) => {
    //Slime
    lerpMorphTarget("mouthslime", 0.2, 0.5);

    //blinking
    lerpMorphTarget("eye_close", blink ? 1 : 0, 0.5);

    //talking
    for (let i = 0; i <= 21; i++) {
      lerpMorphTarget(i, 0, 0.1); //reset morph targer
    }
  });

  useEffect(() => {
    actions[animation]
      ?.reset()
      .fadeIn(mixer.time > 0 ? ANIMATION_FADE_TIME : 0)
      .play();
    return () => {
      actions[animation]?.fadeOut(ANIMATION_FADE_TIME);
    };
  }, [animation, actions]);

  const lerpMorphTarget = (
    target: string | number,
    value: number,
    speed = 0.1,
  ) => {
    scene.traverse((child) => {
      if (
        child instanceof SkinnedMesh &&
        child.morphTargetDictionary &&
        child.morphTargetInfluences
      ) {
        const index = child.morphTargetDictionary[target];
        if (
          index !== undefined &&
          child.morphTargetInfluences[index] !== undefined
        ) {
          const morphTargetInfluence = child.morphTargetInfluences[index]!;
          child.morphTargetInfluences[index] = MathUtils.lerp(
            morphTargetInfluence,
            value,
            speed,
          );
        }
      }
    });
  };

  return (
    <group {...props} ref={group} dispose={null}>
      {loading && (
        <Html position-y={teacher === "Nanami" ? 1.6 : 1.8}>
          <div className="flex -translate-x-1/2 items-center justify-center">
            <span className="relative flex size-8 items-center justify-center">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full 
                bg-white opacity-75
                "
              ></span>
              <span
                className="relative inline-flex size-8 items-center justify-center 
                rounded-full bg-white/80 duration-75
                "
              >
                {thinkingText}
              </span>
            </span>
          </div>
        </Html>
      )}
      <primitive object={scene} />
    </group>
  );
};

TEACHERS.map((teacher) => {
  useGLTF.preload(`/models/Teacher_${teacher}.glb`);
  useGLTF.preload(`/models/animations_${teacher}.glb`);
});
