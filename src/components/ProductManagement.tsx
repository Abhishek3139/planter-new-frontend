import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { mockPlants } from '../data/mockData';
import { Plant } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [plants, setPlantsState] = useState(mockPlants);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Partial<Plant>>({});

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (plant: Plant) => {
    setEditingPlant(plant);
    setSelectedPlant(plant);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPlant({
      id: '',
      name: '',
      scientificName: '',
      price: 0,
      description: '',
      image: '',
      category: 'houseplant',
      careLevel: 'easy',
      light: 'medium',
      water: 'medium',
      humidity: 'medium',
      petFriendly: false,
      inStock: 0,
      featured: false,
    });
    setSelectedPlant(null);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (selectedPlant) {
      // Update existing plant
      setPlantsState(plants.map(p => p.id === selectedPlant.id ? { ...editingPlant as Plant } : p));
    } else {
      // Add new plant
      const newPlant = {
        ...editingPlant,
        id: `new-${Date.now()}`,
      } as Plant;
      setPlantsState([...plants, newPlant]);
    }
    setIsDialogOpen(false);
    setEditingPlant({});
    setSelectedPlant(null);
  };

  const handleDelete = (plantId: string) => {
    if (confirm('Are you sure you want to delete this plant?')) {
      setPlantsState(plants.filter(p => p.id !== plantId));
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (stock < 5) return { label: 'Low Stock', color: 'bg-orange-100 text-orange-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Management</CardTitle>
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">
              {filteredPlants.length} products
            </Badge>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlants.map((plant) => {
                  const stockStatus = getStockStatus(plant.inStock);
                  return (
                    <TableRow key={plant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={plant.image}
                            alt={plant.name}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{plant.name}</div>
                            <div className="text-sm text-muted-foreground">{plant.scientificName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {plant.category}
                        </Badge>
                      </TableCell>
                      <TableCell>${plant.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {plant.inStock < 5 && plant.inStock > 0 && (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                          {plant.inStock}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={stockStatus.color}>
                            {stockStatus.label}
                          </Badge>
                          {plant.featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(plant)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(plant.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedPlant ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={editingPlant.name || ''}
                  onChange={(e) => setEditingPlant({ ...editingPlant, name: e.target.value })}
                  placeholder="e.g., Fiddle Leaf Fig"
                />
              </div>

              <div>
                <Label htmlFor="scientificName">Scientific Name</Label>
                <Input
                  id="scientificName"
                  value={editingPlant.scientificName || ''}
                  onChange={(e) => setEditingPlant({ ...editingPlant, scientificName: e.target.value })}
                  placeholder="e.g., Ficus lyrata"
                />
              </div>

              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={editingPlant.price || ''}
                  onChange={(e) => setEditingPlant({ ...editingPlant, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <Label htmlFor="inStock">Stock Quantity</Label>
                <Input
                  id="inStock"
                  type="number"
                  value={editingPlant.inStock || ''}
                  onChange={(e) => setEditingPlant({ ...editingPlant, inStock: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editingPlant.image || ''}
                  onChange={(e) => setEditingPlant({ ...editingPlant, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingPlant.category || 'houseplant'}
                  onValueChange={(value) => setEditingPlant({ ...editingPlant, category: value as Plant['category'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="houseplant">Houseplant</SelectItem>
                    <SelectItem value="succulent">Succulent</SelectItem>
                    <SelectItem value="flowering">Flowering</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="careLevel">Care Level</Label>
                <Select
                  value={editingPlant.careLevel || 'easy'}
                  onValueChange={(value) => setEditingPlant({ ...editingPlant, careLevel: value as Plant['careLevel'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="light">Light Requirements</Label>
                <Select
                  value={editingPlant.light || 'medium'}
                  onValueChange={(value) => setEditingPlant({ ...editingPlant, light: value as Plant['light'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Light</SelectItem>
                    <SelectItem value="medium">Medium Light</SelectItem>
                    <SelectItem value="bright">Bright Light</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="water">Water Requirements</Label>
                <Select
                  value={editingPlant.water || 'medium'}
                  onValueChange={(value) => setEditingPlant({ ...editingPlant, water: value as Plant['water'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Water</SelectItem>
                    <SelectItem value="medium">Medium Water</SelectItem>
                    <SelectItem value="high">High Water</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="humidity">Humidity Requirements</Label>
                <Select
                  value={editingPlant.humidity || 'medium'}
                  onValueChange={(value) => setEditingPlant({ ...editingPlant, humidity: value as Plant['humidity'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Humidity</SelectItem>
                    <SelectItem value="medium">Medium Humidity</SelectItem>
                    <SelectItem value="high">High Humidity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingPlant.description || ''}
                  onChange={(e) => setEditingPlant({ ...editingPlant, description: e.target.value })}
                  placeholder="Describe the plant, its characteristics, and care instructions..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="petFriendly"
                    checked={editingPlant.petFriendly || false}
                    onCheckedChange={(checked) => setEditingPlant({ ...editingPlant, petFriendly: checked })}
                  />
                  <Label htmlFor="petFriendly">Pet Friendly</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={editingPlant.featured || false}
                    onCheckedChange={(checked) => setEditingPlant({ ...editingPlant, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {selectedPlant ? 'Update' : 'Add'} Product
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}