import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type NextPageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
