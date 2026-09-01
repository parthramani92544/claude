import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ManufacturerLogin } from './ManufacturerLogin';
import './tokens.css';
import './ManufacturerLogin.css';

createRoot(document.getElementById('plastoship-root')!).render(
  <StrictMode>
    <ManufacturerLogin />
  </StrictMode>,
);
