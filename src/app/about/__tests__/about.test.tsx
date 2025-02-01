import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the About page correctly', () => {
    render(<AboutPage />);

    // Check if the main heading is present
    expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();

    // Check if the introductory paragraph is present
    expect(screen.getByText(/welcome to our adventure journal/i)).toBeInTheDocument();

    // Check if the story section is present
    expect(screen.getByRole('heading', { name: /our story/i })).toBeInTheDocument();

    // Check if the join us section is present
    expect(screen.getByRole('heading', { name: /join us/i })).toBeInTheDocument();
  });
}); 