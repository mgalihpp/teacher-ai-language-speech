/* eslint-disable @typescript-eslint/no-floating-promises */
import { CAMERA_POSITION, CAMERA_ZOOMS } from "@/constants";
import { useAiTeacher } from "@/hooks/use-ai-teacher";
import { CameraControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { memo, useEffect, useRef } from "react";

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

export default memo(CameraManager);
