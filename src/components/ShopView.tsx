import React, { useState, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PlantCard } from './PlantCard';
import { Plant } from '../types';
import { mockPlants } from '../data/mockData';

interface ShopViewProps {
  searchQuery: string;
  onViewPlant: (plant: Plant) => void;
}

export function ShopView({ searchQuery, onViewPlant }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCareLevel, setSelectedCareLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedPlants = useMemo(() => {
    let filtered = mockPlants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      const matchesCareLevel = selectedCareLevel === 'all' || plant.careLevel === selectedCareLevel;
      
      return matchesSearch && matchesCategory && matchesCareLevel;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, selectedCareLevel, sortBy]);

  const featuredPlants = mockPlants.filter(plant => plant.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shop Plants</h1>
        <p className="text-muted-foreground">
          Discover our complete collection of beautiful, healthy plants for your home and office.
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="houseplant">Houseplants</SelectItem>
              <SelectItem value="succulent">Succulents</SelectItem>
              <SelectItem value="flowering">Flowering</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedCareLevel} onValueChange={setSelectedCareLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Care Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="featured">Featured First</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || selectedCareLevel !== 'all' || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="secondary">
              Search: "{searchQuery}"
            </Badge>
          )}
          
          {selectedCategory !== 'all' && (
            <Badge variant="secondary">
              Category: {selectedCategory}
            </Badge>
          )}
          
          {selectedCareLevel !== 'all' && (
            <Badge variant="secondary">
              Care: {selectedCareLevel}
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCareLevel('all');
            }}
            className="h-6 px-2 text-xs"
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedPlants.length} of {mockPlants.length} plants
        </p>
      </div>

      {/* Plant Grid */}
      {filteredAndSortedPlants.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1 md:grid-cols-2'
        }`}>
          {filteredAndSortedPlants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onViewDetails={onViewPlant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-medium mb-2">No plants found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedCareLevel('all');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}


    </div>
  );
}