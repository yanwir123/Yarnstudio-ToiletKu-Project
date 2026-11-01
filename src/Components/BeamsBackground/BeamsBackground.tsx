import React from "react";
import Beams from "../Beams";
import "./BeamsBackground.css";

interface BeamsBackgroundProps {
  children?: React.ReactNode;
}

const BeamsBackground: React.FC<BeamsBackgroundProps> = ({ children }) => {
  return (
    <div className="beams-wrapper">
      <div className="beams-bg">
        <Beams
          beamWidth={2.8}
          beamHeight={25}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      <div className="beams-overlay" />

      {children && <div className="beams-content">{children}</div>}
    </div>
  );
};

export default BeamsBackground;
