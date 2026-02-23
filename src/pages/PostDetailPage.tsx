import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CHANNEL_TYPE_LABELS, CHANNEL_TYPE_COLORS } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function PostDetailPage() {
  const { posts, comments, currentPostId, setPage, user, addComment } = useApp();
  const post = posts.find(p => p.id === currentPostId);
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-muted-foreground">
        <p>Публикация не найдена</p>
        <button onClick={() => setPage('publications')} className="text-sm text-[hsl(220,60%,25%)] mt-2 hover:underline">
          Вернуться к публикациям
        </button>
      </div>
    );
  }

  const postComments = comments.filter(c => c.postId === post.id && c.approved);
  const date = new Date(post.publishedAt);

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment({
      postId: post.id,
      authorNickname: user!.nickname,
      content: commentText,
      createdAt: new Date().toISOString(),
    });
    setCommentText('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors uppercase tracking-wide"
      >
        <Icon name="ArrowLeft" size={13} />
        Назад
      </button>

      <article className="animate-fade-in">
        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className={`badge-state text-[10px] ${CHANNEL_TYPE_COLORS[post.channelType]}`}>
            {CHANNEL_TYPE_LABELS[post.channelType]}
          </span>
          {post.fromTelegram && (
            <span className="badge-state bg-sky-100 text-sky-700 text-[10px]">
              <Icon name="Send" size={9} />
              Из Telegram
            </span>
          )}
          <button
            onClick={() => setPage('channel', post.channelId)}
            className="text-[10px] text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
          >
            {post.channelName}
          </button>
          <span className="text-muted-foreground/40">•</span>
          <time className="text-[10px] text-muted-foreground font-mono">
            {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}{' '}
            {date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
          </time>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold leading-snug mb-6">{post.title}</h1>

        <div className="border-l-2 border-amber-500 pl-5 mb-8">
          <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>

        <div className="flex items-center gap-4 py-4 border-t border-b border-border mb-8">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Eye" size={13} />
            {post.views.toLocaleString('ru-RU')} просмотров
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="MessageSquare" size={13} />
            {postComments.length} комментариев
          </span>
          <button
            onClick={() => setPage('complaint')}
            className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
          >
            <Icon name="Flag" size={12} />
            Пожаловаться
          </button>
        </div>

        {/* Comments */}
        <div>
          <div className="section-title">Комментарии ({postComments.length})</div>

          {postComments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border border-border mb-6">
              <p className="text-sm">Комментариев пока нет</p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {postComments.map(c => (
                <div key={c.id} className="p-4 border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium font-mono">@{c.authorNickname}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {new Date(c.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}{' '}
                      {new Date(c.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* New comment */}
          {user ? (
            submitted ? (
              <div className="p-4 border border-border bg-amber-50 text-amber-800 text-sm flex items-center gap-2">
                <Icon name="Clock" size={14} />
                Комментарий отправлен на модерацию
              </div>
            ) : (
              <div className="space-y-3">
                <div className="section-title">Оставить комментарий</div>
                <div className="text-[11px] text-muted-foreground font-mono">@{user.nickname}</div>
                <Textarea
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Ваш комментарий..."
                  rows={4}
                  className="text-sm"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-muted-foreground">Комментарий будет опубликован после проверки модератором</p>
                  <Button
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                    className="bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide"
                  >
                    Отправить
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="p-4 border border-border bg-card text-center">
              <p className="text-sm text-muted-foreground mb-3">Для комментирования необходимо войти в систему</p>
              <button
                onClick={() => setPage('home')}
                className="text-xs text-[hsl(220,60%,25%)] hover:underline"
              >
                Войти через портал
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
