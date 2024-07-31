import { Card, CardProps } from 'antd';

import React from 'react';

interface FormCardsProps extends CardProps {
  children: React.ReactNode;
}

const FormCards: React.FC<FormCardsProps> = ({ className, children }) => {
  return (
    <>
      <Card className={className}>{children}</Card>
    </>
  );
};

export default FormCards;
