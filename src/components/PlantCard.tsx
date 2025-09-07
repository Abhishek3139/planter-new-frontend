import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Plant } from '../types';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlantCardProps {
  plant: Plant;
  onViewDetails: (plant: Plant) => void;
}

export function PlantCard({ plant, onViewDetails }: PlantCardProps) {
  const { addToCart } = useCart();

  const getCareColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLightIcon = (light: string) => {
    switch (light) {
      case 'low': return '🌙';
      case 'medium': return '☁️';
      case 'bright': return '☀️';
      default: return '💡';
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={plant.image}
          alt={plant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {plant.featured && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {plant.petFriendly && (
            <Badge variant="secondary">
              🐾 Pet Safe
            </Badge>
          )}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">{plant.name}</h3>
            <span className="text-lg font-semibold text-primary">${plant.price}</span>
          </div>
          
          <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
          
          <p className="text-sm text-muted-foreground line-clamp-2">{plant.description}</p>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={getCareColor(plant.careLevel)}>
              {plant.careLevel} care
            </Badge>
            <span className="text-sm text-muted-foreground">
              {getLightIcon(plant.light)} {plant.light} light
            </span>
          </div>
          
          {plant.inStock < 5 && plant.inStock > 0 && (
            <p className="text-sm text-orange-600">Only {plant.inStock} left in stock!</p>
          )}
          
          {plant.inStock === 0 && (
            <p className="text-sm text-red-600">Out of stock</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewDetails(plant)}
          className="flex-1"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
        
        <Button 
          size="sm" 
          onClick={() => addToCart(plant)}
          disabled={plant.inStock === 0}
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}