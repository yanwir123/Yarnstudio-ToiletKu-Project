import React from "react";
import "./LogoLoop.css";

interface LogoItem {
  node: React.ReactNode;
  title: string;
}

interface Props {
  logos: LogoItem[];
  gap?: number;
}

const LogoLoop: React.FC<Props> = ({ logos }) => {
  return (
    <div className="logo-loop">
      <div className="logo-track">
        {logos.map((logo, i) => (
          <div className="logo-item" key={i}>
            {logo.node}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
