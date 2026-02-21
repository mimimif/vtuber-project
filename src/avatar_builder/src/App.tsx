import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { MotionProvider } from './contexts/MotionContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Modeling from './pages/Modeling'
import Texturing from './pages/Texturing'
import Rigging from './pages/Rigging'
import Settings from './pages/Settings'

function App() {
  return (
    <MotionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="modeling" element={<Modeling />} />
            <Route path="texturing" element={<Texturing />} />
            <Route path="rigging" element={<Rigging />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </MotionProvider>
  )
}

export default App
