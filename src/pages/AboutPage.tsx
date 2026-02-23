import Icon from '@/components/ui/icon';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="bg-[hsl(220,60%,18%)] text-white p-8 mb-8 ogf-border-top">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-500 flex items-center justify-center text-[hsl(220,60%,18%)] text-xs font-bold font-mono">ОГФ</div>
          <div>
            <div className="text-xs text-white/40 uppercase tracking-widest">Официальный документ</div>
            <div className="text-sm font-medium">Государственная Телерадиокомпания</div>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">О Федерации и ГТРК</h1>
        <p className="text-white/60 text-sm">Объединённая Гражданская Федерация — Wild Politics</p>
      </div>

      <div className="space-y-8">
        {/* About OGF */}
        <section className="border border-border bg-card p-6">
          <div className="ogf-accent-bar" />
          <h2 className="text-lg font-semibold mb-3">Объединённая Гражданская Федерация</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Объединённая Гражданская Федерация (ОГФ) — государственное образование в игре Wild Politics,
            основанное на принципах демократии, верховенства закона и гражданского участия. Федерация
            объединяет разнообразные регионы и обеспечивает гражданам равные права и возможности.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Политическая система ОГФ построена на разделении властей: законодательной, исполнительной
            и судебной. Федеральный парламент принимает законы, правительство обеспечивает их исполнение,
            а независимая судебная система гарантирует соблюдение конституционных прав граждан.
          </p>
        </section>

        {/* About GTRK */}
        <section className="border border-border bg-card p-6">
          <div className="ogf-accent-bar" />
          <h2 className="text-lg font-semibold mb-3">Государственная Телерадиокомпания</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            ГТРК ОГФ — федеральный регулятор в сфере средств массовой информации. Компания осуществляет
            лицензирование СМИ, верификацию медиаканалов и контроль за соблюдением стандартов
            журналистской деятельности на территории федерации.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            В функции ГТРК входит ведение реестра зарегистрированных СМИ, рассмотрение жалоб на
            медиаконтент, а также организация официального государственного вещания через подконтрольные
            федеральные каналы.
          </p>
        </section>

        {/* Channel types */}
        <section className="border border-border bg-card p-6">
          <div className="ogf-accent-bar" />
          <h2 className="text-lg font-semibold mb-4">Типы средств массовой информации</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { type: 'Государственные СМИ', desc: 'Учреждены федеральными органами власти, финансируются из государственного бюджета', color: 'bg-blue-900 text-blue-100' },
              { type: 'Региональные СМИ', desc: 'Освещают события отдельных территорий и регионов федерации', color: 'bg-emerald-800 text-emerald-100' },
              { type: 'Частные СМИ', desc: 'Независимые издания, принадлежащие физическим или юридическим лицам', color: 'bg-slate-700 text-slate-100' },
              { type: 'Международные СМИ', desc: 'Ведут деятельность в нескольких государствах, имеют международный охват', color: 'bg-violet-800 text-violet-100' },
              { type: 'Иностранные СМИ', desc: 'Зарегистрированы за пределами ОГФ, работают по специальным разрешениям', color: 'bg-orange-800 text-orange-100' },
              { type: 'Иные', desc: 'Прочие категории изданий и медиаканалов', color: 'bg-gray-600 text-gray-100' },
            ].map(({ type, desc, color }) => (
              <div key={type} className="flex gap-3 p-3 border border-border">
                <span className={`badge-state text-[9px] h-fit shrink-0 mt-0.5 ${color}`}>{type.split(' ')[0]}</span>
                <div>
                  <div className="text-xs font-medium mb-1">{type}</div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contacts */}
        <section className="border border-border bg-card p-6">
          <div className="ogf-accent-bar" />
          <h2 className="text-lg font-semibold mb-4">Контакты и обращения</h2>
          <div className="space-y-3">
            {[
              { icon: 'Send', label: 'Telegram ГТРК', value: '@OGF_GTRK_bot', desc: 'Официальный бот для уведомлений и авторизации' },
              { icon: 'Shield', label: 'Жалобы на контент', value: 'Раздел «Пожаловаться»', desc: 'Форма обращений по нарушениям в медиаконтенте' },
              { icon: 'FileText', label: 'Регистрация СМИ', value: 'Раздел «Каналы»', desc: 'Подача заявления на регистрацию нового издания' },
            ].map(({ icon, label, value, desc }) => (
              <div key={label} className="flex gap-3 p-3 border border-border">
                <Icon name={icon as 'Send'} size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-medium">{label}</div>
                  <div className="text-xs text-[hsl(220,60%,30%)] font-medium mt-0.5">{value}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
