import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/context/AppContext';
import Icon from '@/components/ui/icon';

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = 'phone' | 'code' | 'profile' | 'admin_code';

export default function AuthModal({ open, onClose }: Props) {
  const { setUser } = useApp();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [adminCodeError, setAdminCodeError] = useState('');
  const [isNew, setIsNew] = useState(true);
  const [error, setError] = useState('');

  const ADMIN_CODE = 'UCF';

  const handlePhoneSubmit = () => {
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Введите корректный номер телефона');
      return;
    }
    setError('');
    setStep('code');
  };

  const handleCodeSubmit = () => {
    if (code.length < 4) {
      setError('Введите код из SMS');
      return;
    }
    setError('');
    if (isNew) {
      setStep('profile');
    } else {
      setUser({
        id: Date.now().toString(),
        phone,
        nickname: 'Гражданин_' + Math.floor(Math.random() * 9999),
        phoneVisible: false,
        role: 'user',
      });
      onClose();
      resetForm();
    }
  };

  const handleProfileSubmit = () => {
    if (nickname.length < 3) {
      setError('Никнейм должен быть не менее 3 символов');
      return;
    }
    setError('');
    setStep('admin_code');
  };

  const handleFinish = () => {
    let role: 'user' | 'admin' = 'user';
    if (adminCode) {
      if (adminCode !== ADMIN_CODE) {
        setAdminCodeError('Неверный код. Доступ администратора не предоставлен.');
        role = 'user';
      } else {
        role = 'admin';
        setAdminCodeError('');
      }
    }
    setUser({
      id: Date.now().toString(),
      phone,
      nickname,
      phoneVisible,
      role,
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep('phone');
    setPhone('');
    setCode('');
    setNickname('');
    setPhoneVisible(false);
    setAdminCode('');
    setAdminCodeError('');
    setError('');
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-border">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[hsl(220,60%,18%)] flex items-center justify-center text-amber-500 text-xs font-bold font-mono shrink-0">
              ОГФ
            </div>
            <DialogTitle className="text-base font-semibold">
              {step === 'phone' && 'Вход в систему'}
              {step === 'code' && 'Подтверждение'}
              {step === 'profile' && 'Создание профиля'}
              {step === 'admin_code' && 'Завершение регистрации'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {step === 'phone' && (
            <>
              <div className="flex gap-2 border border-border rounded-sm p-0.5">
                <button
                  onClick={() => setIsNew(true)}
                  className={`flex-1 text-xs py-1.5 transition-colors font-medium uppercase tracking-wide ${isNew ? 'bg-[hsl(220,60%,18%)] text-white' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Регистрация
                </button>
                <button
                  onClick={() => setIsNew(false)}
                  className={`flex-1 text-xs py-1.5 transition-colors font-medium uppercase tracking-wide ${!isNew ? 'bg-[hsl(220,60%,18%)] text-white' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Войти
                </button>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Номер телефона</Label>
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (000) 000-00-00"
                  type="tel"
                  className="font-mono"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                На указанный номер будет отправлен код подтверждения. Номер телефона можно скрыть от других пользователей.
              </p>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button onClick={handlePhoneSubmit} className="w-full bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide">
                Получить код
              </Button>
            </>
          )}

          {step === 'code' && (
            <>
              <p className="text-sm text-muted-foreground">
                Введите 4-значный код, отправленный на номер <span className="text-foreground font-medium">{phone}</span>
              </p>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Код из SMS</Label>
                <Input
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="0000"
                  maxLength={6}
                  className="font-mono text-center text-lg tracking-widest"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Send" size={12} />
                Для входа через Telegram-бот: отправьте /login в @OGF_GTRK_bot и введите полученный код
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('phone')} className="flex-1 text-xs">Назад</Button>
                <Button onClick={handleCodeSubmit} className="flex-1 bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide">
                  Подтвердить
                </Button>
              </div>
            </>
          )}

          {step === 'profile' && (
            <>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Никнейм</Label>
                <Input
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder="Гражданин_ОГФ"
                  className="font-mono"
                />
                <p className="text-[11px] text-muted-foreground">Отображается публично. Используется для поиска.</p>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-sm">
                <div>
                  <p className="text-xs font-medium">Показывать номер телефона</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Другие пользователи смогут видеть ваш номер</p>
                </div>
                <Switch checked={phoneVisible} onCheckedChange={setPhoneVisible} />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('code')} className="flex-1 text-xs">Назад</Button>
                <Button onClick={handleProfileSubmit} className="flex-1 bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide">
                  Далее
                </Button>
              </div>
            </>
          )}

          {step === 'admin_code' && (
            <>
              <div className="p-3 border border-border rounded-sm bg-muted/30">
                <p className="text-xs font-medium mb-1">Профиль создан</p>
                <p className="text-[11px] text-muted-foreground">Никнейм: <span className="font-mono text-foreground">@{nickname}</span></p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                  Код доступа администратора <span className="text-muted-foreground/60">(необязательно)</span>
                </Label>
                <Input
                  value={adminCode}
                  onChange={e => { setAdminCode(e.target.value.toUpperCase()); setAdminCodeError(''); }}
                  placeholder="Трёхзначный код"
                  maxLength={3}
                  className="font-mono text-center tracking-widest uppercase"
                />
                <p className="text-[11px] text-muted-foreground">Если у вас есть код администратора — введите его. Иначе оставьте поле пустым.</p>
                {adminCodeError && <p className="text-xs text-amber-600">{adminCodeError}</p>}
              </div>
              <Button onClick={handleFinish} className="w-full bg-[hsl(220,60%,18%)] hover:bg-[hsl(220,60%,24%)] text-white text-xs uppercase tracking-wide">
                Завершить регистрацию
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
