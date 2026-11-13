import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import type { Page } from './paths';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import './styles.css';

const root = document.getElementById('root')!;
const page = document.body.dataset.page as Page;
const app = <App page={page} base={import.meta.env.BASE_URL} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
