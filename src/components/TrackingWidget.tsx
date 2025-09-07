import React, { useState } from 'react';
import { Package, MapPin, Clock, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface TrackingWidgetProps {
  orderId?: string;
  trackingNumber?: string;
  onViewFullTracking?: () => void;
  className?: string;
}

export function TrackingWidget({ 
  orderId, 
  trackingNumber, 
  onViewFullTracking,
  className = ""
}: TrackingWidgetProps) {
  // Mock current status for demo
  const mockStatus = {
    status: 'In Transit',
    description: 'Package in transit to destination facility',
    location: 'Memphis, TN (FedEx Hub)',
    timestamp: new Date(),
    progress: 60
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4" />
          Package Tracking
        </CardTitle>
        {orderId && (
          <p className="text-sm text-muted-foreground">Order #{orderId}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(mockStatus.status)} mt-1`}></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{mockStatus.status}</h4>
                <Badge variant="outline" className="text-xs">FedEx</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {mockStatus.description}
              </p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{mockStatus.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {mockStatus.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={mockStatus.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div>
            <p className="text-sm font-medium">Estimated Delivery</p>
            <p className="text-sm text-muted-foreground">{formatDate(estimatedDelivery)}</p>
          </div>
          <Truck className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Tracking Number */}
        {trackingNumber && (
          <div className="text-xs text-muted-foreground">
            <p>Tracking: {trackingNumber}</p>
          </div>
        )}

        {/* View Full Tracking Button */}
        {onViewFullTracking && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onViewFullTracking}
            className="w-full text-xs"
          >
            View Full Tracking Details
          </Button>
        )}
      </CardContent>
    </Card>
  );
}