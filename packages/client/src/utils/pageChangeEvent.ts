import Nprogress from 'nprogress';

const pageChangeEvents = () => {
  return {
    routeChangeStartHandler: () => {
      Nprogress.start();
    },
    routeChangeCompleteHandler: () => {
      Nprogress.done();
    },
    routeChangeErrorHandler: () => {
      Nprogress.done();
    },
  };
};

export default pageChangeEvents;
