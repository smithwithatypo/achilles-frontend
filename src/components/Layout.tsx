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
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
          {navItems.map((item) => (
            <Button variant="ghost" className="mx-1" key={item.path} asChild>
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
          </div>
          <ModeToggle />
        </nav>
      </header>
      
      <main>
        <Outlet /> {/* This is where your page components render */}
      </main>
      
      <footer className="mt-auto py-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Learn French
          </p>
        </div>
      </footer>

      </ThemeProvider>
    </div>
  );
}

export default Layout;