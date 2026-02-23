import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Channel, CHANNEL_TYPE_LABELS, CHANNEL_TYPE_COLORS, ChannelType } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const TYPE_FILTERS: { label: string; value: ChannelType | 'all' }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Государственные', value: 'state' },
  { label: 'Региональные', value: 'regional' },
  { label: 'Частные', value: 'private' },
  { label: 'Международные', value: 'international' },
  { label: 'Иностранные', value: 'foreign' },
  { label: 'Иное', value: 'other' },
];

export default function ChannelsPage() {
  const { channels, user, addChannel, setPage } = useApp();
  const [filter, setFilter] = useState<ChannelType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', telegramLink: '' });

  const filtered = channels.filter(c => {
    const matchType = filter === 'all' || c.type === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  const handleCreate = () => {
    if (!form.name.trim()) return;
    addChannel({
      name: form.name,
      description: form.description,
      type: 'other',
      telegramLink: form.telegramLink || undefined,
      createdAt: new Date().toISOString().split('T')[0],
      ownerId: user!.id,
    });
    setForm({ name: '', description: '', telegramLink: '' });
    setCreateOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="section-title">Реестр СМИ</div>
          <h1 className="text-2xl font-semibold">Каналы и издания</h1>
        </div>
        {user && (
          <Button
            onClick={() => setCreateOpen(true)}
            className="bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide"
          >
            <Icon name="PlusCircle" size={14} />
            Зарегистрировать канал
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию или описанию..."
            className="pl-9 text-sm"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {TYPE_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`text-[10px] font-medium uppercase tracking-wide px-3 py-1.5 border transition-colors ${
                filter === value
                  ? 'bg-[hsl(220,60%,18%)] text-white border-[hsl(220,60%,18%)]'
                  : 'border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Icon name="Tv" size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Каналы не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(ch => (
            <ChannelCard key={ch.id} channel={ch} onOpen={() => setPage('channel', ch.id)} />
          ))}
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Зарегистрировать канал</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Название канала *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Название издания" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Описание</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Краткое описание канала" rows={3} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Ссылка на Telegram-канал</Label>
              <Input value={form.telegramLink} onChange={e => setForm(f => ({ ...f, telegramLink: e.target.value }))} placeholder="https://t.me/yourchannel" />
              <p className="text-[11px] text-muted-foreground">Посты из канала будут синхронизироваться автоматически (без медиафайлов)</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-sm">
              <p className="text-[11px] text-amber-800">
                <Icon name="Info" size={11} className="inline mr-1" />
                После регистрации канал будет отправлен на верификацию администраторам ГТРК.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCreateOpen(false)} className="flex-1 text-xs">Отмена</Button>
              <Button onClick={handleCreate} className="flex-1 bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide">
                Подать заявку
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ChannelCard({ channel, onOpen }: { channel: Channel; onOpen: () => void }) {
  return (
    <article onClick={onOpen} className="card-news p-5 cursor-pointer group animate-fade-in">
      <div className="flex items-start justify-between mb-3">
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
      <h3 className="text-sm font-semibold mb-1.5 group-hover:text-[hsl(220,60%,25%)] transition-colors">
        {channel.name}
      </h3>
      <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2 mb-4">
        {channel.description}
      </p>
      <div className="flex items-center gap-4 pt-3 border-t border-border text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Icon name="Users" size={11} />
          {channel.subscribersCount.toLocaleString('ru-RU')}
        </span>
        <span className="flex items-center gap-1">
          <Icon name="FileText" size={11} />
          {channel.postsCount}
        </span>
        {channel.telegramLink && (
          <span className="flex items-center gap-1 text-sky-600">
            <Icon name="Send" size={11} />
            Telegram
          </span>
        )}
        <Icon name="ArrowRight" size={13} className="ml-auto text-muted-foreground/30 group-hover:text-amber-500 transition-colors" />
      </div>
    </article>
  );
}
