import React from 'react';

export const Trash = ({ width = 30, height = 30, fill = '#f90707' }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <g data-name="Layer 2">
        <path 
          d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"
          fill={fill}
        />
        <path 
          d="M11.76,21.24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.41l8.49-8.49A1,1,0,0,1,21,12.46L12.46,21A1,1,0,0,1,11.76,21.24Z"
          fill={fill}
        />
        <path 
          d="M20.24,21.24a1,1,0,0,1-.7-.29l-8.49-8.49a1,1,0,0,1,1.41-1.41L21,19.54A1,1,0,0,1,21,21,1,1,0,0,1,20.24,21.24Z"
          fill={fill}
        />
      </g>
      <g>
        <rect fill="none" height="32" width="32" />
      </g>
    </svg>
  );
};
