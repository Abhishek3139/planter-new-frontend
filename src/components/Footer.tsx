import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: string) => void;
}

export function Footer({ onViewChange }: FooterProps) {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground">🌱</span>
              </div>
              <span className="text-xl font-semibold">Planter</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Bringing the beauty of nature into your home with our carefully curated collection of healthy, vibrant plants.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                onClick={() => onViewChange('shop')}
              >
                Shop Plants
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
                onClick={() => onViewChange('about')}
              >
                About Us
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Plant Care Guide
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                FAQ
              </Button>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <nav className="space-y-2">
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Shipping Info
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Returns & Exchanges
              </Button>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto justify-start text-muted-foreground hover:text-foreground"
              >
                Plant Guarantee
              </Button>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Stay Connected</h3>
            <p className="text-muted-foreground text-sm">
              Get plant care tips and special offers delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="w-full"
              />
              <Button type="submit" size="sm" className="w-full bg-green-600 hover:bg-green-700">
                Subscribe
              </Button>
            </form>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Garden St, Green City, GC 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-PLANT</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@planter.com</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 Planter. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
            >
              Privacy Policy
            </Button>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
            >
              Terms of Service
            </Button>
            <Button 
              variant="link" 
              size="sm" 
              className="p-0 h-auto text-muted-foreground hover:text-foreground"
            >
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}