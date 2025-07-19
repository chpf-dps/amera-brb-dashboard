import React, { useState, useEffect } from 'react';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewsItem {
  type: 'warning' | 'info' | 'success';
  message: string;
}

const NewsTicker: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch from news.md
    // For now, we'll use placeholder data
    const mockNews: NewsItem[] = [
      { type: 'warning', message: 'Nächster Hafen: Palma de Mallorca - Ankunft 08:00 Uhr' },
      { type: 'info', message: 'WiFi-Status: Starkes Signal verfügbar' },
      { type: 'success', message: 'Ausflugsbuchungen für Mallorca sind geöffnet' }
    ];
    setNews(mockNews);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (news.length === 0) return null;

  return (
    <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {news.map((item, index) => (
            <Alert key={index} variant={getVariant(item.type)} className="min-w-fit whitespace-nowrap">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <AlertDescription className="font-medium">
                  {item.message}
                </AlertDescription>
              </div>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;