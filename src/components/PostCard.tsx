import { Post, CHANNEL_TYPE_LABELS, CHANNEL_TYPE_COLORS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

interface Props {
  post: Post;
  compact?: boolean;
}

export default function PostCard({ post, compact }: Props) {
  const { setPage } = useApp();

  const date = new Date(post.publishedAt);
  const dateStr = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <article
      onClick={() => setPage('post', post.id)}
      className="card-news p-5 cursor-pointer group animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`badge-state text-[10px] ${CHANNEL_TYPE_COLORS[post.channelType]}`}>
            {CHANNEL_TYPE_LABELS[post.channelType]}
          </span>
          {post.fromTelegram && (
            <span className="badge-state bg-sky-100 text-sky-700 text-[10px]">
              <Icon name="Send" size={9} />
              Telegram
            </span>
          )}
        </div>
        <time className="text-[10px] text-muted-foreground font-mono shrink-0">{dateStr} {timeStr}</time>
      </div>

      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">
        {post.channelName}
      </div>

      <h3 className={`font-semibold leading-snug text-foreground group-hover:text-[hsl(220,60%,25%)] transition-colors mb-2 ${compact ? 'text-sm' : 'text-base'}`}>
        {post.title}
      </h3>

      {!compact && (
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.content}
        </p>
      )}

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Icon name="Eye" size={12} />
          {post.views.toLocaleString('ru-RU')}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Icon name="MessageSquare" size={12} />
          {post.commentsCount}
        </span>
        <div className="ml-auto">
          <Icon name="ArrowRight" size={14} className="text-muted-foreground/40 group-hover:text-amber-500 transition-colors" />
        </div>
      </div>
    </article>
  );
}
