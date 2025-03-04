
import React, { useState } from 'react';
import { MainLayout } from "@/components/layout/MainLayout";
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronRight, Star, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const BusinessProTemplate = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [cartCount, setCartCount] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const navigate = useNavigate();

  const categories = [
    "Electronics", "Fashion", "Home & Garden", "Beauty", "Sports", 
    "Toys", "Automotive", "Books", "Health"
  ];
  
  const products = [
    {
      id: 1,
      name: "Professional Laptop Pro X5",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.8,
      description: "Ultra-thin professional laptop with 16GB RAM, 512GB SSD, and a stunning 15.6-inch 4K display. Perfect for business professionals and creative work.",
      features: ["16GB RAM", "512GB SSD", "15.6-inch 4K Display", "Intel Core i7", "12-hour battery life"],
      isFeatured: true,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.7,
      description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality for immersive listening.",
      features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Comfortable ear cups", "Built-in microphone"],
      isFeatured: true,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 3,
      name: "Smart Home Security System",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1558002038-bb9bb8d5f1d8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Home & Garden",
      rating: 4.5,
      description: "Comprehensive smart home security system including cameras, motion sensors, and mobile app integration for peace of mind.",
      features: ["HD Cameras", "Motion Sensors", "Mobile App", "Night Vision", "Cloud Storage"],
      isFeatured: true,
      isNew: true,
      isBestSeller: false
    },
    {
      id: 4,
      name: "Ultra HD 4K Smart TV",
      price: 799.99,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.6,
      description: "55-inch Ultra HD 4K Smart TV with vibrant colors, streaming apps built-in, and voice control compatibility.",
      features: ["55-inch display", "4K Resolution", "Smart TV features", "Voice Control", "Multiple HDMI ports"],
      isFeatured: false,
      isNew: false,
      isBestSeller: true
    },
    {
      id: 5,
      name: "Professional Camera Kit",
      price: 1499.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Electronics",
      rating: 4.9,
      description: "Complete professional camera kit with DSLR camera, multiple lenses, tripod, and carrying case for photography enthusiasts.",
      features: ["24MP DSLR Camera", "3 Professional Lenses", "Sturdy Tripod", "Carrying Case", "SD Cards included"],
      isFeatured: true,
      isNew: false,
      isBestSeller: false
    },
    {
      id: 6,
      name: "Premium Coffee Maker",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: "Home & Garden",
      rating: 4.3,
      description: "Advanced programmable coffee maker with thermal carafe, multiple brewing options, and built-in grinder for the freshest coffee.",
      features: ["10-cup capacity", "Built-in Grinder", "Programmable", "Thermal Carafe", "Auto-shutoff"],
      isFeatured: false,
      isNew: true,
      isBestSeller: false
    }
  ];

  const handleAddToCart = (product: any, qty: number = 1) => {
    setCartCount(prev => prev + qty);
    // In a real app, you would add to cart state/context
    setProductModalOpen(false);
  };

  const handleOpenProductModal = (product: any) => {
    setCurrentProduct(product);
    setProductModalOpen(true);
    setQuantity(1);
  };

  const filteredProducts = activeTab === 'featured' 
    ? products.filter(p => p.isFeatured)
    : activeTab === 'new' 
      ? products.filter(p => p.isNew)
      : activeTab === 'bestsellers'
        ? products.filter(p => p.isBestSeller)
        : products;

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <span>USD $</span>
              <span>EN</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-blue-600">Help</a>
              <a href="#" className="hover:text-blue-600">Track Order</a>
              <a href="#" className="hover:text-blue-600">Contact</a>
            </div>
          </div>
          
          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-4" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="text-2xl font-bold text-blue-600">Business Pro</div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="font-medium hover:text-blue-600">Home</a>
              <a href="#" className="font-medium hover:text-blue-600">Shop</a>
              <a href="#" className="font-medium hover:text-blue-600">Categories</a>
              <a href="#" className="font-medium hover:text-blue-600">About</a>
              <a href="#" className="font-medium hover:text-blue-600">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative max-w-xs w-full bg-white shadow-xl flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-xl font-bold text-blue-600">Menu</div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="overflow-y-auto p-4 flex-1">
              <div className="space-y-4">
                <a href="#" className="block py-2 border-b border-gray-100 font-medium">Home</a>
                <a href="#" className="block py-2 border-b border-gray-100 font-medium">Shop</a>
                <a href="#" className="block py-2 border-b border-gray-100 font-medium">Categories</a>
                <a href="#" className="block py-2 border-b border-gray-100 font-medium">About</a>
                <a href="#" className="block py-2 border-b border-gray-100 font-medium">Contact</a>
              </div>
              <div className="mt-6">
                <div className="font-medium text-lg mb-2">Categories</div>
                {categories.map((category) => (
                  <a 
                    key={category} 
                    href="#" 
                    className="block py-2 border-b border-gray-100 text-gray-600 hover:text-blue-600 flex items-center justify-between"
                  >
                    {category}
                    <ChevronRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Business Solutions</h1>
            <p className="text-lg mb-6 text-blue-100">Elevate your business with our professional-grade products</p>
            <div className="flex space-x-4">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Shop Now
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Featured Product" 
              className="rounded-lg shadow-lg max-w-md w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gray-200"></div>
                <div className="p-4 text-center">
                  <h3 className="font-medium">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Our Products</h2>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === 'featured' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveTab('new')}
              >
                New Arrivals
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === 'bestsellers' ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
                onClick={() => setActiveTab('bestsellers')}
              >
                Best Sellers
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleOpenProductModal(product)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
                  )}
                  {product.isBestSeller && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">Best Seller</Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="font-bold">${product.price.toFixed(2)}</div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on all orders over $50</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600 w-8 h-8 flex items-center justify-center">24</div>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600 w-8 h-8 flex items-center justify-center">%</div>
              </div>
              <h3 className="font-bold text-lg mb-2">Money Back</h3>
              <p className="text-gray-600">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="mb-6 max-w-md mx-auto">Stay updated with our latest products and exclusive offers</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l-md text-gray-900 focus:outline-none"
            />
            <Button className="rounded-l-none bg-gray-900 hover:bg-gray-800">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Business Pro</h3>
              <p className="text-gray-400 mb-4">Premium quality business solutions for professionals around the world.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  {/* Facebook icon would go here */}
                  <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">f</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  {/* Twitter icon would go here */}
                  <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">t</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  {/* Instagram icon would go here */}
                  <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">i</div>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Shipping & Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <address className="text-gray-400 not-italic">
                <p className="mb-2">123 Business Avenue</p>
                <p className="mb-2">New York, NY 10001</p>
                <p className="mb-2">info@businesspro.com</p>
                <p className="mb-2">+1 (555) 123-4567</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2023 Business Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Product Modal */}
      {productModalOpen && currentProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={() => setProductModalOpen(false)}></div>
            <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto overflow-hidden shadow-xl">
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setProductModalOpen(false)}
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{currentProduct.name}</h2>
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(currentProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-2 text-gray-500">({currentProduct.rating})</span>
                  </div>
                  
                  <div className="text-2xl font-bold mb-4">${currentProduct.price.toFixed(2)}</div>
                  
                  <p className="text-gray-600 mb-6">{currentProduct.description}</p>
                  
                  <div className="mb-6">
                    <div className="font-medium mb-2">Features:</div>
                    <ul className="list-disc list-inside text-gray-600">
                      {currentProduct.features.map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <div className="font-medium mb-2">Quantity:</div>
                    <div className="flex items-center">
                      <button 
                        className="border border-gray-300 rounded-l p-2"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      >
                        <Minus size={16} />
                      </button>
                      <div className="border-t border-b border-gray-300 py-2 px-4">
                        {quantity}
                      </div>
                      <button 
                        className="border border-gray-300 rounded-r p-2"
                        onClick={() => setQuantity(prev => prev + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      className="flex-grow bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAddToCart(currentProduct, quantity)}
                    >
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="flex-grow">
                      <Heart size={20} className="mr-2" />
                      Wishlist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Return button */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button 
          variant="outline" 
          className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/templates')}
        >
          Return to Templates
        </Button>
      </div>
    </div>
  );
};

const TemplatePreview = () => {
  return (
    <BusinessProTemplate />
  );
};

export default TemplatePreview;
