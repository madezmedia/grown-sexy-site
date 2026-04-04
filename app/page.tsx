import { getHomepageSettings } from '@/lib/homepage';
import HomePageClient from '@/components/home/HomePageClient';

export default function Home() {
  const settings = getHomepageSettings();

  return <HomePageClient settings={settings} />;
}
