import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  defaultNS: 'shared',
  resources: {
    fr: require('./locales/fr.json'),
    en: require('./locales/en.json'),
  },
});

ReactDOM.render(
  <StrictMode>
    <Suspense fallback={<div />}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
