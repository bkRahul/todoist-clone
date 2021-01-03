import React from 'react';
import withSpinner from '../Spinner/withSpinner';

const WithLayout = ({ darkMode, children }) => {
  return (
    <main
      data-testid="application"
      className={darkMode ? 'darkmode' : undefined}
    >
      <main>{children}</main>
    </main>
  );
};

export default withSpinner(WithLayout);
