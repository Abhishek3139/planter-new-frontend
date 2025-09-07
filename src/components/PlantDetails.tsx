import React, { useState } from 'react';
import { Minus, Plus, ShoppingCart, Heart, Droplets, Sun, Gauge, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlantDetailsProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PlantDetails({ plant, isOpen, onClose }: PlantDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!plant) return null;

  const handleAddToCart = () => {
    addToCart(plant, quantity);
    onClose();
  };

  const getCareInfo = (level: string) => {
    switch (level) {
      case 'easy': return { color: 'text-green-600', description: 'Perfect for beginners' };
      case 'medium': return { color: 'text-yellow-600', description: 'Some experience helpful' };
      case 'hard': return { color: 'text-red-600', description: 'For experienced plant parents' };
      default: return { color: 'text-gray-600', description: 'Care level unknown' };
    }
  };

  const getLevelDescription = (level: string, type: string) => {
    const descriptions = {
      water: {
        low: 'Water sparingly, allow soil to dry completely',
        medium: 'Water when topsoil feels dry',
        high: 'Keep soil consistently moist'
      },
      light: {
        low: 'Thrives in low light or shade',
        medium: 'Prefers bright, indirect light',
        bright: 'Needs bright, direct sunlight'
      },
      humidity: {
        low: 'Tolerates dry air well',
        medium: 'Average household humidity is fine',
        high: 'Needs high humidity, consider a humidifier'
      }
    };
    return descriptions[type]?.[level] || `${level} ${type}`;
  };

  const careInfo = getCareInfo(plant.careLevel);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{plant.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative">
            <ImageWithFallback
              src={plant.image}
              alt={plant.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            
            {plant.featured && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            
            {plant.petFriendly && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                🐾 Pet Safe
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-lg text-muted-foreground italic mb-2">{plant.scientificName}</p>
              <p className="text-3xl font-semibold text-primary">${plant.price}</p>
            </div>

            <p className="text-muted-foreground">{plant.description}</p>

            <Separator />

            {/* Care Information */}
            <div className="space-y-3">
              <h4 className="font-medium">Care Information</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Care Level</p>
                    <p className={`text-sm font-medium ${careInfo.color}`}>
                      {plant.careLevel} - {careInfo.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Light</p>
                    <p className="text-sm font-medium">{getLevelDescription(plant.light, 'light')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Water</p>
                    <p className="text-sm font-medium">{getLevelDescription(plant.water, 'water')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Humidity</p>
                    <p className="text-sm font-medium">{getLevelDescription(plant.humidity, 'humidity')}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Stock Status */}
            <div>
              {plant.inStock > 0 ? (
                <p className="text-sm text-green-600">{plant.inStock} in stock</p>
              ) : (
                <p className="text-sm text-red-600">Out of stock</p>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm">{quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                
                <Button 
                  onClick={handleAddToCart}
                  disabled={plant.inStock === 0}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}