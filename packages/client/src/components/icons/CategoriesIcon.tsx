import React, { FC } from 'react';

interface Props {
  width: string | number;
  height: string | number;
  fill: string;
  stroke: string;
}

const CategoriesIcon: FC<Partial<Props>> = ({ width = '24', height = '24', fill = '#61646E', stroke = 'none' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={width}
      height={height}
      className="cat-icon"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill={fill} stroke={stroke}>
        <path d="M805 4551 c-90 -22 -172 -90 -215 -176 l-25 -50 0 -645 0 -645 23 -45 c35 -72 75 -114 144 -151 l63 -34 645 0 645 0 63 34 c70 38 100 69 140 145 l27 51 0 645 0 645 -34 63 c-37 69 -79 109 -151 144 l-45 23 -625 2 c-344 1 -638 -2 -655 -6z" />
        <path d="M3045 4551 c-90 -22 -172 -90 -215 -176 l-25 -50 0 -645 0 -645 23 -45 c35 -72 75 -114 144 -151 l63 -34 645 0 645 0 63 34 c70 38 100 69 140 145 l27 51 0 645 0 645 -34 63 c-37 69 -79 109 -151 144 l-45 23 -625 2 c-344 1 -638 -2 -655 -6z" />
        <path d="M805 2311 c-90 -22 -172 -90 -215 -176 l-25 -50 0 -645 0 -645 23 -45 c35 -72 75 -114 144 -151 l63 -34 645 0 645 0 63 34 c70 38 100 69 140 145 l27 51 0 645 0 645 -34 63 c-37 69 -79 109 -151 144 l-45 23 -625 2 c-344 1 -638 -2 -655 -6z" />
        <path d="M3565 2313 c-60 -8 -181 -42 -239 -68 -417 -185 -623 -656 -476 -1092 82 -246 297 -461 543 -543 558 -188 1130 198 1164 785 25 438 -289 834 -722 910 -81 14 -198 17 -270 8z" />
      </g>
    </svg>
  );
};

export default CategoriesIcon;
