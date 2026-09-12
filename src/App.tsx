import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ArrowRight, Leaf, ShieldCheck, Zap, Instagram, Twitter, Facebook, RefreshCw, Battery, Eye } from 'lucide-react';
import { PRODUCTS, BUNDLES, Product } from './constants';
import heroImg from './assets/images/hero_batteries_1788324881351.jpg';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{item: Product | any, quantity: number}[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cream/80 backdrop-blur-md border-b border-teal-dark/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-semibold">
              <a href="#philosophy" className="hover:text-teal-light transition-colors">Philosophy</a>
              <a href="#shop" className="hover:text-teal-light transition-colors">Pre-Order</a>
              <a href="#eco-loop" className="hover:text-teal-light transition-colors">The Eco Loop</a>
              <a href="#vision" className="hover:text-teal-light transition-colors">Vision</a>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl font-serif tracking-tighter italic">ba-trees</h1>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group"
            >
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-dark text-cream text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-teal-dark text-cream p-12 flex flex-col justify-between"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8">
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-4xl font-serif italic">
              <a href="#philosophy" onClick={() => setIsMenuOpen(false)}>Philosophy</a>
              <a href="#shop" onClick={() => setIsMenuOpen(false)}>Pre-Order</a>
              <a href="#eco-loop" onClick={() => setIsMenuOpen(false)}>The Eco Loop</a>
              <a href="#vision" onClick={() => setIsMenuOpen(false)}>Vision</a>
            </div>
            <div className="text-[10px] uppercase tracking-widest opacity-50">
              © 2026 ba-trees. nature. charged.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md z-[80] bg-cream shadow-2xl p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-serif italic">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)}><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingBag className="w-12 h-12 mb-4" />
                    <p className="font-serif italic">Your bag is empty</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <img src={item.item.image} className="w-20 h-20 object-cover rounded-lg" alt="" />
                        <div className="flex-1">
                          <h3 className="font-serif text-lg">{item.item.name}</h3>
                          <p className="text-xs opacity-60 uppercase tracking-widest">Qty: {item.quantity}</p>
                          <p className="text-sm mt-1">${(item.item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="mt-8 pt-8 border-t border-teal-dark/10">
                  <div className="flex justify-between mb-6">
                    <span className="uppercase tracking-widest text-xs font-semibold">Subtotal</span>
                    <span className="font-serif text-xl">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="btn-primary w-full">Checkout via Gumroad</button>
                  <p className="text-[10px] text-center mt-4 opacity-50 uppercase tracking-tighter">
                    Pre-orders ship in 6 weeks.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden">
          <img 
            src={heroImg} 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Nature background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/60 to-teal-dark/20" />
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-start text-cream">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">ba-trees is not a battery company.</span>
              <h2 className="text-6xl lg:text-8xl font-serif italic leading-tight mb-8">
                It's a recognition <br /> company.
              </h2>
              <p className="text-lg max-w-xl mb-8 opacity-90 font-light">
                We find the things that power everything — and finally make them seen. It starts with a battery. It ends with a movement.
              </p>
              <div className="flex gap-4">
                <a href="#shop" className="btn-primary bg-cream text-teal-dark hover:bg-white inline-block">Pre-Order Now</a>
                <a href="#philosophy" className="btn-secondary border-cream text-cream hover:bg-cream hover:text-teal-dark inline-block">Read The Manifesto</a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Philosophy */}
        <section id="philosophy" className="py-32 bg-white border-y border-teal-dark/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="uppercase tracking-widest text-[10px] font-bold opacity-50 block mb-8">I — The Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-12 leading-relaxed">
              "The things that power everything get no credit."
            </h2>
            <div className="text-lg opacity-70 space-y-6 font-light leading-relaxed text-left md:text-center">
              <p>The roots that feed the tree. The grid that runs the city. The worker whose name nobody knows. The battery in the back of the drawer, quietly keeping the smoke detector alive at 3am.</p>
              <p>Energy is everywhere. Invisible. Overlooked. Unrecognised. And yet nothing — nothing — works without it.</p>
              <p className="font-medium text-teal-dark">ba-trees is the first brand to say: You were natural all along. Now you look like it. You were powerful all along. Now you're seen.</p>
            </div>
          </div>
        </section>

        {/* Product Grid / What Ships Now */}
        <section id="shop" className="py-32 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="uppercase tracking-widest text-[10px] font-bold opacity-50 block mb-2">VI — What Ships Now</span>
              <h2 className="text-5xl font-serif italic">The Pre-Sell</h2>
              <p className="mt-4 opacity-70 max-w-md">The philosophy is unified. Now we ship. Founder Edition — ships in 6 weeks.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 relative">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={product.name}
                  />
                  <div className="absolute inset-0 bg-teal-dark/0 group-hover:bg-teal-dark/10 transition-colors" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="absolute bottom-6 left-6 right-6 bg-cream text-teal-dark py-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[10px] uppercase tracking-widest font-bold"
                  >
                    Quick Add — $12.99
                  </button>
                </div>
                <span className="text-[10px] uppercase tracking-widest opacity-50 mb-1 block">{product.collection}</span>
                <h3 className="text-xl font-serif italic">{product.name}</h3>
              </motion.div>
            ))}
          </div>

          {/* Bundles */}
          <div className="bg-teal-dark text-cream rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
               <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-serif italic mb-12">Founder Bundles</h2>
              <div className="space-y-6">
                {BUNDLES.map((bundle) => (
                  <div key={bundle.id} className="glass-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between group hover:bg-white/20 transition-colors cursor-pointer gap-6" onClick={() => addToCart(bundle)}>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-serif italic">{bundle.name}</h3>
                        <span className="bg-cream text-teal-dark text-[8px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter">{bundle.savings}</span>
                      </div>
                      <p className="text-sm opacity-70">{bundle.description}</p>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                      <p className="text-2xl font-serif mb-2">${bundle.price}</p>
                      <button className="text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                        Pre-Order <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* The Eco Loop */}
        <section id="eco-loop" className="py-32 bg-cream border-y border-teal-dark/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="uppercase tracking-widest text-[10px] font-bold opacity-50 block mb-4">III — The Eco Loop</span>
              <h2 className="text-5xl font-serif italic mb-6">Nothing gets thrown away unrecognised.</h2>
              <p className="max-w-2xl mx-auto opacity-70">Disposable batteries are a problem. Rechargeable batteries are the solution. ba-trees offers both — and a bridge that makes the journey feel intentional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-px bg-teal-dark/20 -translate-y-1/2 z-0" />
              
              <div className="relative z-10 flex flex-col items-center text-center bg-cream p-6">
                <div className="w-16 h-16 rounded-full bg-teal-dark text-cream flex items-center justify-center mb-6 text-xl font-serif italic">01</div>
                <h3 className="font-serif text-2xl italic mb-4">Buy Beautiful Disposables</h3>
                <p className="text-sm opacity-70">Your first ba-trees. A $12.99 impulse buy that changes how you see every battery you've ever owned.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center bg-cream p-6">
                <div className="w-16 h-16 rounded-full bg-teal-dark text-cream flex items-center justify-center mb-6 text-xl font-serif italic">02</div>
                <h3 className="font-serif text-2xl italic mb-4">Return. Get 20% Off.</h3>
                <p className="text-sm opacity-70">When they're dead, send them back in our prepaid envelope. Things that powered your world deserve more than a landfill.</p>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center bg-cream p-6">
                <div className="w-16 h-16 rounded-full bg-teal-dark text-cream flex items-center justify-center mb-6 text-xl font-serif italic">03</div>
                <h3 className="font-serif text-2xl italic mb-4">Upgrade to Rechargeable</h3>
                <p className="text-sm opacity-70">Same beautiful designs. 1,000+ cycles. USB-C charging. Never buy disposable again. Your desk still looks exactly right.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Transparent Vision */}
        <section id="vision" className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1516211697149-d857329673ad?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full border border-teal-dark/10 p-4 animate-spin-slow hidden md:block">
               <div className="w-full h-full rounded-full border border-teal-dark/20 flex items-center justify-center">
                  <span className="text-[8px] uppercase tracking-[0.5em] font-bold text-center">Look Through Me. See What Powers Me.</span>
               </div>
            </div>
          </div>
          <div>
            <span className="uppercase tracking-widest text-[10px] font-bold opacity-50 block mb-4">IV — The Transparent Vision</span>
            <h2 className="text-5xl font-serif italic mb-8 leading-tight">Look through me.<br />See what powers me.</h2>
            <p className="text-lg opacity-70 mb-8 leading-relaxed">
              Transparent devices say: look inside. See how it works. Honour the mechanism. ba-trees says the same thing about the battery inside. Together they form a complete statement.
            </p>
            <p className="text-lg opacity-70 mb-12 leading-relaxed">
              The thing you never looked at is beautiful. The thing you never thought about was natural all along.
            </p>
            <div className="pt-8 border-t border-teal-dark/10">
              <span className="uppercase tracking-widest text-[10px] font-bold opacity-50 block mb-4">Target Partners (Tier 3)</span>
              <p className="font-serif italic text-xl">Nothing Phone · 8BitDo · Teenage Engineering</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-32 pb-12 border-t border-teal-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-4xl font-serif italic mb-8">ba-trees</h2>
              <p className="max-w-sm opacity-60 mb-8">
                From the AA in your remote to the grid powering the server running the AI you're talking to right now — energy is everywhere.
              </p>
              <div className="flex gap-4">
                <input type="email" placeholder="Email Address" className="bg-cream border-none px-6 py-3 rounded-full flex-1 text-sm focus:ring-1 ring-teal-dark outline-none" />
                <button className="btn-primary">Join</button>
              </div>
            </div>
            <div>
              <h4 className="uppercase tracking-widest text-[10px] font-bold mb-6">Shop</h4>
              <ul className="space-y-4 text-sm opacity-60">
                <li><a href="#shop" className="hover:opacity-100">Pre-Order</a></li>
                <li><a href="#shop" className="hover:opacity-100">Founder Bundles</a></li>
                <li><a href="#" className="hover:opacity-100">Corporate Gifting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase tracking-widest text-[10px] font-bold mb-6">Vision</h4>
              <ul className="space-y-4 text-sm opacity-60">
                <li><a href="#philosophy" className="hover:opacity-100">The Philosophy</a></li>
                <li><a href="#eco-loop" className="hover:opacity-100">The Eco Loop</a></li>
                <li><a href="#vision" className="hover:opacity-100">Transparent Vision</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-teal-dark/5 gap-8">
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
              <Facebook className="w-5 h-5 opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
            <div className="text-[10px] uppercase tracking-widest opacity-40">
              © 2026 ba-trees. nature. charged. finally seen.
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-40">
              <a href="#" className="hover:opacity-100">Privacy Policy</a>
              <a href="#" className="hover:opacity-100">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 z-[90] bg-teal-dark/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-6 md:inset-24 z-[100] bg-cream rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full">
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
              </div>
              
              <div className="flex-1 p-8 md:p-16 overflow-y-auto">
                <span className="uppercase tracking-[0.3em] text-[10px] font-bold opacity-50 mb-4 block">{selectedProduct.collection}</span>
                <h2 className="text-5xl font-serif italic mb-6">{selectedProduct.name}</h2>
                <p className="text-2xl font-serif mb-8">${selectedProduct.price}</p>
                
                <p className="text-lg opacity-70 mb-12 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="space-y-4 mb-12">
                  {selectedProduct.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm opacity-80">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-light" />
                      {detail}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="btn-primary w-full"
                  >
                    Pre-Order — $12.99
                  </button>
                  <p className="text-[10px] text-center opacity-50 uppercase tracking-widest">
                    Ships in 6 weeks.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
