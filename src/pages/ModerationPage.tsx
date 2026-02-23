import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CHANNEL_TYPE_LABELS, ChannelType } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function ModerationPage() {
  const { user, posts, channels, comments, complaints, approvePost, rejectPost, approveComment, rejectComment, verifyChannel } = useApp();

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon name="ShieldOff" size={28} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Доступ ограничен</h2>
        <p className="text-sm text-muted-foreground">Панель модерации доступна только администраторам ГТРК</p>
      </div>
    );
  }

  const pendingPosts = posts.filter(p => p.status === 'pending');
  const pendingComments = comments.filter(c => !c.approved);
  const pendingComplaints = complaints.filter(c => c.status === 'pending');
  const unverifiedChannels = channels.filter(c => !c.verified);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[hsl(220,60%,18%)] flex items-center justify-center">
          <Icon name="ShieldCheck" size={16} className="text-amber-400" />
        </div>
        <div>
          <div className="section-title mb-0">Панель администратора</div>
          <h1 className="text-xl font-semibold leading-none mt-0.5">Модерация ГТРК</h1>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Icon name="User" size={12} />
          @{user.nickname}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Публикаций на рассмотрении', value: pendingPosts.length, color: 'text-amber-600', icon: 'FileText' },
          { label: 'Комментариев на проверке', value: pendingComments.length, color: 'text-blue-600', icon: 'MessageSquare' },
          { label: 'Жалоб в работе', value: pendingComplaints.length, color: 'text-red-600', icon: 'Flag' },
          { label: 'Каналов без верификации', value: unverifiedChannels.length, color: 'text-purple-600', icon: 'Tv' },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name={icon as 'FileText'} size={14} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-2xl font-semibold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="posts">
        <TabsList className="border border-border bg-transparent p-0 h-auto gap-0 mb-6">
          {[
            { value: 'posts', label: 'Публикации', count: pendingPosts.length },
            { value: 'comments', label: 'Комментарии', count: pendingComments.length },
            { value: 'complaints', label: 'Жалобы', count: pendingComplaints.length },
            { value: 'channels', label: 'Каналы', count: unverifiedChannels.length },
          ].map(({ value, label, count }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-xs uppercase tracking-wide px-4 py-2.5"
            >
              {label}
              {count > 0 && (
                <span className="ml-2 bg-amber-500 text-[hsl(220,60%,14%)] text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                  {count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="posts">
          <PendingPosts posts={pendingPosts} onApprove={approvePost} onReject={rejectPost} />
        </TabsContent>
        <TabsContent value="comments">
          <PendingComments comments={pendingComments} onApprove={approveComment} onReject={rejectComment} />
        </TabsContent>
        <TabsContent value="complaints">
          <PendingComplaints complaints={pendingComplaints} />
        </TabsContent>
        <TabsContent value="channels">
          <PendingChannels channels={unverifiedChannels} onVerify={verifyChannel} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PendingPosts({ posts, onApprove, onReject }: { posts: ReturnType<typeof useApp>['posts']; onApprove: (id: string) => void; onReject: (id: string) => void }) {
  if (posts.length === 0) return <EmptyState text="Нет публикаций на рассмотрении" icon="FileCheck" />;
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{post.channelName}</div>
              <h3 className="font-semibold text-sm mb-2">{post.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{post.content}</p>
              <div className="text-[10px] text-muted-foreground mt-2 font-mono">
                {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Button size="sm" onClick={() => onApprove(post.id)} className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs h-8">
                <Icon name="Check" size={13} />
                Одобрить
              </Button>
              <Button size="sm" variant="outline" onClick={() => onReject(post.id)} className="text-destructive border-destructive/30 hover:bg-destructive/10 text-xs h-8">
                <Icon name="X" size={13} />
                Отклонить
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PendingComments({ comments, onApprove, onReject }: { comments: ReturnType<typeof useApp>['comments']; onApprove: (id: string) => void; onReject: (id: string) => void }) {
  if (comments.length === 0) return <EmptyState text="Нет комментариев на проверке" icon="MessageCheck" />;
  return (
    <div className="space-y-3">
      {comments.map(c => (
        <div key={c.id} className="border border-border bg-card p-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-xs font-mono font-medium mb-1">@{c.authorNickname}</div>
            <p className="text-sm text-foreground">{c.content}</p>
            <div className="text-[10px] text-muted-foreground mt-1.5 font-mono">
              {new Date(c.createdAt).toLocaleDateString('ru-RU')} • Публикация #{c.postId}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => onApprove(c.id)} className="w-8 h-8 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center transition-colors">
              <Icon name="Check" size={14} />
            </button>
            <button onClick={() => onReject(c.id)} className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition-colors">
              <Icon name="Trash2" size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PendingComplaints({ complaints }: { complaints: ReturnType<typeof useApp>['complaints'] }) {
  if (complaints.length === 0) return <EmptyState text="Жалоб на рассмотрении нет" icon="ShieldCheck" />;
  return (
    <div className="space-y-3">
      {complaints.map(c => (
        <div key={c.id} className="border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge-state bg-red-100 text-red-700 text-[10px]">
              {c.targetType === 'post' ? 'Публикация' : c.targetType === 'comment' ? 'Комментарий' : 'Канал'}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">{new Date(c.createdAt).toLocaleDateString('ru-RU')}</span>
          </div>
          <div className="text-xs font-medium mb-1">{c.reason}</div>
          <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
          {c.targetId && (
            <div className="text-[10px] text-muted-foreground mt-2 font-mono">Объект: {c.targetId}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function PendingChannels({ channels, onVerify }: { channels: ReturnType<typeof useApp>['channels']; onVerify: (id: string, type: ChannelType) => void }) {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, ChannelType>>({});

  if (channels.length === 0) return <EmptyState text="Все каналы верифицированы" icon="BadgeCheck" />;

  return (
    <div className="space-y-4">
      {channels.map(ch => (
        <div key={ch.id} className="border border-border bg-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{ch.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{ch.description}</p>
              {ch.telegramLink && (
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-sky-600">
                  <Icon name="Send" size={10} />
                  {ch.telegramLink}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Select
                value={selectedTypes[ch.id] || ''}
                onValueChange={v => setSelectedTypes(p => ({ ...p, [ch.id]: v as ChannelType }))}
              >
                <SelectTrigger className="w-44 text-xs h-8">
                  <SelectValue placeholder="Тип канала" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.entries(CHANNEL_TYPE_LABELS) as [ChannelType, string][]).map(([k, v]) => (
                    <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                onClick={() => selectedTypes[ch.id] && onVerify(ch.id, selectedTypes[ch.id])}
                disabled={!selectedTypes[ch.id]}
                className="bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs h-8"
              >
                <Icon name="BadgeCheck" size={13} />
                Верифицировать
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ text, icon }: { text: string; icon: string }) {
  return (
    <div className="text-center py-12 border border-border text-muted-foreground">
      <Icon name={icon as 'FileCheck'} size={28} className="mx-auto mb-2 opacity-30" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
