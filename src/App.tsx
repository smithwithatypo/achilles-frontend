import { BrowserRouter, Routes, Route } from 'react-router';
// import { ThemeProvider } from "@/components/ui/theme-provider"
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import GenerateSentences from './pages/GenerateSentences'
import NotFound from './pages/NotFound';
import './App.css'

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="generateSentences" element={<GenerateSentences />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App
