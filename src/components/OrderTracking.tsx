import React, { useState, useEffect } from 'react';
import { Package, Truck, MapPin, CheckCircle, Clock, Phone, Mail, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';

interface OrderTrackingProps {
  onViewChange: (view: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking') => void;
  orderId?: string;
}

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: Date;
  isCompleted: boolean;
}

interface ShippingDetails {
  trackingNumber: string;
  carrier: string;
  service: string;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  origin: string;
  destination: string;
}

export function OrderTracking({ onViewChange, orderId }: OrderTrackingProps) {
  const [currentOrderId, setCurrentOrderId] = useState(orderId || '');
  const [trackingData, setTrackingData] = useState<TrackingEvent[] | null>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data generator
  const generateTrackingData = (orderId: string): { events: TrackingEvent[], details: ShippingDetails } => {
    const trackingNumber = `${Math.random().toString().slice(2, 14)}`;
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 5));
    
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 3) + 1);

    const events: TrackingEvent[] = [
      {
        id: '1',
        status: 'Order Placed',
        description: 'Your order has been received and is being processed',
        location: 'Planter Fulfillment Center, Austin, TX',
        timestamp: orderDate,
        isCompleted: true
      },
      {
        id: '2',
        status: 'Order Processed',
        description: 'Your plants have been carefully packaged',
        location: 'Planter Fulfillment Center, Austin, TX',
        timestamp: new Date(orderDate.getTime() + 6 * 60 * 60 * 1000),
        isCompleted: true
      },
      {
        id: '3',
        status: 'Shipped',
        description: 'Package picked up by FedEx',
        location: 'Austin, TX',
        timestamp: new Date(orderDate.getTime() + 24 * 60 * 60 * 1000),
        isCompleted: true
      },
      {
        id: '4',
        status: 'In Transit',
        description: 'Package in transit',
        location: 'Dallas, TX',
        timestamp: new Date(orderDate.getTime() + 36 * 60 * 60 * 1000),
        isCompleted: true
      },
      {
        id: '5',
        status: 'In Transit',
        description: 'Package in transit',
        location: 'Memphis, TN (FedEx Hub)',
        timestamp: new Date(orderDate.getTime() + 48 * 60 * 60 * 1000),
        isCompleted: Math.random() > 0.3
      },
      {
        id: '6',
        status: 'Out for Delivery',
        description: 'Package out for delivery',
        location: 'Local Facility, Your City',
        timestamp: estimatedDelivery,
        isCompleted: Math.random() > 0.7
      },
      {
        id: '7',
        status: 'Delivered',
        description: 'Package delivered successfully',
        location: 'Your Address',
        timestamp: estimatedDelivery,
        isCompleted: Math.random() > 0.8
      }
    ];

    // Filter out incomplete future events
    const completedEvents = events.filter(event => event.isCompleted);

    const details: ShippingDetails = {
      trackingNumber,
      carrier: 'FedEx',
      service: 'FedEx Ground',
      estimatedDelivery,
      origin: 'Austin, TX',
      destination: 'Your City, Your State'
    };

    return { events: completedEvents, details };
  };

  const handleTrackOrder = async () => {
    if (!currentOrderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if order exists (mock validation)
    if (currentOrderId.toLowerCase().includes('invalid')) {
      setError('Order not found. Please check your order ID and try again.');
      setTrackingData(null);
      setShippingDetails(null);
    } else {
      const { events, details } = generateTrackingData(currentOrderId);
      setTrackingData(events);
      setShippingDetails(details);
    }
    
    setLoading(false);
  };

  const getCurrentStatus = () => {
    if (!trackingData || trackingData.length === 0) return null;
    return trackingData[trackingData.length - 1];
  };

  const getProgressPercentage = () => {
    if (!trackingData) return 0;
    const totalSteps = 7; // Total possible steps
    return (trackingData.length / totalSteps) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-500';
      case 'out for delivery':
        return 'bg-blue-500';
      case 'in transit':
        return 'bg-yellow-500';
      case 'shipped':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Auto-track if orderId is provided
  useEffect(() => {
    if (orderId) {
      handleTrackOrder();
    }
  }, [orderId]);

  const currentStatus = getCurrentStatus();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onViewChange('profile')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          <div>
            <h1>Order Tracking</h1>
            <p className="text-muted-foreground">
              Track your plant delivery with real-time updates
            </p>
          </div>
        </div>

        {/* Order ID Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Track Your Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your Order ID (e.g., ORD-ABC123456)"
                value={currentOrderId}
                onChange={(e) => setCurrentOrderId(e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleTrackOrder} disabled={loading}>
                {loading ? 'Tracking...' : 'Track Order'}
              </Button>
            </div>
            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}
            <p className="text-sm text-muted-foreground">
              You can find your Order ID in your confirmation email or order history.
            </p>
          </CardContent>
        </Card>

        {/* Current Status */}
        {currentStatus && shippingDetails && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-4">Current Status</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(currentStatus.status)}`}></div>
                    <div>
                      <p className="font-medium">{currentStatus.status}</p>
                      <p className="text-sm text-muted-foreground">{currentStatus.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{currentStatus.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(currentStatus.timestamp)} at {formatTime(currentStatus.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-4">Delivery Progress</h3>
                  <Progress value={getProgressPercentage()} className="mb-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span className="font-medium">{formatDate(shippingDetails.estimatedDelivery)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tracking Number:</span>
                      <span className="font-mono">{shippingDetails.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carrier:</span>
                      <span>{shippingDetails.carrier} {shippingDetails.service}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shipping Details */}
        {shippingDetails && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="mb-2">From</h4>
                  <p className="text-sm text-muted-foreground">{shippingDetails.origin}</p>
                </div>
                <div>
                  <h4 className="mb-2">To</h4>
                  <p className="text-sm text-muted-foreground">{shippingDetails.destination}</p>
                </div>
                <div>
                  <h4 className="mb-2">Service</h4>
                  <Badge variant="secondary">{shippingDetails.service}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tracking Timeline */}
        {trackingData && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingData.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)}`}></div>
                      {index < trackingData.length - 1 && (
                        <div className="w-px h-12 bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4>{event.status}</h4>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                        <span>•</span>
                        <span>{formatTime(event.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* FedEx Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4>Contact FedEx</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>1-800-463-3339</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>Track online at fedex.com</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4>Contact Planter Support</h4>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-PLANT</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>support@planter.com</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}