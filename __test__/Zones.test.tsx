import { render, fireEvent, screen } from '@testing-library/react';
import { Zones } from '@/components/Zones';

const people = [
  { name: 'Joey', timeZone: 'Europe/London', isSelected: true },
  { name: 'Rachel', timeZone: 'Europe/Moscow', isSelected: true },
];

describe('Zones', () => {
  test('renders zones', () => {
    render(<Zones people={people} />);
    const zones = screen.getByTestId('zones');
    expect(zones).toBeInTheDocument();
  });

  test('renders Joey', () => {
    render(<Zones people={people} />);
    const joey = screen.getByText('Joey');
    expect(joey).toBeInTheDocument();
  });

  test("renders Joey's zone (London)", () => {
    render(<Zones people={people} />);
    const joey = screen.getByText('London');
    expect(joey).toBeInTheDocument();
  });
});
