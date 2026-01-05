import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

type TabType = 'chats' | 'contacts' | 'profile' | 'settings' | 'premium';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  level: number;
}

interface Contact {
  id: number;
  name: string;
  status: string;
  avatar: string;
  level: number;
  isOnline: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [isPremium, setIsPremium] = useState(false);

  const chats: Chat[] = [
    { id: 1, name: 'Игра', lastMessage: 'GG! Отличная игра 🎮', time: '14:32', unread: 3, avatar: '🎮', level: 45 },
    { id: 2, name: 'Общение', lastMessage: 'Завтра в 20:00 турнир', time: '13:15', unread: 0, avatar: '💬', level: 38 },
    { id: 3, name: 'Планы', lastMessage: 'Собираемся на рейд?', time: '12:48', unread: 7, avatar: '📋', level: 52 },
    { id: 4, name: 'Команды', lastMessage: 'Новый квест открыт!', time: '11:20', unread: 0, avatar: '👥', level: 41 },
  ];

  const contacts: Contact[] = [
    { id: 1, name: 'ShadowNinja', status: 'В игре', avatar: '🥷', level: 48, isOnline: true },
    { id: 2, name: 'FireMage', status: 'Не в сети', avatar: '🔥', level: 42, isOnline: false },
    { id: 3, name: 'IceWarrior', status: 'В игре', avatar: '❄️', level: 50, isOnline: true },
    { id: 4, name: 'ThunderKing', status: 'Не беспокоить', avatar: '⚡', level: 45, isOnline: false },
  ];

  const achievements: Achievement[] = [
    { id: 1, title: 'Разговорчивый', description: 'Отправь 100 сообщений', icon: '💬', unlocked: true, progress: 100 },
    { id: 2, title: 'Командный игрок', description: 'Создай 5 групповых чатов', icon: '👥', unlocked: true, progress: 100 },
    { id: 3, title: 'Ночной совенок', description: 'Отправь сообщение в 3 ночи', icon: '🦉', unlocked: false, progress: 0 },
    { id: 4, title: 'Стример', description: 'Будь онлайн 24 часа подряд', icon: '📹', unlocked: false, progress: 45 },
    { id: 5, title: 'Легенда чата', description: 'Отправь 1000 сообщений', icon: '⭐', unlocked: false, progress: 67 },
  ];

  const messages = [
    { id: 1, sender: 'DragonSlayer', text: 'Кто готов на рейд?', time: '14:28', isMine: false },
    { id: 2, sender: 'Ты', text: 'Я готов! Когда начинаем?', time: '14:29', isMine: true },
    { id: 3, sender: 'MysticMage', text: 'Через 10 минут собираемся', time: '14:30', isMine: false },
    { id: 4, sender: 'Ты', text: 'GG! Отличная игра 🎮', time: '14:32', isMine: true },
  ];

