import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/impactos', label: 'Impactos' },
    { path: '/analisis', label: 'Análisis Ecológico' },
    { path: '/mapa', label: 'Mapa' },
    { path: '/calculadora', label: 'Calculadora' },
    { path: '/reporta', label: 'Reporta' },
    { path: '/ciberseguridad', label: 'Ciberseguridad' },
  ];

  return (
    <header className="w-full bg-white border-b border-light-border sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-2xl md:text-3xl text-primary">
            Cambios climáticos - Panamá
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-paragraph text-base transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : 'text-muted-grey hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-6 pb-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-paragraph text-base transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : 'text-muted-grey hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
