// components/Layout.tsx
import { Outlet, Link } from 'react-router';
import { Button } from "@/components/ui/button";
import { navItems } from '@/routes';
import { ModeToggle } from '@/components/ui/mode-toggle'

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
          <ModeToggle />
        </nav>
      </header>
      
      <main>
        <Outlet /> {/* This is where your page components render */}
      </main>
      
      <footer>
        <p>© Stephen Smyth</p>
      </footer>
    </div>
  );
}

export default Layout;