  const renderChats = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
      <div className="lg:col-span-1">
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="space-y-2 pr-4">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className={`p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedChat === chat.id
                    ? 'bg-primary/20 border-primary'
                    : 'bg-card hover:bg-muted'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12 bg-primary/30 text-2xl">
                      <AvatarFallback>{chat.avatar}</AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent">
                      {chat.level}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-secondary animate-pulse-glow">{chat.unread}</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Card className="lg:col-span-2 p-6 flex flex-col h-[calc(100vh-180px)]">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Avatar className="h-10 w-10 bg-primary/30 text-xl">
            <AvatarFallback>🎮</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">Игра</h2>
            <p className="text-xs text-muted-foreground">12 участников онлайн</p>
          </div>
        </div>

        <ScrollArea className="flex-1 py-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.isMine
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {!msg.isMine && (
                    <p className="text-xs font-semibold mb-1 text-accent">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <Input
            placeholder="Написать сообщение..."
            className="flex-1 bg-muted border-none"
          />
          <Button size="icon" className="bg-primary hover:bg-primary/90">
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderContacts = () => (
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-6 hover:scale-[1.02] transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="h-20 w-20 bg-primary/30 text-4xl">
                  <AvatarFallback>{contact.avatar}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-card ${
                    contact.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-accent">
                  {contact.level}
                </Badge>
              </div>
              <h3 className="font-bold mb-1">{contact.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{contact.status}</p>
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="MessageCircle" size={16} />
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="UserPlus" size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  const renderProfile = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="relative">
            <Avatar className="h-32 w-32 bg-gradient-to-br from-primary to-accent text-6xl">
              <AvatarFallback>🎮</AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-lg px-4 py-1">
              Уровень 42
            </Badge>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <h1 className="text-3xl font-bold">ProGamer2024</h1>
              {isPremium && (
                <span className="text-3xl animate-pulse-glow">👑</span>
              )}
            </div>
            <p className="text-muted-foreground mb-4">
              {isPremium ? '⭐ Premium Легенда' : 'Мастер общения'}
            </p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>До следующего уровня</span>
                  <span className="text-primary font-semibold">
                    2,340 / 5,000 XP {isPremium && '(x2 скорость)'}
                  </span>
                </div>
                <Progress value={46} className="h-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-primary">1,247</div>
            <div className="text-sm text-muted-foreground">Сообщений</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-secondary">24</div>
            <div className="text-sm text-muted-foreground">Друзей</div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <div className="text-3xl font-bold text-accent">15</div>
            <div className="text-sm text-muted-foreground">Чатов</div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">🏆 Достижения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`p-4 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-primary/20 to-accent/20 border-primary'
                  : 'bg-muted opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-4xl ${achievement.unlocked ? 'animate-scale-in' : ''}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  {!achievement.unlocked && achievement.progress > 0 && (
                    <>
                      <Progress value={achievement.progress} className="h-2 mb-1" />
                      <p className="text-xs text-muted-foreground">{achievement.progress}%</p>
                    </>
                  )}
                  {achievement.unlocked && (
                    <Badge className="bg-gradient-to-r from-primary to-accent">
                      Получено!
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <Card className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">⚙️ Настройки</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Игровой профиль</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Показывать уровень</span>
              <Badge className="bg-primary">Вкл</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Уведомления о достижениях</span>
              <Badge className="bg-primary">Вкл</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Показывать активность</span>
              <Badge className="bg-accent">Вкл</Badge>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Приватность</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Видимость онлайн-статуса</span>
              <Badge>Все</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>Кто может писать</span>
              <Badge>Друзья</Badge>
            </div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-primary to-accent">
          Сохранить изменения
        </Button>
      </div>
    </Card>
  );

  const renderPremium = () => (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block mb-4">
          <div className="text-7xl animate-pulse-glow">👑</div>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
          GameChat Premium
        </h1>
        <p className="text-xl text-muted-foreground">
          Получи максимум от общения — стань легендой!
        </p>
      </div>

      {!isPremium ? (
        <>
          <Card className="p-8 mb-6 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-primary/10 border-yellow-500/30">
            <div className="text-center mb-8">
              <div className="text-4xl font-bold mb-2">
                <span className="text-yellow-400">499₽</span>
                <span className="text-muted-foreground text-2xl">/месяц</span>
              </div>
              <p className="text-muted-foreground">или 4990₽/год (экономия 30%)</p>
            </div>

            <Button 
              className="w-full py-6 text-lg font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black"
              onClick={() => setIsPremium(true)}
            >
              🚀 Получить Premium
            </Button>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-6 hover:scale-[1.02] transition-all border-primary/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">👑</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Эксклюзивный статус</h3>
                  <p className="text-sm text-muted-foreground">
                    Золотая корона возле имени, уникальные бейджи и рамки профиля
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all border-accent/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚡</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Ускоренный рост</h3>
                  <p className="text-sm text-muted-foreground">
                    Получай в 2 раза больше опыта и быстрее прокачивайся
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all border-secondary/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎨</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Уникальные темы</h3>
                  <p className="text-sm text-muted-foreground">
                    Доступ к эксклюзивным темам оформления и анимациям
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all border-primary/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💎</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Премиум контент</h3>
                  <p className="text-sm text-muted-foreground">
                    Эксклюзивные эмодзи, стикеры и достижения
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all border-accent/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🚀</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Больше возможностей</h3>
                  <p className="text-sm text-muted-foreground">
                    До 100 чатов, 500 друзей и безлимитные сообщения
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all border-secondary/30">
              <div className="flex items-start gap-4">
                <div className="text-4xl">📊</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Расширенная статистика</h3>
                  <p className="text-sm text-muted-foreground">
                    Подробная аналитика активности и прогресса
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <Card className="p-8 text-center bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-primary/10 border-yellow-500/30">
          <div className="text-6xl mb-4 animate-scale-in">🎉</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Добро пожаловать в Premium!
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Теперь ты — легенда GameChat! Все премиум-функции активированы.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl mb-2">👑</div>
              <div className="text-sm font-semibold">Статус активен</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-semibold">x2 опыта</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-sm font-semibold">Всё разблокировано</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              GameChat
            </h1>
            <div className="flex items-center gap-2">
              {isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold animate-pulse-glow">
                  👑 PREMIUM
                </Badge>
              )}
              <Badge className="bg-gradient-to-r from-primary to-accent">
                🔥 42 LVL
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-none"
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={activeTab === 'chats' ? 'default' : 'outline'}
              onClick={() => setActiveTab('chats')}
              className="gap-2"
            >
              <Icon name="MessageSquare" size={18} />
              Чаты
            </Button>
            <Button
              variant={activeTab === 'contacts' ? 'default' : 'outline'}
              onClick={() => setActiveTab('contacts')}
              className="gap-2"
            >
              <Icon name="Users" size={18} />
              Контакты
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              className="gap-2"
            >
              <Icon name="User" size={18} />
              Профиль
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'outline'}
              onClick={() => setActiveTab('settings')}
              className="gap-2"
            >
              <Icon name="Settings" size={18} />
              Настройки
            </Button>
            <Button
              variant={activeTab === 'premium' ? 'default' : 'outline'}
              onClick={() => setActiveTab('premium')}
              className={`gap-2 ${activeTab !== 'premium' ? 'border-yellow-500/50 hover:bg-yellow-500/10' : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-none'}`}
            >
              <Icon name="Crown" size={18} />
              Premium
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {activeTab === 'chats' && renderChats()}
        {activeTab === 'contacts' && renderContacts()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'premium' && renderPremium()}
      </div>
    </div>
  );
};

export default Index;