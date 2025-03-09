import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from "@/components/ui/theme-provider"
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
    </ThemeProvider>
        </Routes>
    </BrowserRouter>
  );
}

export default App
