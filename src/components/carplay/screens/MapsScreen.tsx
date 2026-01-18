import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Navigation, Search, Mic, MapPin, Clock, Star, Locate, Plus, Minus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom blue marker for current location
const currentLocationIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="
    width: 24px;
    height: 24px;
    background: #3b82f6;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(59, 130, 246, 0.5);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface MapsScreenProps {
  onBack: () => void;
}

// Component to handle map controls
const MapControls = ({ onLocate }: { onLocate: () => void }) => {
  const map = useMap();

  return (
    <div className="absolute bottom-36 right-4 z-[1000] flex flex-col gap-2">
      <motion.button
        onClick={() => map.zoomIn()}
        className="w-10 h-10 glass-effect rounded-xl flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5 text-foreground" />
      </motion.button>
      <motion.button
        onClick={() => map.zoomOut()}
        className="w-10 h-10 glass-effect rounded-xl flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
      >
        <Minus className="w-5 h-5 text-foreground" />
      </motion.button>
      <motion.button
        onClick={onLocate}
        className="w-10 h-10 glass-effect rounded-xl flex items-center justify-center"
        whileTap={{ scale: 0.95 }}
      >
        <Locate className="w-5 h-5 text-primary" />
      </motion.button>
    </div>
  );
};

// Component to fly to location
const FlyToLocation = ({ position }: { position: [number, number] | null }) => {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
};

const MapsScreen = ({ onBack }: MapsScreenProps) => {
  const [userPosition, setUserPosition] = useState<[number, number]>([48.8566, 2.3522]); // Paris par défaut
  const [flyToPosition, setFlyToPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const recentPlaces = [
    { name: 'Maison', address: '12 Rue de Paris', icon: Star, coords: [48.8606, 2.3376] as [number, number] },
    { name: 'Bureau', address: '45 Avenue des Champs-Élysées', icon: MapPin, coords: [48.8698, 2.3075] as [number, number] },
    { name: 'Tour Eiffel', address: 'Champ de Mars', icon: Clock, coords: [48.8584, 2.2945] as [number, number] },
  ];

  const handleLocate = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserPosition(newPos);
          setFlyToPosition(newPos);
          setIsLocating(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const handlePlaceClick = (coords: [number, number]) => {
    setFlyToPosition(coords);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simple geocoding search using Nominatim
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            setFlyToPosition(coords);
          }
        })
        .catch(err => console.error('Erreur de recherche:', err));
    }
  };

  return (
    <div className="screen-transition h-full pt-16 pb-28 relative">
      {/* Map Container */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={userPosition}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {/* Current location marker */}
          <Marker position={userPosition} icon={currentLocationIcon}>
            <Popup>
              <span className="font-medium">Votre position</span>
            </Popup>
          </Marker>

          {/* Recent places markers */}
          {recentPlaces.map((place) => (
            <Marker key={place.name} position={place.coords}>
              <Popup>
                <div className="text-center">
                  <p className="font-medium">{place.name}</p>
                  <p className="text-sm text-gray-600">{place.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <FlyToLocation position={flyToPosition} />
          <MapControls onLocate={handleLocate} />
        </MapContainer>
      </div>

      {/* Header Overlay */}
      <div className="relative z-10 px-6 pt-4">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-4 glass-effect rounded-full px-3 py-2"
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour</span>
        </motion.button>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="glass-effect rounded-2xl p-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une destination..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button 
            type="button"
            className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors"
          >
            <Mic className="w-5 h-5 text-primary" />
          </button>
        </motion.form>
      </div>

      {/* Recent Places */}
      <motion.div
        className="absolute bottom-32 left-6 right-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-3 glass-effect inline-block px-3 py-1 rounded-full">
          Récents
        </h3>
        <div className="space-y-2">
          {recentPlaces.map((place, index) => (
            <motion.button
              key={place.name}
              onClick={() => handlePlaceClick(place.coords)}
              className="w-full glass-effect rounded-xl p-4 flex items-center gap-4 text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl bg-carplay-maps/20 flex items-center justify-center">
                <place.icon className="w-5 h-5 text-carplay-maps" />
              </div>
              <div>
                <p className="font-medium text-foreground">{place.name}</p>
                <p className="text-sm text-muted-foreground">{place.address}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Loading indicator */}
      {isLocating && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50">
          <div className="glass-effect rounded-2xl p-6 flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-foreground">Localisation en cours...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapsScreen;

/*
===========================================
CODE COMPLET À TÉLÉCHARGER
===========================================

Pour utiliser ce composant, vous devez:

1. Installer les dépendances:
   npm install leaflet react-leaflet @types/leaflet

2. Importer les styles Leaflet dans votre fichier principal (index.css ou App.tsx):
   import 'leaflet/dist/leaflet.css';

3. Le composant utilise:
   - OpenStreetMap (gratuit, pas de clé API nécessaire)
   - Nominatim pour la recherche d'adresses
   - Géolocalisation du navigateur

Fonctionnalités:
- Carte interactive avec zoom/pan
- Géolocalisation de l'utilisateur
- Recherche d'adresses
- Marqueurs pour les lieux récents
- Animations fluides avec Framer Motion
- Design glassmorphism

*/
