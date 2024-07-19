import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ExampleComponent } from './ExampleComponent';

/**
 *
 * @public
 */
export const Router = () => (
  <Routes>
    <Route path="*" element={<ExampleComponent />} />
  </Routes>
);
