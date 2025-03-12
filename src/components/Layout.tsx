// components/Layout.tsx
import { Outlet, Link } from 'react-router';
import { Button } from "@/components/ui/button";
import { navItems } from '@/routes';
import { ModeToggle } from '@/components/ui/mode-toggle'
import { ThemeProvider } from "@/components/ui/theme-provider"


const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <header>
        <nav>
          {navItems.map((item) => (
            <Button className="mx-1" key={item.path} asChild>
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

      </ThemeProvider>
    </div>
  );
}

export default Layout;