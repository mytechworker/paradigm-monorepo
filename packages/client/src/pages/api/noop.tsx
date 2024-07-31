import { NextApiHandler } from 'next';

const NoopApiHandler: NextApiHandler = async (req, res): Promise<string> => {
  return new Promise((resolve, reject) => {
    const message = 'noop';

    res.status(200).end(message);

    resolve(message);
  });
};

export default NoopApiHandler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
  },
};
