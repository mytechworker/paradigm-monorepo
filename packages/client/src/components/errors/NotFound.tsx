import AnimatedBG from '@client/styles/styled/AnimatedBG';
import { Row, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
  h1 {
    font-size: 10rem;
  }
`;

const NotFound: React.FC<{ code: number }> = ({ code }) => {
  const title = code === 404 ? 'This page could not be found' : code || 'An unexpected error has occurred';

  return (
    <div>
      <Row align="middle" justify="center" className="bg-white text-center" style={{ minHeight: '100vh' }}>
        <AnimatedBG>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <span key={item} />
          ))}
        </AnimatedBG>

        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Title className={`${code === 404 ? 'text-warning' : 'text-error'}`} level={1}>
            {code}
          </Title>
          <Title level={5} className="mb-1 mt-1 text-body">
            {title}
          </Title>
        </Row>
      </Row>
    </div>
  );
};

export default NotFound;
