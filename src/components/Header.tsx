import React, { useState } from 'react';
import { Search, Moon, Sun, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchResult {
  name: string;
  url: string;
  category: string;
}

const searchData: SearchResult[] = [
  { name: "Tefra", url: "https://tefra.com", category: "Tools" },
  { name: "PDF4", url: "https://pdf4.com", category: "Tools" },
  { name: "Schiffslogin", url: "https://ship-login.com", category: "Tools" },
  { name: "Windy", url: "https://windy.com", category: "Wetter" },
  { name: "Unsplash", url: "https://unsplash.com", category: "Fotos" },
  { name: "MarineTraffic", url: "https://marinetraffic.com", category: "Navigation" },
  { name: "ChatGPT", url: "https://chat.openai.com", category: "KI" },
  { name: "Pixlr", url: "https://pixlr.com", category: "Tools" }
];

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onOpenChat }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Phoenix Reisen</h1>
          <span className="text-accent font-medium">MS AMERA</span>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Suchen... (z.B. Tefra, Windy, PDF4)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
          </div>
          
          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
              {searchResults.map((result, index) => (
                <a
                  key={index}
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-muted/50 border-b last:border-b-0"
                >
                  <div className="font-medium text-foreground">{result.name}</div>
                  <div className="text-sm text-muted-foreground">{result.category}</div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenChat}
            className="text-primary-foreground hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
            className="text-primary-foreground hover:bg-white/10"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;