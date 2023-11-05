import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

export type Validate<T> = (value: unknown) => T;

export type Options<T> = {
  defaultValue: T;
  validate: Validate<T>;
  history?: 'push' | 'replace';
};

export type UrlWrite<T> = {
  key: string;
  value?: T;
  history?: 'push' | 'replace';
  searchParams: ReadonlyURLSearchParams;
  pathname: string;
  router: AppRouterInstance;
  scroll?: boolean;
};

export type UrlRead<T> = {
  key: string;
  validate: Validate<T>;
  searchParams: ReadonlyURLSearchParams;
};
