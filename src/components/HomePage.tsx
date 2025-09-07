import React from 'react';
import { Hero } from './Hero';
import { PlantCard } from './PlantCard';
import { Button } from './ui/button';
import { mockPlants } from '../data/mockData';
import { Plant } from '../types';
import { Star, Users, Award, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onViewChange: (view: string) => void;
  onViewPlant: (plant: Plant) => void;
}

export function HomePage({ onViewChange, onViewPlant }: HomePageProps) {
  const featuredPlants = mockPlants.filter(plant => plant.featured).slice(0, 3);

  return (
    <div>
      <Hero onViewChange={onViewChange} />
      
      {/* Featured Plants Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Plants</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of stunning plants perfect for any home or office
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onViewDetails={onViewPlant}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => onViewChange('shop')}
          >
            View All Plants
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 dark:bg-green-950/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-muted-foreground">Plant Varieties</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold">30 Day</div>
              <div className="text-muted-foreground">Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Planter?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                At Planter, we believe that everyone deserves to experience the joy and benefits of 
                living with plants. Our carefully curated collection features healthy, vibrant plants 
                that are perfect for plant parents of all experience levels.
              </p>
              <p>
                From air-purifying houseplants to stunning statement pieces, we provide everything 
                you need to create your own green sanctuary. Each plant comes with detailed care 
                instructions and ongoing support from our plant experts.
              </p>
            </div>
            <Button 
              className="mt-6" 
              variant="outline"
              onClick={() => onViewChange('about')}
            >
              Learn More About Us
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1664438279397-4422f095d786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZXBsYW50JTIwZ3JlZW4lMjBsZWF2ZXN8ZW58MXx8fHwxNzU2ODgyNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Beautiful green houseplant with lush leaves"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZWQlMjBwbGFudCUyMGluZG9vcnxlbnwxfHx8fDE3NTY4ODI1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Indoor potted plant in stylish container"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1682879398507-ea8d66d216f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHNlZWRsaW5nJTIwZ3Jvd2luZ3xlbnwxfHx8fDE3NTY4ODI1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Small plant seedling growing from soil"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1645256180737-74bafd63f81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBsYW50JTIwbGVhdmVzfGVufDF8fHx8MTc1Njg4MjU5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Tropical plant with large beautiful leaves"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}