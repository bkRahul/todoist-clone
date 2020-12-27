import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useSelectedProjectValue } from '../context';
import { Tasks } from '../components/Tasks/Tasks';

beforeEach(cleanup); //clean the DOM

//mock context implementation
jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🎯 React Basics',
        projectId: '1',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🎷 Chat App',
        projectId: '2',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🐶 Trello Clone',
        projectId: '3',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🛒 React Ecomm',
        projectId: '4',
        userId: 'chtjuMWL3bEWyMN',
      },
      {
        name: '🎲 Nodejs Learn',
        projectId: '5',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//mock hook implementation
jest.mock('../hooks/useTasks/tasks', () => ({
  useTasks: jest.fn(() => ({
    tasks: [
      {
        id: '81jDjygQhjQEIoe8mqSi',
        archived: false,
        date: '27/12/2020',
        projectId: '1',
        task: 'some task',
        userId: 'chtjuMWL3bEWyMN',
      },
    ],
  })),
}));

//define a test suite on the component
describe('<Tasks/>', () => {
  //define a hook to run after each test to clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the <Tasks /> component', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'INBOX',
      setSelectedProject: jest.fn(() => 'INBOX'),
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Inbox');
  });

  it('renders the <Tasks /> component with title 🎯 React Basics', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      setSelectedProject: jest.fn(() => '1'),
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('🎯 React Basics');
    expect(document.title).toBe('🎯 React Basics: Todoist');
  });

  it('renders the <Tasks /> component with collated title Next Week', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'NEXT_7_DAYS',
      setSelectedProject: jest.fn(() => 'NEXT_7_DAYS'),
    }));
    const { queryByTestId } = render(<Tasks />);

    expect(queryByTestId('tasks')).toBeTruthy();
    expect(queryByTestId('project-name').textContent).toBe('Next Week');
    expect(document.title).toBe('Next Week: Todoist');
  });
});
