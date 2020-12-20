import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Project } from '../components/Projects/Project/Project';

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
    setProjects: jest.fn(() => 'INBOX'),
  })),
}));

//mock firebase implementation
jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          delete: jest.fn(() => Promise.resolve('Dont know what im doing')),
        })),
      })),
    })),
  },
}));

describe('<Project/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });
});

const project = {
  name: '🎯 React Basics',
  projectId: 1,
  userId: 'chtjuMWL3bEWyMN',
};

describe('Success ', () => {
  it('renders the single project', () => {
    const { getByText } = render(<Project project={project} />);
    expect(getByText('🎯 React Basics')).toBeTruthy();
  });

  it('renders the delete project overlay and deletes project', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.click(queryByTestId('delete-project'));

    expect(
      getByText('Are you sure you want to delete the project ?')
    ).toBeTruthy();
    fireEvent.click(getByText('Delete'));
  });

  it('renders the delete project overlay and cancels delete modal on click', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.click(queryByTestId('delete-project'));

    expect(
      getByText('Are you sure you want to delete the project ?')
    ).toBeTruthy();
    fireEvent.click(getByText('Cancel'));
  });

  it('renders the delete project overlay and cancels delete modal on key down', () => {
    const { queryByTestId, getByText } = render(<Project project={project} />);

    fireEvent.keyDown(queryByTestId('delete-project'));

    expect(
      getByText('Are you sure you want to delete the project ?')
    ).toBeTruthy();
    fireEvent.keyDown(getByText('Cancel'));
  });
});
