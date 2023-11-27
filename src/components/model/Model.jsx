import React from 'react';
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Stage } from "@react-three/drei";

function OurModel(props) {
  const { scene } = useGLTF('../bitcoin.glb');
  return <primitive object={scene} {...props} />;
}

const Model = () => {
  return (
    <div style={{height: "100vh",  }}>
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ position: "absolute", top: "58px", width: "100%" }}>
        <color attach="background" args={['#101010']} />
        <ambientLight intensity={1} />
        <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
          <Stage>
            <OurModel scale={0.01} />
          </Stage>
        </PresentationControls>
      </Canvas>
    </div>
  );
}

export default Model;
