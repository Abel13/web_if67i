import React from "react";

const DynamicContent = ({ visible, children, style }) => {
  return visible ? (
    <div style={style}>{children}</div>
  ) : (
    <div style={{ width: 0, height: 0 }} />
  );
};

export default DynamicContent;
