import React from "react";
import "../index.css";

const ProgressBar = ({ value }) => {
  const percentage = ((value - 1) / (255 - 1)) * 100;

  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${clampedPercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
