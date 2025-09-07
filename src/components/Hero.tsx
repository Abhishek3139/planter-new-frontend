import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Leaf, Heart, Truck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onViewChange: (view: string) => void;
}

export function Hero({ onViewChange }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-950">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Bring Nature
                <span className="text-green-600 dark:text-green-400"> Home</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Discover our curated collection of beautiful, healthy plants that will transform your space into a green oasis.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => onViewChange('shop')}
                className="bg-green-600 hover:bg-green-700 text-white group"
              >
                Shop Plants
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => onViewChange('about')}
              >
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Hand-picked plants</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">Care Support</h3>
                  <p className="text-sm text-muted-foreground">Expert guidance</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">Fast Delivery</h3>
                  <p className="text-sm text-muted-foreground">Safe shipping</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudHMlMjBob21lfGVufDF8fHx8MTc1NjY5NzYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Beautiful indoor plants in a bright living room"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 dark:bg-green-800 rounded-full mix-blend-multiply opacity-70 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-emerald-200 dark:bg-emerald-800 rounded-full mix-blend-multiply opacity-70 animate-pulse delay-75"></div>
          </div>
        </div>
      </section>
    </div>
  );
}