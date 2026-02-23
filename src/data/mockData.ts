export type ChannelType = 'state' | 'private' | 'regional' | 'international' | 'foreign' | 'other';
export type PostStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'user' | 'admin';

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: ChannelType;
  verified: boolean;
  subscribersCount: number;
  postsCount: number;
  telegramLink?: string;
  createdAt: string;
  ownerId: string;
}

export interface Post {
  id: string;
  channelId: string;
  channelName: string;
  channelType: ChannelType;
  title: string;
  content: string;
  status: PostStatus;
  publishedAt: string;
  views: number;
  commentsCount: number;
  fromTelegram: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorNickname: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface Complaint {
  id: string;
  targetId: string;
  targetType: 'post' | 'comment' | 'channel';
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'dismissed';
  createdAt: string;
}

export const CHANNEL_TYPE_LABELS: Record<ChannelType, string> = {
  state: 'Государственный',
  private: 'Частный',
  regional: 'Региональный',
  international: 'Международный',
  foreign: 'Иностранный',
  other: 'Иное',
};

export const CHANNEL_TYPE_COLORS: Record<ChannelType, string> = {
  state: 'bg-blue-900 text-blue-100',
  private: 'bg-slate-700 text-slate-100',
  regional: 'bg-emerald-800 text-emerald-100',
  international: 'bg-violet-800 text-violet-100',
  foreign: 'bg-orange-800 text-orange-100',
  other: 'bg-gray-600 text-gray-100',
};

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'ОГФ Вестник',
    description: 'Официальный государственный вестник Объединённой Гражданской Федерации. Новости, указы и официальные заявления.',
    type: 'state',
    verified: true,
    subscribersCount: 142800,
    postsCount: 3421,
    telegramLink: 'https://t.me/ogf_vestnik',
    createdAt: '2024-01-15',
    ownerId: 'admin1',
  },
  {
    id: '2',
    name: 'Федеральное Радио',
    description: 'Главная радиостанция федерации. Аналитика, интервью, прямые эфиры с заседаний парламента.',
    type: 'state',
    verified: true,
    subscribersCount: 89200,
    postsCount: 1872,
    telegramLink: 'https://t.me/federal_radio',
    createdAt: '2024-02-01',
    ownerId: 'admin1',
  },
  {
    id: '3',
    name: 'Северный Регион ТВ',
    description: 'Региональное телевидение северных территорий федерации.',
    type: 'regional',
    verified: true,
    subscribersCount: 34100,
    postsCount: 867,
    createdAt: '2024-03-10',
    ownerId: 'user2',
  },
  {
    id: '4',
    name: 'Деловые Новости',
    description: 'Независимое издание о бизнесе, экономике и финансах федерации.',
    type: 'private',
    verified: true,
    subscribersCount: 21500,
    postsCount: 542,
    telegramLink: 'https://t.me/business_news_ogf',
    createdAt: '2024-04-05',
    ownerId: 'user3',
  },
  {
    id: '5',
    name: 'World Observer',
    description: 'Международный канал. Новости мировой политики, дипломатии и международных отношений.',
    type: 'international',
    verified: true,
    subscribersCount: 67800,
    postsCount: 1243,
    createdAt: '2024-01-28',
    ownerId: 'user4',
  },
  {
    id: '6',
    name: 'Восточный Вестник',
    description: 'Региональный канал восточных территорий. Местные новости, культура, события.',
    type: 'regional',
    verified: false,
    subscribersCount: 8900,
    postsCount: 234,
    createdAt: '2024-06-12',
    ownerId: 'user5',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    channelId: '1',
    channelName: 'ОГФ Вестник',
    channelType: 'state',
    title: 'Президент подписал указ о развитии цифровой инфраструктуры федерации',
    content: 'Сегодня глава государства подписал указ №847 «О развитии цифровой инфраструктуры Объединённой Гражданской Федерации». Документ предусматривает выделение значительных ресурсов на модернизацию телекоммуникационных сетей, создание федеральных центров обработки данных и развитие государственных цифровых сервисов.\n\nВ рамках реализации указа планируется создание единой цифровой платформы для взаимодействия граждан с государственными органами, а также внедрение современных систем кибербезопасности для защиты критической информационной инфраструктуры.',
    status: 'approved',
    publishedAt: '2026-02-23T09:15:00',
    views: 48200,
    commentsCount: 127,
    fromTelegram: false,
  },
  {
    id: '2',
    channelId: '2',
    channelName: 'Федеральное Радио',
    channelType: 'state',
    title: 'Парламент принял поправки к медиазаконодательству',
    content: 'Федеральный парламент в третьем чтении принял пакет поправок к закону «О средствах массовой информации». Изменения направлены на совершенствование регулирования цифровых медиа и онлайн-платформ, усиление требований к верификации информации и установление чётких стандартов для работы иностранных СМИ на территории федерации.\n\nЗаконопроект был поддержан большинством депутатов. Поправки вступят в силу через 90 дней после официального опубликования.',
    status: 'approved',
    publishedAt: '2026-02-23T11:30:00',
    views: 31400,
    commentsCount: 89,
    fromTelegram: true,
  },
  {
    id: '3',
    channelId: '4',
    channelName: 'Деловые Новости',
    channelType: 'private',
    title: 'Федеральный банк снизил ключевую ставку на 0.5 процентных пункта',
    content: 'Совет директоров Федерального банка Объединённой Гражданской Федерации принял решение снизить ключевую ставку с 8,5% до 8,0% годовых. Решение принято по итогам анализа инфляционной динамики и состояния экономики федерации.\n\nПо мнению аналитиков, снижение ставки окажет положительное влияние на кредитную активность и будет способствовать экономическому росту.',
    status: 'approved',
    publishedAt: '2026-02-22T14:00:00',
    views: 19800,
    commentsCount: 54,
    fromTelegram: false,
  },
  {
    id: '4',
    channelId: '3',
    channelName: 'Северный Регион ТВ',
    channelType: 'regional',
    title: 'В северных территориях завершено строительство федеральной трассы',
    content: 'Сегодня состоялась торжественная церемония открытия нового участка федеральной автодороги протяжённостью 280 километров. Дорога соединит ключевые населённые пункты северных территорий и обеспечит круглогодичное транспортное сообщение с центральными районами федерации.',
    status: 'approved',
    publishedAt: '2026-02-22T10:00:00',
    views: 8700,
    commentsCount: 23,
    fromTelegram: true,
  },
  {
    id: '5',
    channelId: '1',
    channelName: 'ОГФ Вестник',
    channelType: 'state',
    title: 'Федерация заключила соглашение о сотрудничестве в сфере культуры',
    content: 'В ходе официального визита делегации Министерства культуры было подписано межгосударственное соглашение о культурном сотрудничестве. Документ предусматривает совместные культурные программы, обмен выставками и проведение совместных фестивалей.',
    status: 'approved',
    publishedAt: '2026-02-21T16:45:00',
    views: 12300,
    commentsCount: 31,
    fromTelegram: false,
  },
  {
    id: '6',
    channelId: '5',
    channelName: 'World Observer',
    channelType: 'international',
    title: 'Международный саммит по климату: итоги второго дня',
    content: 'На второй день международного климатического саммита стороны достигли предварительного соглашения по ключевым вопросам сокращения выбросов. Представители ОГФ подтвердили приверженность взятым климатическим обязательствам.',
    status: 'approved',
    publishedAt: '2026-02-21T19:00:00',
    views: 27600,
    commentsCount: 68,
    fromTelegram: true,
  },
  {
    id: '7',
    channelId: '4',
    channelName: 'Деловые Новости',
    channelType: 'private',
    title: 'Инвестиционный форум: итоги и ключевые соглашения',
    content: 'Завершился ежегодный инвестиционный форум ОГФ. По итогам мероприятия подписано 47 инвестиционных соглашений на общую сумму свыше 380 миллиардов единиц федеральной валюты. Наибольший интерес инвесторов вызвали проекты в сферах энергетики, транспортной инфраструктуры и цифровых технологий.',
    status: 'pending',
    publishedAt: '2026-02-23T08:00:00',
    views: 0,
    commentsCount: 0,
    fromTelegram: false,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    postId: '1',
    authorNickname: 'Гражданин_А',
    content: 'Важное решение для развития федерации. Ждём реализации.',
    createdAt: '2026-02-23T10:00:00',
    approved: true,
  },
  {
    id: '2',
    postId: '1',
    authorNickname: 'Технарь_47',
    content: 'Наконец-то серьёзный шаг в сторону цифровизации. Хотелось бы узнать подробности о центрах обработки данных.',
    createdAt: '2026-02-23T10:45:00',
    approved: true,
  },
  {
    id: '3',
    postId: '1',
    authorNickname: 'Аналитик_К',
    content: 'Посмотрим на исполнение. Подобных указов было много, важна практическая реализация.',
    createdAt: '2026-02-23T11:20:00',
    approved: false,
  },
  {
    id: '4',
    postId: '2',
    authorNickname: 'МедиаОбозреватель',
    content: 'Важный закон. Главное — чтобы не ограничивал свободу слова.',
    createdAt: '2026-02-23T12:00:00',
    approved: true,
  },
];
