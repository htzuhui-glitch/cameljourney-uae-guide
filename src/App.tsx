import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Area from './pages/Area'
import Cities from './pages/Cities'
import City from './pages/City'
import Cost from './pages/Cost'
import Culture from './pages/Culture'
import Faq from './pages/Faq'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Resources from './pages/Resources'
import Roadmap from './pages/Roadmap'
import RoadmapTopic from './pages/RoadmapTopic'
import Thanks from './pages/Thanks'
import Welcome from './pages/Welcome'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="roadmap/:slug" element={<RoadmapTopic />} />
        <Route path="cost" element={<Cost />} />
        <Route path="cities" element={<Cities />} />
        <Route path="cities/:city" element={<City />} />
        <Route path="cities/:city/:area" element={<Area />} />
        <Route path="culture" element={<Culture />} />
        <Route path="faq" element={<Faq />} />
        <Route path="resources" element={<Resources />} />
        <Route path="about" element={<About />} />
        {/* 電子報訂閱後的導向頁，兩個客群各自獨立，不放在導覽列裡 */}
        <Route path="thanks" element={<Thanks />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
