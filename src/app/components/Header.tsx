"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authAPI, User } from "@/lib/api";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
  };

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Comprar', href: '/comprar' },
    { name: 'Premios', href: '/premios' },
    { name: 'Transparencia', href: '/transparencia' },
    { name: 'Reglamento', href: '/reglamento' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <span className="text-sm font-bold text-primary-foreground">SC</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold leading-none">Rifa Siera Code</div>
            <div className="text-xs text-muted-foreground">TecNM Zongolica</div>
          </div>
        </Link>

        {/* Navegación Desktop */}
        <nav className="mx-6 hidden items-center space-x-6 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Acciones Desktop */}
          <div className="hidden items-center space-x-4 md:flex">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/perfil" className="flex items-center space-x-2">
                    <span className="text-sm">👋</span>
                    <span className="font-medium">{user.nombre.split(' ')[0]}</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">
                  Iniciar sesión
                </Link>
              </Button>
            )}
            
            <Button asChild>
              <Link href="/comprar">
                Comprar boleto
              </Link>
            </Button>
          </div>

          {/* Menú Mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="sr-only">Menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6">
                  {/* Logo Mobile */}
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                      <span className="text-sm font-bold text-primary-foreground">SC</span>
                    </div>
                    <div>
                      <div className="text-lg font-semibold leading-none">Rifa Siera Code</div>
                      <div className="text-xs text-muted-foreground">TecNM Zongolica</div>
                    </div>
                  </Link>

                  {/* Navegación Mobile */}
                  <nav className="flex flex-col space-y-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="border-t pt-6">
                    {user ? (
                      <div className="space-y-4">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                          <Link 
                            href="/perfil" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-sm">👤</span>
                            <span>Mi Perfil ({user.nombre.split(' ')[0]})</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                        >
                          Cerrar sesión
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full" asChild>
                        <Link 
                          href="/auth/login" 
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Iniciar sesión
                        </Link>
                      </Button>
                    )}
                    
                    <Button className="w-full mt-4" asChild>
                      <Link 
                        href="/comprar" 
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Comprar boleto
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}