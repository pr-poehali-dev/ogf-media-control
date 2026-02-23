import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CHANNEL_TYPE_LABELS, CHANNEL_TYPE_COLORS } from '@/data/mockData';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

export default function PublicationsPage() {
  const { posts, channels, user, addPost } = useApp();
  const [submitOpen, setSubmitOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ channelId: '', title: '', content: '' });
  const [submitted, setSubmitted] = useState(false);

  const approved = posts.filter(p => p.status === 'approved' &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase()))
  );

  const userChannels = channels.filter(c => c.ownerId === user?.id);

  const handleSubmit = () => {
    if (!form.channelId || !form.title || !form.content) return;
    const ch = channels.find(c => c.id === form.channelId);
    if (!ch) return;
    addPost({
      channelId: ch.id,
      channelName: ch.name,
      channelType: ch.type,
      title: form.title,
      content: form.content,
      status: 'pending',
      publishedAt: new Date().toISOString(),
      fromTelegram: false,
    });
    setForm({ channelId: '', title: '', content: '' });
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="section-title">Лента публикаций</div>
          <h1 className="text-2xl font-semibold">Публикации</h1>
        </div>
        {user && (
          <Button
            onClick={() => { setSubmitOpen(true); setSubmitted(false); }}
            className="bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide"
          >
            <Icon name="FilePlus" size={14} />
            Предложить публикацию
          </Button>
        )}
      </div>

      <div className="relative mb-6">
        <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Поиск по публикациям..."
          className="pl-9 text-sm max-w-md"
        />
      </div>

      {approved.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground border border-border">
          <Icon name="FileSearch" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Публикации не найдены</p>
        </div>
      ) : (
        <div className="space-y-4">
          {approved.map(post => (
            <div key={post.id} className="grid grid-cols-1">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}

      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base">Предложить публикацию</DialogTitle>
          </DialogHeader>
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-amber-100 flex items-center justify-center mx-auto">
                <Icon name="Clock" size={24} className="text-amber-600" />
              </div>
              <p className="font-medium text-sm">Публикация отправлена на модерацию</p>
              <p className="text-[12px] text-muted-foreground">Администраторы ГТРК рассмотрят её в ближайшее время</p>
              <Button onClick={() => setSubmitOpen(false)} variant="outline" className="text-xs">Закрыть</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Канал *</Label>
                {userChannels.length > 0 ? (
                  <Select value={form.channelId} onValueChange={v => setForm(f => ({ ...f, channelId: v }))}>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Выберите ваш канал" />
                    </SelectTrigger>
                    <SelectContent>
                      {userChannels.map(c => (
                        <SelectItem key={c.id} value={c.id}>
                          <span className="flex items-center gap-2">
                            <span className={`badge-state text-[9px] ${CHANNEL_TYPE_COLORS[c.type]}`}>{CHANNEL_TYPE_LABELS[c.type]}</span>
                            {c.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-3 border border-border text-xs text-muted-foreground bg-muted/30">
                    У вас нет зарегистрированных каналов. Сначала зарегистрируйте канал в разделе «Каналы».
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Заголовок *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Заголовок публикации" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Текст публикации *</Label>
                <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Текст публикации..." rows={6} className="text-sm" />
              </div>
              <div className="p-3 bg-muted/40 border border-border text-[11px] text-muted-foreground">
                <Icon name="Info" size={11} className="inline mr-1" />
                Публикация будет рассмотрена редакторами ГТРК. Медиафайлы не поддерживаются — только текст.
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSubmitOpen(false)} className="flex-1 text-xs">Отмена</Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!form.channelId || !form.title || !form.content}
                  className="flex-1 bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide"
                >
                  Отправить на модерацию
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
