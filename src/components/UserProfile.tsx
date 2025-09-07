import React, { useState } from 'react';
import { User, Order } from '../types';
import { mockUser, mockUserOrders } from '../data/mockData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User as UserIcon, Package, Calendar, MapPin, Phone, Mail, Edit3, Save, X, Truck } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  onViewChange?: (view: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking') => void;
}

export function UserProfile({ onViewChange }: UserProfileProps = {}) {
  const [user, setUser] = useState<User>(mockUser);
  const [userOrders] = useState<Order[]>(mockUserOrders);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(mockUser);

  const handleSaveProfile = () => {
    setUser(editedUser);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <UserIcon className="h-8 w-8 text-primary" />
          <div>
            <h1>My Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and view order history</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          {/* Profile Settings Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{user.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, email: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{user.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedUser.phone}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, phone: e.target.value })
                        }
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(user.joinDate)}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Street Address</Label>
                      {isEditing ? (
                        <Input
                          id="street"
                          value={editedUser.address.street}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              address: { ...editedUser.address, street: e.target.value },
                            })
                          }
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">{user.address.street}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editedUser.address.city}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              address: { ...editedUser.address, city: e.target.value },
                            })
                          }
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">{user.address.city}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          value={editedUser.address.state}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              address: { ...editedUser.address, state: e.target.value },
                            })
                          }
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">{user.address.state}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      {isEditing ? (
                        <Input
                          id="zipCode"
                          value={editedUser.address.zipCode}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              address: { ...editedUser.address, zipCode: e.target.value },
                            })
                          }
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">{user.address.zipCode}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      {isEditing ? (
                        <Input
                          id="country"
                          value={editedUser.address.country}
                          onChange={(e) =>
                            setEditedUser({
                              ...editedUser,
                              address: { ...editedUser.address, country: e.target.value },
                            })
                          }
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-md">{user.address.country}</div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
                <CardDescription>
                  View all your past and current orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3>No orders yet</h3>
                    <p className="text-muted-foreground">
                      Start shopping to see your orders here!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userOrders
                      .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime())
                      .map((order) => (
                        <Card key={order.id} className="border-l-4 border-l-primary">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4>Order #{order.id.toUpperCase()}</h4>
                                  <Badge className={getStatusColor(order.status)}>
                                    {order.status}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(order.orderDate)}
                                  </span>
                                  <span>${order.total.toFixed(2)}</span>
                                </div>
                              </div>
                               {/* Track Order Button */}
                               {(order.status === 'shipped' || order.status === 'delivered') && onViewChange && (
                                 <Button
                                   variant="outline"
                                   size="sm"
                                   onClick={() => onViewChange('order-tracking')}
                                   className="flex items-center gap-2"
                                 >
                                   <Truck className="h-4 w-4" />
                                   Track Package
                                 </Button>
                               )}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                                  <ImageWithFallback
                                    src={item.plant.image}
                                    alt={item.plant.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <h5>{item.plant.name}</h5>
                                    <p className="text-muted-foreground">
                                      {item.plant.scientificName}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p>Qty: {item.quantity}</p>
                                    <p>${(item.plant.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Order Status Information */}
                            {order.status !== 'delivered' && (
                              <div className="pt-4 border-t border-border">
                                <div className="flex flex-wrap gap-2">
                                  {order.status === 'pending' && (
                                    <Badge variant="outline" className="text-xs">
                                      Processing within 1-2 business days
                                    </Badge>
                                  )}
                                  {order.status === 'processing' && (
                                    <Badge variant="outline" className="text-xs">
                                      Preparing for shipment
                                    </Badge>
                                  )}
                                  {order.status === 'shipped' && (
                                    <Badge variant="outline" className="text-xs">
                                      Estimated delivery: 3-7 business days • FedEx Ground
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}