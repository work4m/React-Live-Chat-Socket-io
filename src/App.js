import React from 'react';

import Dashboard from './Dashboard';
import Store from './Store';

export function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}
