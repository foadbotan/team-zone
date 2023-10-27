import { render, fireEvent, screen } from '@testing-library/react';
import { Team } from '@/components/Team';

const people = [
  { name: 'Joey', timeZone: 'Europe/London', isSelected: true },
  { name: 'Rachel', timeZone: 'Europe/Moscow', isSelected: true },
];

describe('Team', () => {
  test('renders team', () => {
    render(<Team people={people} setPeople={() => {}} />);
    const team = screen.getByTestId('team');
    expect(team).toBeInTheDocument();
  });

  test('renders Joey', () => {
    render(<Team people={people} setPeople={() => {}} />);
    const joey = screen.getByText('Joey');
    expect(joey).toBeInTheDocument();
  });

  test('renders edit button', () => {
    render(<Team people={people} setPeople={() => {}} />);
    const editButton = screen.getByTestId('edit-button');
    expect(editButton).toBeInTheDocument();
  });

  test('renders form when edit button is clicked', () => {
    render(<Team people={people} setPeople={() => {}} />);
    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);
    const form = screen.getByText('New team member');
    expect(form).toBeInTheDocument();
  });

  test('does not render form when edit button is not clicked', () => {
    render(<Team people={people} setPeople={() => {}} />);
    const form = screen.queryByText('New team member');
    expect(form).not.toBeInTheDocument();
  });
});
