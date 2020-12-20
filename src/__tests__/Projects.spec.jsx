import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Projects } from '../components/Projects/Projects';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(() => ({
    setSelectedProject: jest.fn(() => 'INBOX'),
  })),

  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🎯 React Basics',
        projectId: 1,
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//define a test suite on the component
describe('<Projects/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Success ', () => {
  it('renders the projects list', () => {
    const { queryByTestId } = render(<Projects />);
    expect(queryByTestId('project-action')).toBeTruthy();
  });

  it('renders the projects list and selects a project on click', () => {
    const { queryByTestId } = render(<Projects />);
    expect(queryByTestId('project-action')).toBeTruthy();

    fireEvent.click(queryByTestId('project-action'));
    expect(
      queryByTestId('project-list').classList.contains('active')
    ).toBeTruthy();
  });

  it('renders the projects list and selects a project on keydown', () => {
    const { queryByTestId } = render(<Projects />);
    expect(queryByTestId('project-action')).toBeTruthy();

    fireEvent.keyDown(queryByTestId('project-action'));
    expect(
      queryByTestId('project-list').classList.contains('active')
    ).toBeTruthy();
  });
});
