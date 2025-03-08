// components/Layout.tsx
import { Outlet, Link } from 'react-router';
import { Button } from "@/components/ui/button"



const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <nav>
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild>
          <Link to="/about">About</Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        </nav>
      </header>
      
      <main>
        <Outlet /> {/* This is where your page components render */}
      </main>
      
      <footer>
        <p>© Your Education App</p>
      </footer>
    </div>
  );
}

export default Layout;