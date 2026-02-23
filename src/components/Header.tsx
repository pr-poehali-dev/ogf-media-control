import { useState } from 'react';
import { useApp, Page } from '@/context/AppContext';
import Icon from '@/components/ui/icon';
import AuthModal from '@/components/AuthModal';

const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: 'Главная', page: 'home' },
  { label: 'Каналы', page: 'channels' },
  { label: 'Публикации', page: 'publications' },
  { label: 'Новости', page: 'news' },
  { label: 'О федерации', page: 'about' },
  { label: 'Пожаловаться', page: 'complaint' },
];

export default function Header() {
  const { currentPage, setPage, user, setUser } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className="bg-[hsl(220,60%,14%)] text-white sticky top-0 z-40 shadow-lg">
        {/* Top bar */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
            <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-widest font-mono">
              <span>ОГФ</span>
              <span className="text-amber-500">•</span>
              <span>ГТРК</span>
              <span className="text-white/30">—</span>
              <span>Государственная Телерадиокомпания</span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  {user.role === 'admin' && (
                    <button
                      onClick={() => setPage('moderation')}
                      className="text-[10px] text-amber-400 hover:text-amber-300 uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <Icon name="Shield" size={10} />
                      Модерация
                    </button>
                  )}
                  <span className="text-[10px] text-white/50">@{user.nickname}</span>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] text-white/40 hover:text-white/70 uppercase tracking-widest transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="text-[10px] text-white/50 hover:text-white/80 uppercase tracking-widest transition-colors"
                >
                  Войти
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => setPage('home')}
              className="flex items-center gap-3 group"
            >
              {/* Emblem */}
              <div className="w-9 h-9 bg-amber-500 flex items-center justify-center text-[hsl(220,60%,14%)] font-bold text-sm font-mono shrink-0">
                ОГФ
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-sm font-semibold tracking-wide leading-none">ГТРК</div>
                <div className="text-[9px] text-white/40 tracking-widest uppercase leading-none mt-0.5">Wild Politics</div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_ITEMS.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  className={`text-[11px] font-medium uppercase tracking-widest transition-colors pb-0.5 ${
                    currentPage === page
                      ? 'text-amber-400 border-b border-amber-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
              {user?.role === 'admin' && (
                <button
                  onClick={() => setPage('moderation')}
                  className={`text-[11px] font-medium uppercase tracking-widest transition-colors pb-0.5 flex items-center gap-1 ${
                    currentPage === 'moderation'
                      ? 'text-amber-400 border-b border-amber-500'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Icon name="ShieldCheck" size={11} />
                  Модерация
                </button>
              )}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {!user && (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden lg:flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[hsl(220,60%,14%)] text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 transition-colors"
                >
                  <Icon name="User" size={12} />
                  Войти
                </button>
              )}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden text-white/70 hover:text-white p-1"
              >
                <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[hsl(220,60%,12%)]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map(({ label, page }) => (
                <button
                  key={page}
                  onClick={() => { setPage(page); setMobileOpen(false); }}
                  className={`text-left text-[11px] font-medium uppercase tracking-widest py-2 border-b border-white/5 transition-colors ${
                    currentPage === page ? 'text-amber-400' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
              {user?.role === 'admin' && (
                <button
                  onClick={() => { setPage('moderation'); setMobileOpen(false); }}
                  className="text-left text-[11px] font-medium uppercase tracking-widest py-2 text-amber-400"
                >
                  Модерация
                </button>
              )}
              {!user && (
                <button
                  onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                  className="text-left text-[11px] font-medium uppercase tracking-widest py-2 text-amber-400"
                >
                  Войти / Зарегистрироваться
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
