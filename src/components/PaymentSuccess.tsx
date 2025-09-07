import React from 'react';
import { CheckCircle, Package, Home, ShoppingBag, User, Download, Truck, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { TrackingWidget } from './TrackingWidget';

interface PaymentSuccessProps {
  onViewChange: (view: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking') => void;
}

export function PaymentSuccess({ onViewChange }: PaymentSuccessProps) {
  const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const trackingNumber = Math.random().toString().slice(2, 14);
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  const orderDetails = {
    orderId,
    orderDate: new Date(),
    estimatedDelivery,
    total: 156.97,
    items: [
      { name: 'Fiddle Leaf Fig', quantity: 1, price: 89.99 },
      { name: 'Succulent Collection', quantity: 2, price: 28.99 }
    ],
    shipping: 12.99,
    tax: 12.00,
    discount: 10.00
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-green-600 mb-2">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. Your plants are on their way to brighten up your space!
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
              <Badge variant="secondary">{orderDetails.orderId}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Order Date</p>
                <p>{formatDate(orderDetails.orderDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estimated Delivery</p>
                <p>{formatDate(orderDetails.estimatedDelivery)}</p>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div className="space-y-3">
              <h4>Items Ordered</h4>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator />

            {/* Pricing Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(orderDetails.total - orderDetails.shipping - orderDetails.tax + orderDetails.discount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${orderDetails.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount Applied</span>
                <span>-${orderDetails.discount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total Paid</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-mono font-medium">{trackingNumber}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Carrier</p>
                <p className="font-medium">FedEx Ground</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-medium">{formatDate(orderDetails.estimatedDelivery)}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Ship From</p>
                <p className="font-medium">Austin, TX</p>
              </div>
            </div>
            
            <Separator />
            
            <Button 
              onClick={() => onViewChange('order-tracking')}
              className="w-full flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Track Your Package
            </Button>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span>1</span>
              </div>
              <div>
                <h4>Order Confirmation</h4>
                <p className="text-muted-foreground text-sm">
                  You'll receive an email confirmation with tracking details shortly.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span>2</span>
              </div>
              <div>
                <h4>Order Processing</h4>
                <p className="text-muted-foreground text-sm">
                  We'll carefully prepare your plants for shipping within 1-2 business days.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span>3</span>
              </div>
              <div>
                <h4>FedEx Pickup & Delivery</h4>
                <p className="text-muted-foreground text-sm">
                  FedEx will handle shipping with real-time tracking updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Tracking Widget */}
        <TrackingWidget
          orderId={orderId}
          trackingNumber={trackingNumber}
          onViewFullTracking={() => onViewChange('order-tracking')}
          className="mb-6"
        />

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => onViewChange('profile')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            View Order History
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onViewChange('shop')}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onViewChange('home')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@planter.com" className="text-primary hover:underline">
              support@planter.com
            </a>{' '}
            or call us at{' '}
            <a href="tel:+15551234567" className="text-primary hover:underline">
              (555) 123-PLANT
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}