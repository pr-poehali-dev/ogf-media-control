import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const REASONS = [
  'Распространение заведомо ложной информации',
  'Нарушение законодательства ОГФ',
  'Разжигание розни и ненависти',
  'Оскорбление органов власти',
  'Пропаганда запрещённой деятельности',
  'Нарушение авторских прав',
  'Иное нарушение',
];

export default function ComplaintPage() {
  const { addComplaint, user } = useApp();
  const [form, setForm] = useState({
    targetType: '' as 'post' | 'comment' | 'channel' | '',
    targetId: '',
    reason: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.targetType || !form.reason || !form.description) return;
    addComplaint({
      targetId: form.targetId,
      targetType: form.targetType as 'post' | 'comment' | 'channel',
      reason: form.reason,
      description: form.description,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ targetType: '', targetId: '', reason: '', description: '' });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 bg-[hsl(220,60%,18%)] flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCheck" size={28} className="text-amber-400" />
        </div>
        <h2 className="text-xl font-semibold mb-3">Жалоба принята</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md mx-auto">
          Ваше обращение зарегистрировано в системе ГТРК. Модераторы рассмотрят его в установленный срок.
          По результатам рассмотрения могут быть приняты меры в отношении нарушителя.
        </p>
        <div className="p-4 border border-border bg-card text-left mb-6">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Реквизиты обращения</div>
          <div className="font-mono text-xs">№ {Date.now().toString().slice(-8)}</div>
          <div className="text-[11px] text-muted-foreground mt-1">
            {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <Button onClick={handleReset} variant="outline" className="text-xs uppercase tracking-wide">
          Подать новую жалобу
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="section-title">Служба контроля</div>
      <h1 className="text-2xl font-semibold mb-2">Пожаловаться на контент</h1>
      <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
        Если вы обнаружили нарушение стандартов ГТРК, заполните форму обращения. Все жалобы рассматриваются модераторами федерального регулятора.
      </p>

      {!user && (
        <div className="p-4 border border-amber-200 bg-amber-50 text-amber-800 text-xs mb-6 flex items-start gap-2">
          <Icon name="Info" size={14} className="mt-0.5 shrink-0" />
          <span>Жалобу можно подать без авторизации. Для отслеживания статуса обращения рекомендуем войти в систему.</span>
        </div>
      )}

      <div className="border border-border bg-card p-6 space-y-5">
        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Тип нарушения *</Label>
          <Select value={form.targetType} onValueChange={v => setForm(f => ({ ...f, targetType: v as 'post' | 'comment' | 'channel' }))}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Выберите тип объекта жалобы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">Публикация</SelectItem>
              <SelectItem value="comment">Комментарий</SelectItem>
              <SelectItem value="channel">Канал / Издание</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">
            Ссылка или идентификатор материала
          </Label>
          <Input
            value={form.targetId}
            onChange={e => setForm(f => ({ ...f, targetId: e.target.value }))}
            placeholder="Вставьте ссылку или опишите материал"
            className="text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Основание жалобы *</Label>
          <Select value={form.reason} onValueChange={v => setForm(f => ({ ...f, reason: v }))}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="Выберите основание" />
            </SelectTrigger>
            <SelectContent>
              {REASONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Описание нарушения *</Label>
          <Textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            placeholder="Подробно опишите суть нарушения, укажите конкретные фрагменты или действия..."
            rows={5}
            className="text-sm"
          />
        </div>

        <div className="p-3 bg-muted/40 border border-border text-[11px] text-muted-foreground">
          <Icon name="Scale" size={11} className="inline mr-1" />
          Подача заведомо ложных жалоб является нарушением Регламента ГТРК и может повлечь санкции в отношении обратившегося.
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!form.targetType || !form.reason || !form.description}
          className="w-full bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide"
        >
          <Icon name="Flag" size={14} />
          Подать жалобу
        </Button>
      </div>
    </div>
  );
}
