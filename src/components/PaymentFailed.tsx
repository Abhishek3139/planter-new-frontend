import React from 'react';
import { XCircle, RefreshCw, ShoppingCart, Home, HelpCircle, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

interface PaymentFailedProps {
  onViewChange: (view: 'home' | 'shop' | 'plant' | 'about' | 'login' | 'signup' | 'profile' | 'admin' | 'cart' | 'payment-success' | 'payment-failed' | 'order-tracking') => void;
}

export function PaymentFailed({ onViewChange }: PaymentFailedProps) {
  const commonReasons = [
    {
      title: 'Insufficient Funds',
      description: 'Your card may not have enough available balance.',
      solution: 'Check your account balance or try a different payment method.'
    },
    {
      title: 'Card Information',
      description: 'The card details entered may be incorrect.',
      solution: 'Double-check your card number, expiry date, and CVV.'
    },
    {
      title: 'Bank Security',
      description: 'Your bank may have blocked the transaction for security.',
      solution: 'Contact your bank to authorize online purchases.'
    },
    {
      title: 'Network Issues',
      description: 'A temporary connection problem occurred.',
      solution: 'Try again in a few minutes or refresh the page.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Error Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-red-600 mb-2">Payment Failed</h1>
          <p className="text-muted-foreground">
            We were unable to process your payment. Don't worry, your items are still in your cart.
          </p>
        </div>

        {/* Error Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Transaction Error:</strong> Your payment could not be processed at this time. 
            No charges have been applied to your account.
          </AlertDescription>
        </Alert>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Try Again</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your items are safely stored in your cart. You can retry your payment or choose a different payment method.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => onViewChange('cart')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Payment
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => onViewChange('cart')}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                View Cart
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Common Payment Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {commonReasons.map((reason, index) => (
              <div key={index}>
                <div className="space-y-2">
                  <h4>{reason.title}</h4>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                  <p className="text-sm bg-blue-50 p-2 rounded border-l-4 border-blue-200">
                    <strong>Solution:</strong> {reason.solution}
                  </p>
                </div>
                {index < commonReasons.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Accepted Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We accept the following payment methods for your convenience:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 border rounded-lg">
                <div className="text-2xl mb-1">💳</div>
                <p className="text-sm">Credit Cards</p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl mb-1">🏦</div>
                <p className="text-sm">Debit Cards</p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl mb-1">📱</div>
                <p className="text-sm">Digital Wallets</p>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl mb-1">🏪</div>
                <p className="text-sm">Bank Transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => onViewChange('shop')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Continue Shopping
          </Button>
          
          <Button 
            onClick={() => onViewChange('home')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Contact Support */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you continue to experience payment issues, our support team is here to help.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  📧
                </div>
                <div>
                  <p className="text-sm">Email Support</p>
                  <a 
                    href="mailto:support@planter.com" 
                    className="text-primary hover:underline text-sm"
                  >
                    support@planter.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  📞
                </div>
                <div>
                  <p className="text-sm">Phone Support</p>
                  <a 
                    href="tel:+15551234567" 
                    className="text-primary hover:underline text-sm"
                  >
                    (555) 123-PLANT
                  </a>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  💬
                </div>
                <div>
                  <p className="text-sm">Live Chat</p>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Start live chat session
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}