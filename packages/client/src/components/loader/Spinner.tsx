import React from 'react';
import { Spin, SpinProps } from 'antd';

const Spinner: React.FC<SpinProps> = (props) => {
  console.log(`>>> load`);

  return <span>Loading....</span>;
};

export default Spinner;
