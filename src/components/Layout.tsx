// components/Layout.tsx
import { Outlet, Link } from 'react-router';
import { Button } from "@/components/ui/button";
import { navItems } from '@/routes';

const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <nav>
          {navItems.map((item) => (
            <Button key={item.path} asChild>
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
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