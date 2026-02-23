import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

export default function Footer() {
  const { setPage } = useApp();

  return (
    <footer className="bg-[hsl(220,60%,12%)] text-white mt-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-amber-500 flex items-center justify-center text-[hsl(220,60%,14%)] text-[9px] font-bold font-mono">ОГФ</div>
              <span className="text-sm font-semibold">ГТРК</span>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Государственная Телерадиокомпания Объединённой Гражданской Федерации.
              Официальный медиа-портал Wild Politics.
            </p>
          </div>
          <div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest mb-3">Разделы</div>
            <div className="space-y-2">
              {([
                { label: 'Главная', page: 'home' as const },
                { label: 'Каналы', page: 'channels' as const },
                { label: 'Публикации', page: 'publications' as const },
                { label: 'Новости', page: 'news' as const },
              ]).map(({ label, page }) => (
                <button key={page} onClick={() => setPage(page)} className="block text-xs text-white/50 hover:text-white transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[9px] text-white/30 uppercase tracking-widest mb-3">Сервисы</div>
            <div className="space-y-2">
              {([
                { label: 'О федерации', page: 'about' as const },
                { label: 'Пожаловаться', page: 'complaint' as const },
              ]).map(({ label, page }) => (
                <button key={page} onClick={() => setPage(page)} className="block text-xs text-white/50 hover:text-white transition-colors">
                  {label}
                </button>
              ))}
              <a href="https://t.me/+QgiLIa1gFRY4Y2Iy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-white/50 hover:text-sky-400 transition-colors">
                <Icon name="Send" size={11} />
                Telegram ГТРК
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] text-white/20 font-mono">© 2026 ОГФ ГТРК — Wild Politics</span>
          <span className="text-[10px] text-white/20">Все материалы охраняются законодательством ОГФ</span>
        </div>
      </div>
    </footer>
  );
}
