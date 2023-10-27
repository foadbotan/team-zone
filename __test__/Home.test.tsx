import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// I hate NextJS 13 and it's 'app' router
// https://github.com/vercel/next.js/discussions/42527
jest.mock<typeof import('next/navigation')>('next/navigation', () => {
  const actual = jest.requireActual('next/navigation');
  const nextRouterMock = jest.requireActual('next-router-mock');
  const { useRouter } = nextRouterMock;
  const usePathname = jest.fn().mockImplementation(() => {
    const router = useRouter();
    return router.asPath;
  });

  const useSearchParams = jest.fn().mockImplementation(() => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  });

  return {
    ...actual,
    useRouter: jest.fn().mockImplementation(useRouter),
    usePathname,
    useSearchParams,
  };
});

describe('Home', () => {
  test('renders title', () => {
    render(<Home />);
    const title = screen.getByText('Team Zones');
    expect(title).toBeInTheDocument();
  });

  test('renders team', () => {
    render(<Home />);
    const team = screen.getByTestId('team');
    expect(team).toBeInTheDocument();
  });

  test('renders zones', () => {
    render(<Home />);
    const zones = screen.getByTestId('zones');
    expect(zones).toBeInTheDocument();
  });
});
