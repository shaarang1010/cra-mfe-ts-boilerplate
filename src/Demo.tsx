import React from "react";

export const DemoComp: React.FC<{ text: string }> = ({ text }) => {
  return <h1 style={{ textAlign: "center" }}>{text}</h1>;
};
