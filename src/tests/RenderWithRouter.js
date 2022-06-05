import React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';

function RenderWithRouter(component) {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );
  return customHistory;
}

export default RenderWithRouter;
