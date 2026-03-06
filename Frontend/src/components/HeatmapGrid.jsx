import React from 'react';
import HeatmapCell from './HeatmapCell';

function HeatmapGrid({ days, activity }) {
  return (
    <div className="heatmap-grid">
      {days.map((date) => {
        const record = activity[date];

        let level = 0;

        if (record?.solved) {
          if (record.score >= 40) level = 4;
          else if (record.score >= 30) level = 3;
          else if (record.score >= 20) level = 2;
          else level = 1;
        }

        return <HeatmapCell key={date} level={level} date={date} />;
      })}
    </div>
  );
}

export default HeatmapGrid;
