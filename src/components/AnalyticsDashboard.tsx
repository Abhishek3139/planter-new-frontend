import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { mockPlants, mockOrders } from '../data/mockData';

export function AnalyticsDashboard() {
  // Calculate revenue data for the past 7 days
  const revenueData = [
    { day: 'Mon', revenue: 245.50 },
    { day: 'Tue', revenue: 180.25 },
    { day: 'Wed', revenue: 320.75 },
    { day: 'Thu', revenue: 150.00 },
    { day: 'Fri', revenue: 289.50 },
    { day: 'Sat', revenue: 445.25 },
    { day: 'Sun', revenue: 198.75 },
  ];

  // Calculate category distribution
  const categoryData = mockPlants.reduce((acc, plant) => {
    const category = plant.category;
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Calculate top selling plants (mock data for demo)
  const topPlantsData = mockPlants
    .map(plant => ({
      name: plant.name.length > 15 ? plant.name.substring(0, 15) + '...' : plant.name,
      sales: Math.floor(Math.random() * 50) + 10, // Mock sales data
      revenue: (Math.floor(Math.random() * 50) + 10) * plant.price,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // Order status distribution
  const orderStatusData = [
    { name: 'Delivered', value: mockOrders.filter(o => o.status === 'delivered').length, color: '#22c55e' },
    { name: 'Shipped', value: mockOrders.filter(o => o.status === 'shipped').length, color: '#3b82f6' },
    { name: 'Processing', value: mockOrders.filter(o => o.status === 'processing').length, color: '#f59e0b' },
    { name: 'Pending', value: mockOrders.filter(o => o.status === 'pending').length, color: '#6b7280' },
  ];

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = totalRevenue / mockOrders.length;
  const totalProducts = mockPlants.length;
  const lowStockItems = mockPlants.filter(plant => plant.inStock < 5).length;

  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Avg Order Value',
      value: `$${avgOrderValue.toFixed(2)}`,
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: 'Total Products',
      value: totalProducts.toString(),
      change: '+2',
      trend: 'up',
      icon: Package,
    },
    {
      title: 'Low Stock Alerts',
      value: lowStockItems.toString(),
      change: '-3',
      trend: 'down',
      icon: Users,
    },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#6b7280', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {kpi.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {kpi.change}
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Plants */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Plants</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topPlantsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip formatter={(value) => [value, 'Units Sold']} />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPlants
              .filter(plant => plant.inStock < 5)
              .map(plant => (
                <div key={plant.id} className="flex items-center justify-between p-3 border border-border rounded-md">
                  <div>
                    <p className="font-medium">{plant.name}</p>
                    <p className="text-sm text-muted-foreground">{plant.scientificName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={plant.inStock === 0 ? 'destructive' : 'secondary'}>
                      {plant.inStock === 0 ? 'Out of Stock' : `${plant.inStock} left`}
                    </Badge>
                    <span className="text-sm text-muted-foreground">${plant.price}</span>
                  </div>
                </div>
              ))}
            {mockPlants.filter(plant => plant.inStock < 5).length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                All products are well stocked! 🎉
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}