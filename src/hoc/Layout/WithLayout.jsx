import React from 'react';
import { Header } from '../../components/layout/Header/Header';
import { useLocalStorage } from '../../hooks/useLocalStorage/localStorage';
import withSpinner from '../Spinner/withSpinner';

const WithLayout = ({ darkModeDefault = false, children }) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkmode', darkModeDefault);

  return (
    <div className="App">
      <main
        data-testid="application"
        className={darkMode ? 'darkmode' : undefined}
      >
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main>{children}</main>
      </main>
    </div>
  );
};

export default withSpinner(WithLayout);
