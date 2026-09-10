import { Route, Routes } from 'react-router-dom'
import BareLayout from './components/BareLayout'
import Layout from './components/Layout'
import About from './pages/About'
import Area from './pages/Area'
import Cities from './pages/Cities'
import City from './pages/City'
import Cost from './pages/Cost'
import Culture from './pages/Culture'
import Faq from './pages/Faq'
import Home from './pages/Home'
import Job from './pages/Job'
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
        {/* 落地／工作客群，訂閱後導向這頁逛網站，保留共用導覽列 */}
        <Route path="welcome" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/*
        轉機客群與求職 PDF 客群，各自訂閱後導向的交付頁。
        套 BareLayout（不含共用導覽列），避免這兩批讀者一打開頁面
        就看到跟自己無關的其他分類連結，混到別的客群。
      */}
      <Route element={<BareLayout />}>
        <Route path="thanks" element={<Thanks />} />
        <Route path="job" element={<Job />} />
      </Route>
    </Routes>
  )
}
