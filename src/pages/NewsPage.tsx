import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import PostCard from '@/components/PostCard';
import Icon from '@/components/ui/icon';

export default function NewsPage() {
  const { posts } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'state' | 'regional'>('all');

  const news = posts.filter(p => p.status === 'approved').filter(p => {
    if (activeFilter === 'state') return p.channelType === 'state';
    if (activeFilter === 'regional') return p.channelType === 'regional';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="section-title">Информационная лента</div>
      <h1 className="text-2xl font-semibold mb-6">Новости федерации</h1>

      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
        {([
          { label: 'Все новости', value: 'all' as const },
          { label: 'Государственные СМИ', value: 'state' as const },
          { label: 'Региональные', value: 'regional' as const },
        ]).map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`text-[11px] font-medium uppercase tracking-wide px-3 py-1.5 border transition-colors ${
              activeFilter === value
                ? 'bg-[hsl(220,60%,18%)] text-white border-[hsl(220,60%,18%)]'
                : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground font-mono">{news.length} материалов</span>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border border-border">
          <Icon name="Newspaper" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Новостей пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
