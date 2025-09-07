import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { ArrowLeft, ShoppingCart, Heart, Share2, Droplets, Sun, Wind, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Plant } from '../types';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlantPageProps {
  plant: Plant;
  onBack: () => void;
}

export function PlantPage({ plant, onBack }: PlantPageProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addToCart(plant, quantity);
    toast.success(`Added ${quantity} ${plant.name}${quantity > 1 ? 's' : ''} to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const getCareIcon = (type: string) => {
    switch (type) {
      case 'water':
        return <Droplets className="h-5 w-5" />;
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'humidity':
        return <Wind className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const getCareLevel = (level: string) => {
    const levels = {
      low: { label: 'Low', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      high: { label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
      bright: { label: 'Bright', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      easy: { label: 'Easy', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      hard: { label: 'Hard', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
    };
    return levels[level as keyof typeof levels] || { label: level, color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
            <ImageWithFallback
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{plant.category}</Badge>
              {plant.featured && <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Featured</Badge>}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{plant.name}</h1>
            <p className="text-muted-foreground italic mb-4">{plant.scientificName}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">${plant.price}</span>
              <Badge variant={plant.inStock > 0 ? 'default' : 'destructive'}>
                {plant.inStock > 0 ? `${plant.inStock} in stock` : 'Out of stock'}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{plant.description}</p>
          </div>

          <Separator />

          {/* Care Instructions */}
          <div>
            <h3 className="font-semibold mb-4">Care Instructions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getCareIcon('water')}
                    <div>
                      <div className="font-medium">Water</div>
                      <Badge className={getCareLevel(plant.water).color}>
                        {getCareLevel(plant.water).label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getCareIcon('light')}
                    <div>
                      <div className="font-medium">Light</div>
                      <Badge className={getCareLevel(plant.light).color}>
                        {getCareLevel(plant.light).label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getCareIcon('humidity')}
                    <div>
                      <div className="font-medium">Humidity</div>
                      <Badge className={getCareLevel(plant.humidity).color}>
                        {getCareLevel(plant.humidity).label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getCareIcon('care')}
                    <div>
                      <div className="font-medium">Care Level</div>
                      <Badge className={getCareLevel(plant.careLevel).color}>
                        {getCareLevel(plant.careLevel).label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">
                {plant.petFriendly ? 'Pet Friendly' : 'Not Pet Friendly'}
              </span>
            </div>
          </div>

          <Separator />

          {/* Purchase Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(plant.inStock, quantity + 1))}
                  disabled={quantity >= plant.inStock}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={plant.inStock === 0}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart - ${(plant.price * quantity).toFixed(2)}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleWishlist}
                className={isWishlisted ? 'text-red-600' : ''}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
              
              <Button size="lg" variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}