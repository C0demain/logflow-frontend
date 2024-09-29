// RadialProgress.tsx
import React from 'react';

type RadialProgressProps = {
  percentage: number;
};

const RadialProgress: React.FC<RadialProgressProps> = ({ percentage }) => {
  const radius = 40; 
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg
        width="90"
        height="90"
        viewBox="0 0 120 120"
      >
        {/* Círculo de fundo */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-30"
        />
        {/* Círculo de progresso */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="green"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          className="transition-transform duration-500"
        />
        {/* Texto central */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          stroke="none"
          dy=".3em"
          fontSize="24"
          className="text-gray-800 font-semibold"
        >
          {Math.round(percentage)}%
        </text>
      </svg>
    </div>
  );
};

export default RadialProgress;
