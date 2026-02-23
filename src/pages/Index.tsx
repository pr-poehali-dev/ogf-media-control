import { AppProvider, useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ChannelsPage from '@/pages/ChannelsPage';
import ChannelDetailPage from '@/pages/ChannelDetailPage';
import PublicationsPage from '@/pages/PublicationsPage';
import NewsPage from '@/pages/NewsPage';
import AboutPage from '@/pages/AboutPage';
import ComplaintPage from '@/pages/ComplaintPage';
import ModerationPage from '@/pages/ModerationPage';
import PostDetailPage from '@/pages/PostDetailPage';

function AppRouter() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'channels': return <ChannelsPage />;
      case 'channel': return <ChannelDetailPage />;
      case 'publications': return <PublicationsPage />;
      case 'news': return <NewsPage />;
      case 'about': return <AboutPage />;
      case 'complaint': return <ComplaintPage />;
      case 'moderation': return <ModerationPage />;
      case 'post': return <PostDetailPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function Index() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
