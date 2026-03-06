import React from 'react';

const intensityMap = {
  0: '#2d2d2d',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39'
};

function HeatmapCell({ level, date }) {
  return (
    <div
      className="heatmap-cell"
      title={date}
      style={{
        backgroundColor: intensityMap[level]
      }}
    ></div>
  );
}

export default React.memo(HeatmapCell);
