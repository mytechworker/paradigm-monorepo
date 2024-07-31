import React from 'react';
import { Alert, AlertProps } from 'antd';
import styled from 'styled-components';

interface AlertMessagePropsTypes extends AlertProps {
  isEnable: boolean;
}

const AlertContainer = styled(Alert)`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
`;

const AlertMessage: React.FC<AlertMessagePropsTypes> = ({ isEnable, closable, type, message, ...rest }) => {
  return isEnable ? (
    <AlertContainer className="alert-container" type={type} message={message} closable {...rest} />
  ) : (
    <></>
  );
};

export default AlertMessage;
