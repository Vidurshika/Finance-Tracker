import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InfoCard from '../components/Cards/InfoCard';

describe('InfoCard Component', () => {
  it('should render card with title and value', () => {
    render(
      <InfoCard 
        title="Total Expenses" 
        value="$1,234" 
      />
    );
    
    expect(screen.getByText('Total Expenses')).toBeInTheDocument();
    expect(screen.getByText('$1,234')).toBeInTheDocument();
  });

  it('should render with custom icon', () => {
    const TestIcon = () => <span data-testid="custom-icon">💰</span>;
    
    render(
      <InfoCard 
        title="Income" 
        value="$5,000" 
        icon={<TestIcon />}
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
