/**
 * App – Haupt-Router-Konfiguration
 * Verwendet React Router v7 mit HashRouter für GitHub Pages Kompatibilität
 */
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Heute from './pages/Heute'
import TrainingsplanPage from './pages/Trainingsplan'
import Fortschritt from './pages/Fortschritt'
import Einstellungen from './pages/Einstellungen'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Heute />} />
          <Route path="plan" element={<TrainingsplanPage />} />
          <Route path="fortschritt" element={<Fortschritt />} />
          <Route path="einstellungen" element={<Einstellungen />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
