import { DynamicFloatingEmojis } from '@/components/features/getStarted/floatingEmojis';
import Footer from '@/components/features/getStarted/footer';
import { Header } from '@/components/shared/layout/header';
import MainContent from '@/components/features/getStarted/mainContent';

export const GetStartedPage = () => {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <DynamicFloatingEmojis />

      <div className="relative z-10 flex flex-col min-h-screen p-6">
        <Header centerContent={<span className="text-4xl">🌟</span>} />
        <MainContent />
        <Footer />
      </div>
    </main>
  );
};
