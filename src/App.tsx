import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, Instagram, Twitter, Facebook, Mail, Phone, MapPin, Trophy, Users, Zap } from 'lucide-react';
import { cn } from './lib/utils';
import { ROSTER, SCHEDULE, NEWS, COACHING_STAFF } from './constants';

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  to, 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  to?: string;
  onClick?: () => void;
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20",
    secondary: "bg-zinc-950 text-white hover:bg-black",
    outline: "border-2 border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-white"
  };

  const content = (
    <>
      {children}
      <ChevronRight className="ml-2 w-4 h-4" />
    </>
  );

  if (to) {
    return <Link to={to} className={cn(baseStyles, variants[variant], className)}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className={cn(baseStyles, variants[variant], className)}>
      {content}
    </button>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Recruiting', path: '/recruiting' },
    { name: 'News', path: '/news' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "bg-white/95 backdrop-blur-md py-3 border-b border-zinc-200" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-red-600 flex items-center justify-center font-black text-xl italic text-white">B</div>
          <span className={cn(
            "font-black text-2xl tracking-tighter uppercase italic transition-colors",
            isScrolled ? "text-zinc-950" : "text-white"
          )}>Brock <span className="text-red-600">Hockey</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={cn(
                "text-sm font-bold uppercase tracking-widest hover:text-red-600 transition-colors",
                location.pathname === link.path 
                  ? "text-red-600" 
                  : (isScrolled ? "text-zinc-900" : "text-white")
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="primary" to="/recruiting" className="py-2 px-4 text-xs">
            Get Recruited
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn(
            "lg:hidden transition-colors",
            isScrolled ? "text-zinc-950" : "text-white"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 p-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-widest text-zinc-950"
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="primary" to="/recruiting" className="w-full">
                Get Recruited
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-zinc-50 border-t border-zinc-200 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-red-600 flex items-center justify-center font-black text-xl italic text-white">B</div>
          <span className="font-black text-2xl tracking-tighter uppercase italic text-zinc-950">Brock <span className="text-red-600">Hockey</span></span>
        </Link>
        <p className="text-zinc-600 text-sm leading-relaxed">
          The premier ACHA D2 hockey program at Brock University. Building champions on and off the ice through brotherhood, development, and elite competition.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors text-zinc-900"><Instagram size={20} /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors text-zinc-900"><Twitter size={20} /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors text-zinc-900"><Facebook size={20} /></a>
        </div>
      </div>

      <div>
        <h4 className="font-black uppercase tracking-widest mb-6 text-zinc-950">Quick Links</h4>
        <ul className="space-y-4 text-zinc-600 text-sm">
          <li><Link to="/team" className="hover:text-red-600 transition-colors">Team Roster</Link></li>
          <li><Link to="/schedule" className="hover:text-red-600 transition-colors">Game Schedule</Link></li>
          <li><Link to="/recruiting" className="hover:text-red-600 transition-colors">Recruiting Portal</Link></li>
          <li><Link to="/news" className="hover:text-red-600 transition-colors">Latest News</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-black uppercase tracking-widest mb-6 text-zinc-950">Contact Info</h4>
        <ul className="space-y-4 text-zinc-600 text-sm">
          <li className="flex items-center space-x-3">
            <Mail size={16} className="text-red-600" />
            <span>hockey@brocku.ca</span>
          </li>
          <li className="flex items-center space-x-3">
            <MapPin size={16} className="text-red-600" />
            <span>Canada Games Park, St. Catharines</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-black uppercase tracking-widest mb-6 text-zinc-950">Newsletter</h4>
        <p className="text-zinc-600 text-xs mb-4">Stay updated with game recaps and team news.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="bg-white border border-zinc-200 px-4 py-2 text-sm focus:outline-none focus:border-red-600 flex-grow text-zinc-900"
          />
          <button className="bg-red-600 px-4 py-2 hover:bg-red-700 transition-colors text-white">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-200 text-center text-zinc-500 text-xs uppercase tracking-widest">
      © 2026 Brock University ACHA Hockey. All Rights Reserved.
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  return (
    <div className="bg-white text-zinc-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1580748141549-71748d60bd96?auto=format&fit=crop&q=80&w=1920" 
            alt="Hockey Action" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-red-600 text-white px-4 py-1 text-xs font-black uppercase tracking-[0.3em] mb-6">
              ACHA Division 2
            </span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 italic text-zinc-950">
              The Next <span className="text-red-600">Chapter</span> Starts Here.
            </h1>
            <p className="text-xl text-zinc-700 mb-10 leading-relaxed font-medium">
              Elite competition. Academic excellence. Unmatched brotherhood. Join the Badger legacy at Brock University.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" to="/recruiting" className="text-lg px-10">
                Get Recruited
              </Button>
              <Button variant="outline" to="/schedule" className="text-lg px-10">
                View Schedule
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-zinc-950/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-red-600 rounded-full" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Conference Titles', value: '3', icon: <Trophy className="text-red-600" /> },
            { label: 'Active Players', value: '28', icon: <Users className="text-red-600" /> },
            { label: 'Win Rate', value: '74%', icon: <Zap className="text-red-600" /> },
            { label: 'League Rank', value: 'Top 10', icon: <Trophy className="text-red-600" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 border border-zinc-200 bg-white shadow-sm"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-zinc-950 mb-2">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Brock */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 italic text-zinc-950">
                Why <span className="text-red-600">Brock</span> Hockey?
              </h2>
              <div className="space-y-8">
                {[
                  { title: 'Elite Facilities', desc: 'Train and play at the state-of-the-art Canada Games Park, featuring NHL-sized ice and pro-style locker rooms.' },
                  { title: 'Proven Pathway', desc: 'Our program is designed to develop players for the next level while earning a world-class degree.' },
                  { title: 'True Brotherhood', desc: 'More than a team. A lifelong network of teammates, alumni, and supporters.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 font-black">
                      0{i + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-2 text-zinc-950">{item.title}</h3>
                      <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-red-600/10 absolute -top-10 -right-10 w-full h-full -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1515703407324-5f753eed217b?auto=format&fit=crop&q=80&w=800" 
                alt="Facilities" 
                className="w-full h-full object-cover border border-zinc-200 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Games */}
      <section className="py-32 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-5xl font-black uppercase tracking-tighter italic text-zinc-950">Upcoming <span className="text-red-600">Games</span></h2>
              <p className="text-zinc-600 mt-4">Witness the intensity live at Canada Games Park.</p>
            </div>
            <Button variant="outline" to="/schedule">Full Schedule</Button>
          </div>
          
          <div className="grid gap-6">
            {SCHEDULE.slice(0, 3).map((game) => (
              <div key={game.id} className="bg-white border border-zinc-200 p-8 flex flex-col md:flex-row items-center justify-between hover:border-red-600/50 transition-all group shadow-sm">
                <div className="flex items-center gap-8 mb-6 md:mb-0">
                  <div className="text-center">
                    <div className="text-2xl font-black text-zinc-950">{new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    <div className="text-xs uppercase tracking-widest text-zinc-500">{game.time}</div>
                  </div>
                  <div className="h-12 w-px bg-zinc-200 hidden md:block" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-red-600 font-bold mb-1">{game.isHome ? 'Home Game' : 'Away Game'}</div>
                    <div className="text-2xl font-black uppercase tracking-tight text-zinc-950">vs {game.opponent}</div>
                  </div>
                </div>
                <div className="text-zinc-600 font-bold uppercase tracking-widest text-sm mb-6 md:mb-0">
                  {game.location}
                </div>
                <Button variant="primary" className="w-full md:w-auto">Tickets</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Players */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-16 text-center text-zinc-950">Featured <span className="text-red-600">Badgers</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {ROSTER.slice(0, 3).map((player) => (
              <div key={player.id} className="group relative overflow-hidden bg-zinc-50 border border-zinc-200">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/player${player.id}/600/800`} 
                    alt={player.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-red-600 font-black text-4xl italic mb-2">#{player.number}</div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 text-zinc-950">{player.name}</h3>
                  <p className="text-zinc-600 uppercase tracking-widest text-xs font-bold">{player.position} • {player.year}</p>
                  
                  <div className="mt-6 pt-6 border-t border-zinc-200 grid grid-cols-3 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center">
                      <div className="text-lg font-black text-zinc-950">{player.stats?.g || 0}</div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500">Goals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-zinc-950">{player.stats?.a || 0}</div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500">Assists</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-zinc-950">{player.stats?.pts || 0}</div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500">Points</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiting CTA */}
      <section className="py-32 bg-red-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-8 leading-none">
            Ready to Wear the <span className="text-zinc-950">Red & White?</span>
          </h2>
          <p className="text-xl font-bold mb-12 text-red-100">
            We are looking for elite athletes with high character and a relentless work ethic. Roster spots for the 2026 season are filling fast.
          </p>
          <Button variant="secondary" to="/recruiting" className="text-xl px-12 py-5">
            Start Your Recruitment
          </Button>
        </div>
      </section>

      {/* Sponsors Bar */}
      <section className="py-12 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all">
            {['NIKE', 'BAUER', 'CCM', 'WARRIOR', 'TRUE'].map((brand) => (
              <span key={brand} className="text-3xl font-black tracking-tighter italic text-zinc-950">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Team = () => {
  return (
    <div className="bg-white text-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">The <span className="text-red-600">Roster</span></h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">Meet the athletes and staff representing Brock University in the ACHA D2.</p>
        </div>

        {/* Coaching Staff */}
        <div className="mb-32">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-12 pb-4 border-b border-red-600/30 inline-block">Coaching Staff</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {COACHING_STAFF.map(coach => (
              <div key={coach.id} className="flex flex-col md:flex-row gap-8 bg-zinc-50 p-8 border border-zinc-200">
                <img src={coach.image} alt={coach.name} className="w-48 h-48 object-cover grayscale" referrerPolicy="no-referrer" />
                <div>
                  <h3 className="text-2xl font-black uppercase mb-1 text-zinc-950">{coach.name}</h3>
                  <div className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">{coach.role}</div>
                  <p className="text-zinc-600 text-sm leading-relaxed">{coach.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Players Table */}
        <div>
          <h2 className="text-3xl font-black uppercase tracking-widest mb-12 pb-4 border-b border-red-600/30 inline-block text-zinc-950">2025-26 Roster</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500 text-xs uppercase tracking-[0.2em]">
                  <th className="py-6 px-4">#</th>
                  <th className="py-6 px-4">Name</th>
                  <th className="py-6 px-4">Pos</th>
                  <th className="py-6 px-4">Ht/Wt</th>
                  <th className="py-6 px-4">Year</th>
                  <th className="py-6 px-4">Hometown</th>
                  <th className="py-6 px-4">Previous Team</th>
                </tr>
              </thead>
              <tbody>
                {ROSTER.map(player => (
                  <tr key={player.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors group">
                    <td className="py-6 px-4 font-black text-red-600 text-xl italic">{player.number}</td>
                    <td className="py-6 px-4 font-bold uppercase tracking-tight text-lg text-zinc-950">{player.name}</td>
                    <td className="py-6 px-4 text-zinc-600 font-bold">{player.position}</td>
                    <td className="py-6 px-4 text-zinc-600">{player.height} / {player.weight}</td>
                    <td className="py-6 px-4 text-zinc-600">{player.year}</td>
                    <td className="py-6 px-4 text-zinc-600">{player.hometown}</td>
                    <td className="py-6 px-4 text-zinc-500 text-sm italic">{player.previousTeam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Recruiting = () => {
  return (
    <div className="bg-white text-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.3em] mb-4 block">Recruitment Portal</span>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-8 leading-none text-zinc-950">Play ACHA Hockey at <span className="text-red-600">Brock.</span></h1>
            
            <div className="space-y-12 mb-12">
              <div>
                <h3 className="text-2xl font-black uppercase mb-4 italic text-zinc-950">The Value Proposition</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Brock University offers a unique blend of high-level ACHA D2 competition and a world-class academic experience. Our players benefit from professional coaching, elite facilities, and a pathway to professional or senior hockey post-graduation.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black uppercase mb-4 italic text-zinc-950">What We Look For</h3>
                <ul className="space-y-4">
                  {[
                    { label: 'Skill Level', desc: 'Junior A/B or AAA experience preferred.' },
                    { label: 'Work Ethic', desc: 'Relentless compete level on and off the ice.' },
                    { label: 'Academics', desc: 'Minimum 75% average for university admission.' },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <ChevronRight size={14} className="text-white" />
                      </div>
                      <div>
                        <span className="font-bold uppercase tracking-wide block text-zinc-950">{item.label}</span>
                        <span className="text-zinc-500 text-sm">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 bg-zinc-50 border-l-4 border-red-600">
              <p className="text-lg italic font-medium text-zinc-700">
                "Wearing the Badger jersey is a privilege. We are building a culture of excellence, and we want players who are ready to contribute to that legacy from day one."
              </p>
              <div className="mt-4 font-black uppercase tracking-widest text-sm text-zinc-950">— David Miller, Head Coach</div>
            </div>
          </div>

          <div className="bg-zinc-50 p-10 border border-zinc-200 shadow-2xl">
            <h2 className="text-3xl font-black uppercase italic mb-8 text-zinc-950">Recruit <span className="text-red-600">Profile</span></h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input type="text" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Position</label>
                  <select className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950">
                    <option>Forward</option>
                    <option>Defense</option>
                    <option>Goalie</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Height / Weight</label>
                  <input type="text" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="6'1 / 190 lbs" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">GPA</label>
                  <input type="text" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="3.8 / 85%" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Previous Team</label>
                <input type="text" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="Team Name (League)" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Highlight Video Link</label>
                <input type="url" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="YouTube / Vimeo Link" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email</label>
                  <input type="email" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Phone</label>
                  <input type="tel" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" placeholder="555-0123" />
                </div>
              </div>

              <Button variant="primary" className="w-full py-4 text-lg mt-4">Submit Your Profile</Button>
              <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest">By submitting, you agree to be contacted by the Brock Hockey coaching staff.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Schedule = () => {
  return (
    <div className="bg-white text-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">2025-26 <span className="text-red-600">Schedule</span></h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">Follow the Badgers as they compete for the conference championship.</p>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-zinc-200 text-zinc-500 text-xs uppercase tracking-[0.2em]">
                  <th className="py-6 px-8">Date</th>
                  <th className="py-6 px-8">Opponent</th>
                  <th className="py-6 px-8">Location</th>
                  <th className="py-6 px-8">Result</th>
                  <th className="py-6 px-8">Action</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map(game => (
                  <tr key={game.id} className="border-b border-zinc-100 hover:bg-white transition-colors">
                    <td className="py-8 px-8">
                      <div className="font-black text-xl italic text-zinc-950">{new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{game.time}</div>
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center font-black text-xs text-zinc-600">OPP</div>
                        <div className="font-black uppercase tracking-tight text-lg text-zinc-950">{game.opponent}</div>
                      </div>
                    </td>
                    <td className="py-8 px-8 text-zinc-600 font-bold uppercase tracking-widest text-sm">
                      {game.location}
                    </td>
                    <td className="py-8 px-8">
                      {game.result ? (
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "w-8 h-8 flex items-center justify-center font-black text-sm text-white",
                            game.result === 'W' ? "bg-green-600" : "bg-red-600"
                          )}>{game.result}</span>
                          <span className="font-black text-xl text-zinc-950">{game.score}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 font-black italic tracking-widest uppercase">Upcoming</span>
                      )}
                    </td>
                    <td className="py-8 px-8">
                      {!game.result && <Button variant="outline" className="py-2 px-4 text-xs">Attend Game</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div className="bg-white text-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">Latest <span className="text-red-600">News</span></h1>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {['All', 'Game Recaps', 'Player Features', 'Recruiting', 'Team News'].map(cat => (
              <button key={cat} className="px-6 py-2 bg-zinc-50 border border-zinc-200 text-xs font-black uppercase tracking-widest hover:border-red-600 transition-colors whitespace-nowrap text-zinc-950">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {NEWS.map(item => (
            <div key={item.id} className="group bg-zinc-50 border border-zinc-200 hover:border-red-600/50 transition-all shadow-sm">
              <div className="aspect-video overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">{item.category}</span>
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{item.date}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-tight group-hover:text-red-600 transition-colors text-zinc-950">{item.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-6">{item.excerpt}</p>
                <Link to={`/news/${item.id}`} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-zinc-950 hover:text-red-600 transition-colors">
                  Read Article <ChevronRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Sponsors = () => {
  return (
    <div className="bg-white text-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">Partner <span className="text-red-600">With Us</span></h1>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">Support the next generation of athletes while gaining massive exposure to the Brock University community.</p>
        </div>

        {/* Current Sponsors */}
        <div className="mb-40">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-16 text-center italic text-zinc-950">Our Current <span className="text-red-600">Partners</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-video bg-zinc-50 border border-zinc-200 flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all group shadow-sm">
                <span className="text-2xl font-black text-zinc-300 group-hover:text-zinc-950 transition-colors">SPONSOR {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why Partner */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-8 text-zinc-950">Why <span className="text-red-600">Partner</span> With Brock?</h2>
            <div className="space-y-8">
              {[
                { title: 'Massive Reach', value: '10k+', label: 'Monthly Website Visitors' },
                { title: 'Social Impact', value: '25k+', label: 'Social Media Followers' },
                { title: 'Live Exposure', value: '500+', label: 'Average Game Attendance' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8 p-6 bg-zinc-50 border border-zinc-200 shadow-sm">
                  <div className="text-4xl font-black text-red-600">{stat.value}</div>
                  <div>
                    <h3 className="font-black uppercase tracking-wide text-zinc-950">{stat.title}</h3>
                    <p className="text-zinc-500 text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-600 p-12 text-center shadow-xl">
            <h3 className="text-3xl font-black uppercase italic mb-6 text-white">Become a Sponsor</h3>
            <p className="text-red-100 font-bold mb-10">Customizable partnership packages designed to meet your business goals and budget.</p>
            <Button variant="secondary" to="/contact" className="w-full py-5 text-lg">Partner With Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="bg-white text-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic mb-8 text-zinc-950">Get In <span className="text-red-600">Touch.</span></h1>
            <p className="text-zinc-600 text-lg mb-12 leading-relaxed">
              Whether you're a prospective player, a fan with a question, or a business looking to partner, we want to hear from you.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-zinc-50 border border-zinc-200 flex items-center justify-center text-red-600 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Email Us</div>
                  <div className="text-xl font-bold text-zinc-950">hockey@brocku.ca</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-zinc-50 border border-zinc-200 flex items-center justify-center text-red-600 shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Call Us</div>
                  <div className="text-xl font-bold text-zinc-950">(905) 688-5550</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-zinc-50 border border-zinc-200 flex items-center justify-center text-red-600 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Visit Us</div>
                  <div className="text-xl font-bold text-zinc-950">Canada Games Park, St. Catharines</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 p-10 border border-zinc-200 shadow-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                <input type="text" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                <input type="email" className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Subject</label>
                <select className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors text-zinc-950">
                  <option>General Inquiry</option>
                  <option>Recruiting Question</option>
                  <option>Sponsorship Opportunity</option>
                  <option>Media Request</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Message</label>
                <textarea rows={5} className="w-full bg-white border border-zinc-200 p-3 focus:border-red-600 outline-none transition-colors resize-none text-zinc-950"></textarea>
              </div>
              <Button variant="primary" className="w-full py-4 text-lg text-white">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/recruiting" element={<Recruiting />} />
            <Route path="/news" element={<News />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />

        {/* Sticky CTA for Mobile */}
        <div className="fixed bottom-6 right-6 z-40 lg:hidden">
          <Button variant="primary" to="/recruiting" className="rounded-full w-14 h-14 p-0 flex items-center justify-center shadow-2xl text-white">
            <Zap size={24} />
          </Button>
        </div>
      </div>
    </Router>
  );
}
