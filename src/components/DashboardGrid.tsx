import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Cloud, 
  Ship, 
  Settings, 
  Image, 
  Brain, 
  MessageSquare,
  ExternalLink,
  MapPin,
  Camera,
  FileText,
  Monitor
} from 'lucide-react';

interface GridItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  category: 'tools' | 'weather' | 'ai' | 'marine';
}

const GridItem: React.FC<GridItemProps> = ({ title, children, className = "", category }) => {
  const categoryBg = {
    tools: 'bg-tools',
    weather: 'bg-weather', 
    ai: 'bg-ai',
    marine: 'bg-marine'
  };

  return (
    <Card className={`${categoryBg[category]} border-0 shadow-sm ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

interface ToolButtonProps {
  name: string;
  url: string;
  icon: React.ReactNode;
  description?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({ name, url, icon, description }) => (
  <Button
    variant="ghost"
    size="lg"
    className="h-20 flex flex-col items-center justify-center space-y-1 hover:bg-white/50 dark:hover:bg-black/20"
    onClick={() => window.open(url, '_blank')}
    title={description}
  >
    {icon}
    <span className="text-xs font-medium">{name}</span>
  </Button>
);

const DashboardGrid: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Row 1: Date & Weather */}
        <GridItem title="Heute" category="weather" className="lg:col-span-1">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">{currentDate}</p>
              <Badge variant="secondary" className="mt-1">MS Amera</Badge>
            </div>
          </div>
        </GridItem>

        <GridItem title="Wetter & Navigation" category="weather" className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => window.open('https://embed.windy.com/embed2.html?lat=39.571&lon=2.646&detailLat=39.571&detailLon=2.646&width=650&height=450&zoom=8&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1', '_blank')}
                variant="outline"
                size="sm"
              >
                <Cloud className="h-4 w-4 mr-2" />
                Windy Wetter
              </Button>
              <Button
                onClick={() => window.open('https://www.marinetraffic.com/en/ais/embed/zoom:10/centery:54.5/centerx:9.5/maptype:4/shownames:false/mmsi:0/trackvessel:0/fleet:false/fleet_id:0/fleet_name:false/fleet_hide_old_positions:false/showmenu:false', '_blank')}
                variant="outline"
                size="sm"
              >
                <Ship className="h-4 w-4 mr-2" />
                MarineTraffic
              </Button>
            </div>
            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">Wetter-Widget wird hier eingebettet</p>
            </div>
          </div>
        </GridItem>

        {/* Row 2: Tools */}
        <GridItem title="Tools & Schnellzugriffe" category="tools" className="lg:col-span-3">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <ToolButton
              name="Tefra"
              url="https://tefra.com"
              icon={<Settings className="h-6 w-6" />}
              description="Bordverwaltung"
            />
            <ToolButton
              name="PDF4"
              url="https://pdf4.com"
              icon={<FileText className="h-6 w-6" />}
              description="PDF Tools"
            />
            <ToolButton
              name="Schiffslogin"
              url="https://ship-login.com"
              icon={<Monitor className="h-6 w-6" />}
              description="System Login"
            />
            <ToolButton
              name="Unsplash"
              url="https://unsplash.com"
              icon={<Image className="h-6 w-6" />}
              description="Kostenlose Fotos"
            />
            <ToolButton
              name="Pixlr"
              url="https://pixlr.com"
              icon={<Camera className="h-6 w-6" />}
              description="Bildbearbeitung"
            />
            <ToolButton
              name="Trello"
              url="https://trello.com"
              icon={<MapPin className="h-6 w-6" />}
              description="Ausflug Management"
            />
          </div>
        </GridItem>

        {/* Row 3: Marine Traffic */}
        <GridItem title="Live Ship-Tracker" category="marine" className="lg:col-span-2">
          <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
            <p className="text-muted-foreground">MarineTraffic iFrame wird hier eingebettet</p>
          </div>
        </GridItem>

        {/* Row 4: AI & Chat */}
        <GridItem title="KI & Team Chat" category="ai" className="lg:col-span-1">
          <div className="space-y-3">
            <Button
              onClick={() => window.open('https://chat.openai.com', '_blank')}
              className="w-full"
              variant="default"
            >
              <Brain className="h-4 w-4 mr-2" />
              ChatGPT
            </Button>
            <Button
              onClick={() => window.open('https://tlk.io/amera-team', '_blank')}
              className="w-full"
              variant="outline"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Team Chat
            </Button>
          </div>
        </GridItem>

      </div>
    </div>
  );
};

export default DashboardGrid;