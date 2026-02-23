import { useApp } from '@/context/AppContext';
import PostCard from '@/components/PostCard';
import Icon from '@/components/ui/icon';

export default function HomePage() {
  const { posts, channels, setPage } = useApp();
  const approvedPosts = posts.filter(p => p.status === 'approved');
  const featuredPost = approvedPosts[0];
  const otherPosts = approvedPosts.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero banner */}
      <div className="bg-[hsl(220,60%,18%)] text-white p-8 mb-8 animate-fade-in ogf-border-top">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-amber-500 flex items-center justify-center text-[hsl(220,60%,18%)] text-[8px] font-bold font-mono">ОГФ</div>
          <span className="text-[10px] text-white/40 uppercase tracking-widest">Официальный портал ГТРК</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3 max-w-2xl">
          Объединённая Гражданская Федерация
          <br />
          <span className="text-amber-400">Государственная Телерадиокомпания</span>
        </h1>
        <p className="text-white/60 text-sm max-w-xl leading-relaxed">
          Официальный медиа-портал ОГФ ГТРК. Государственные и частные СМИ под контролем федерального регулятора.
          Официальные новости, публикации, верификация каналов.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setPage('news')}
            className="bg-amber-500 hover:bg-amber-400 text-[hsl(220,60%,14%)] text-xs font-semibold uppercase tracking-wide px-5 py-2.5 transition-colors"
          >
            Актуальные новости
          </button>
          <button
            onClick={() => setPage('channels')}
            className="border border-white/20 hover:border-white/40 text-white text-xs font-medium uppercase tracking-wide px-5 py-2.5 transition-colors"
          >
            Все каналы
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="section-title flex items-center gap-2">
            <div className="ogf-accent-bar mb-0 w-4" />
            Главные новости
          </div>

          {featuredPost && (
            <div
              onClick={() => setPage('post', featuredPost.id)}
              className="border border-border bg-card p-6 mb-4 cursor-pointer hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-state bg-[hsl(220,60%,18%)] text-white text-[10px]">
                  Главное
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {new Date(featuredPost.publishedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">{featuredPost.channelName}</div>
              <h2 className="text-xl font-semibold leading-snug mb-3 group-hover:text-[hsl(220,60%,25%)] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                {featuredPost.content}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Icon name="Eye" size={11} />{featuredPost.views.toLocaleString('ru-RU')}</span>
                <span className="flex items-center gap-1"><Icon name="MessageSquare" size={11} />{featuredPost.commentsCount}</span>
                <span className="ml-auto flex items-center gap-1 text-amber-500 font-medium">
                  Читать далее <Icon name="ArrowRight" size={12} />
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherPosts.map(post => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="border border-border bg-card p-5">
            <div className="section-title">Статистика</div>
            <div className="space-y-3">
              {[
                { label: 'Зарегистрированных каналов', value: channels.length, icon: 'Tv' },
                { label: 'Публикаций', value: posts.filter(p => p.status === 'approved').length, icon: 'FileText' },
                { label: 'Государственных СМИ', value: channels.filter(c => c.type === 'state').length, icon: 'Building2' },
                { label: 'Верифицированных', value: channels.filter(c => c.verified).length, icon: 'BadgeCheck' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon name={icon} size={13} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                  <span className="text-sm font-semibold font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top channels */}
          <div className="border border-border bg-card p-5">
            <div className="section-title">Ведущие каналы</div>
            <div className="space-y-3">
              {channels.filter(c => c.verified).slice(0, 4).map(ch => (
                <button
                  key={ch.id}
                  onClick={() => setPage('channel', ch.id)}
                  className="w-full flex items-center justify-between text-left hover:bg-muted/50 -mx-2 px-2 py-1.5 rounded-sm transition-colors group"
                >
                  <div>
                    <div className="text-xs font-medium flex items-center gap-1">
                      {ch.name}
                      {ch.verified && <Icon name="BadgeCheck" size={11} className="text-amber-500" />}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {ch.subscribersCount.toLocaleString('ru-RU')} подписчиков
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={13} className="text-muted-foreground/40 group-hover:text-amber-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="border border-border bg-card p-5">
            <div className="section-title">Сервисы</div>
            <div className="space-y-1">
              {([
                { label: 'Подать публикацию', page: 'publications' as const, icon: 'FilePlus' },
                { label: 'Зарегистрировать канал', page: 'channels' as const, icon: 'PlusCircle' },
                { label: 'Пожаловаться на контент', page: 'complaint' as const, icon: 'Flag' },
                { label: 'О федерации', page: 'about' as const, icon: 'Info' },
              ] as const).map(({ label, page, icon }) => (
                <button
                  key={label}
                  onClick={() => setPage(page)}
                  className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground py-2 border-b border-border last:border-0 transition-colors text-left"
                >
                  <Icon name={icon} size={12} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}