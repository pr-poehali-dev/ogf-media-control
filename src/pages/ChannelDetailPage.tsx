import { useApp } from '@/context/AppContext';
import { CHANNEL_TYPE_LABELS, CHANNEL_TYPE_COLORS } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import Icon from '@/components/ui/icon';

export default function ChannelDetailPage() {
  const { channels, posts, currentChannelId, setPage } = useApp();
  const channel = channels.find(c => c.id === currentChannelId);

  if (!channel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-muted-foreground">
        <p>Канал не найден</p>
        <button onClick={() => setPage('channels')} className="text-sm text-[hsl(220,60%,25%)] mt-2 hover:underline">
          Вернуться к каналам
        </button>
      </div>
    );
  }

  const channelPosts = posts.filter(p => p.channelId === channel.id && p.status === 'approved');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => setPage('channels')}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors uppercase tracking-wide"
      >
        <Icon name="ArrowLeft" size={13} />
        Все каналы
      </button>

      <div className="border border-border bg-card p-6 mb-8 ogf-border-top animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`badge-state text-[10px] ${CHANNEL_TYPE_COLORS[channel.type]}`}>
                {CHANNEL_TYPE_LABELS[channel.type]}
              </span>
              {channel.verified && (
                <span className="flex items-center gap-1 text-[10px] text-amber-600 font-medium">
                  <Icon name="BadgeCheck" size={12} />
                  Верифицирован
                </span>
              )}
            </div>
            <h1 className="text-2xl font-semibold mb-2">{channel.name}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{channel.description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:text-right shrink-0">
            <div>
              <div className="text-2xl font-semibold font-mono">{channel.subscribersCount.toLocaleString('ru-RU')}</div>
              <div className="text-xs text-muted-foreground">подписчиков</div>
            </div>
            <div>
              <div className="text-xl font-semibold font-mono">{channel.postsCount}</div>
              <div className="text-xs text-muted-foreground">публикаций</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border">
          <span className="text-[11px] text-muted-foreground">
            Зарегистрирован: {new Date(channel.createdAt).toLocaleDateString('ru-RU')}
          </span>
          {channel.telegramLink && (
            <a
              href={channel.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-sky-600 hover:text-sky-500 transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <Icon name="Send" size={12} />
              Telegram-канал
            </a>
          )}
        </div>
      </div>

      <div className="section-title">Публикации канала ({channelPosts.length})</div>
      {channelPosts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border border-border">
          <Icon name="FileText" size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Публикаций пока нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {channelPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
