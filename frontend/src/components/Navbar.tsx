import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getAssetPath } from '../utils/paths'
import { getIconSrc } from '../utils/iconMapping'
import { Menu, X, ArrowRight, Shield } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'

const usePathname = () => {
  const location = useLocation()
  return location.pathname
}

const Navbar = () => {
  const pathname = usePathname()
  const navigate = useNavigate()
  const isActive = (path: string) => pathname === path
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Check login status on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('employee_token')
      const email = localStorage.getItem('employee_email')
      setIsLoggedIn(!!(token && email))
    }

    checkLoginStatus()
    
    // Listen for storage changes (when login/logout happens)
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('localStorageChange', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('employee_token')
    localStorage.removeItem('employee_email')
    window.dispatchEvent(new Event('localStorageChange'))
    navigate('/')
  }

  const useCases = [
    { title: 'Model Training', color: 'bg-brand-blue-1' },
    { title: 'AI & ML Inference', color: 'bg-brand-cyan' },
    { title: 'AI Development', color: 'bg-brand-blue-3' },
    { title: 'Model Fine-Tuning', color: 'bg-brand-blue-2' },
  ];
  const industries = [
    'Telco', 'Software & Technology', 'Finance & Insurance', 'Manufacturing',
    'Education', 'Government', 'Legal', 'Healthcare',
  ];

  const productDropdown = [
    {
      title: 'Compute',
      description: 'Elastic GPU compute for training and inference solutions.',
      color: 'bg-brand-blue-1',
      cta: 'View Compute',
      ctaHref: '/ai-compute',
      subsections: [],
    },
  ];

  const companyDropdown = [
    {
      title: 'Story',
      description: 'Our founding story, vision, and mission to change AI.',
      color: 'bg-brand-blue-1',
      cta: 'Read Our Story',
      ctaHref: '/our-story',
      subsections: [
        {
          label: 'Our Mission',
          desc: 'Building the future of sustainable AI computing.',
          icon: 'Globe',
          href: '/our-story#mission',
        },
        {
          label: 'The Team',
          desc: 'Meet the founders and leadership team.',
          icon: 'Users',
          href: '/our-story#team',
        },
        {
          label: 'Our Values',
          desc: 'Sustainability, innovation, and customer success.',
          icon: 'Shield',
          href: '/our-story#values',
        },
      ],
    },
    {
      title: 'Team',
      description: 'Meet the talented individuals building Tatari.',
      color: 'bg-brand-blue-1',
      cta: 'Meet the Team',
      ctaHref: '/team',
      subsections: [
        {
          label: 'Leadership',
          desc: 'Our executive team and board of directors.',
          icon: 'Users',
          href: '/team#leadership',
        },
        {
          label: 'Engineering',
          desc: 'The technical experts behind our platform.',
          icon: 'Cpu',
          href: '/team#engineering',
        },
        {
          label: 'Join Us',
          desc: 'Open positions and career opportunities.',
          icon: 'BookOpen',
          href: '/jobs',
        },
      ],
    },
    {
      title: 'Careers',
      description: 'Join our fast-growing, mission-driven team.',
      color: 'bg-brand-blue-1',
      cta: 'View Openings',
      ctaHref: '/jobs',
      subsections: [
        {
          label: 'Engineering Roles',
          desc: 'Software, infrastructure, and ML engineering positions.',
          icon: 'Cpu',
          href: '/jobs',
        },
        {
          label: 'Sales & Marketing',
          desc: 'Help us grow and serve customers worldwide.',
          icon: 'Globe',
          href: '/jobs',
        },
        {
          label: 'Operations',
          desc: 'Support our global infrastructure and customers.',
          icon: 'Server',
          href: '/jobs',
        },
      ],
    },
    {
      title: 'Contact',
      description: 'Get in touch with our team for partnerships or support.',
      color: 'bg-brand-blue-1',
      cta: 'Contact Us',
      ctaHref: '/contact',
      subsections: [
        {
          label: 'Sales Inquiries',
          desc: 'Learn about our enterprise solutions and pricing.',
          icon: 'DollarSign',
          href: '/contact#sales',
        },
        {
          label: 'Support',
          desc: 'Technical support and documentation access.',
          icon: 'Shield',
          href: '/contact#support',
        },
        {
          label: 'Partnerships',
          desc: 'Strategic partnerships and integrations.',
          icon: 'Globe',
          href: '/contact#partnerships',
        },
      ],
    },
  ];

  const learnMoreDropdown = [
    {
      title: 'Podcast',
      description: 'Episodes on AI infrastructure, operations, and product strategy.',
      color: 'bg-brand-blue-1',
      cta: 'Listen Now',
      ctaHref: '/podcast',
      subsections: [
        {
          label: 'Infrastructure Deep Dives',
          desc: 'Architectures, deployment patterns, and reliability lessons.',
          icon: 'Cpu',
          href: '/podcast#infrastructure',
        },
        {
          label: 'Founder Conversations',
          desc: 'Interviews with operators, researchers, and technical leaders.',
          icon: 'Globe',
          href: '/podcast#founders',
        },
        {
          label: 'Build In Public',
          desc: 'Team updates and behind-the-scenes product decisions.',
          icon: 'BookOpen',
          href: '/podcast#updates',
        },
      ],
    },
    {
      title: 'Research',
      description: 'Research updates and case studies.',
      color: 'bg-brand-blue-1',
      cta: 'Explore Research',
      ctaHref: '/research',
      subsections: [
        {
          label: 'AI Training',
          desc: 'Large-scale model training and fine-tuning.',
          icon: 'Cpu',
          href: '/research#training',
        },
        {
          label: 'Inference Deployments',
          desc: 'Production AI applications and API deployments.',
          icon: 'Server',
          href: '/research#inference',
        },
        {
          label: 'Enterprise Solutions',
          desc: 'Custom infrastructure for Fortune 500 companies.',
          icon: 'Shield',
          href: '/research#enterprise',
        },
      ],
    },
  ];

  const navItems = [
    {
      label: 'Compute',
      mainTo: '/ai-compute',
    },
    {
      label: 'Company',
      mainTo: '/about',
    },
    {
      label: 'Institute',
      mainTo: '/institute',
    },
    {
      label: 'Podcasts',
      mainTo: '/podcasts',
    },
  ]

  return (
    <nav
      className="site-navbar fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      <div className="w-full">
        <div className="flex items-center h-16 relative w-full px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center h-full z-10">
            <div
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
            >
              <motion.img
                src={getAssetPath('/assets/tatarilogo.png')}
                alt="Tatari Systems Logo"
                className="h-8 w-auto transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] group-hover:shadow-blue-500"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-lg font-bold text-white tracking-tight group-hover:[text-shadow:0_0_10px_rgba(59,130,246,0.8),0_0_20px_rgba(59,130,246,0.6),0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300">Tatari</span>
              {pathname === '/institute' && (
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.9)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Institute
                </span>
              )}
            </div>
          </div>

          {/* Hamburger menu button (mobile only) */}
          <button
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-md hover:bg-white/10 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X className="h-7 w-7 text-white" /> : <Menu className="h-7 w-7 text-white" />}
          </button>

          {/* Centered Dropdown Tabs (desktop only) */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="hidden lg:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.mainTo)}
                  className={`cursor-pointer whitespace-nowrap bg-transparent border-none p-0 transition-all duration-300 focus:outline-none ${
                    isActive(item.mainTo)
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.5)] hover:text-white active:text-white'
                  }`}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: isActive(item.mainTo) ? 400 : 300,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Us and Login/Admin Buttons (desktop only) */}
          <div className="hidden lg:flex items-center ml-auto space-x-2 md:space-x-4">
            <button
              className="bg-transparent border-none p-0 text-[13px] whitespace-nowrap transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
              }}
              onClick={() => navigate('/jobs')}
            >
              Join Us
            </button>
            <button
              className="bg-transparent border-none p-0 text-[13px] whitespace-nowrap transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
              }}
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-transparent border-none p-0 text-[13px] cursor-pointer transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                }}
                title="Click to logout"
              >
                <Shield className="h-4 w-4" />
                <span>Admin Mode</span>
              </button>
            ) : (
              <button
                className="group bg-transparent border-none p-0 text-[13px] flex items-center whitespace-nowrap transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 300,
                }}
                onClick={() => navigate('/login')}
              >
                Login
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform text-white" />
              </button>
            )}
          </div>

          {/* Invisible right spacer to balance logo (desktop only) */}
          <div className="absolute right-0 top-0 h-full items-center hidden lg:flex" style={{ visibility: 'hidden' }}>
            <div className="flex items-center space-x-3 group">
              <motion.img
                src={getAssetPath('/assets/tatarilogo.png')}
                alt="Tatari Systems Logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold">Tatari</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[60] bg-black !bg-opacity-100 flex flex-col lg:hidden" 
            style={{ backgroundColor: '#000000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div
                className="flex items-center space-x-3 group cursor-pointer"
                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              >
                <img src={getAssetPath('/assets/tatarilogo.png')} alt="Tatari Systems Logo" className="h-8 w-auto" />
                <span className="text-lg font-bold text-white tracking-tight">Tatari</span>
                {pathname === '/institute' && (
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.9)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Institute
                  </span>
                )}
              </div>
              <button
                className="p-2 rounded-md hover:bg-white/10 focus:outline-none"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-7 w-7 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 py-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`text-left py-2 mt-4 transition-all duration-300 bg-transparent border-none focus:outline-none ${
                    isActive(item.mainTo)
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.5)] hover:text-white active:text-white'
                  }`}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: isActive(item.mainTo) ? 400 : 300,
                  }}
                  onClick={() => { navigate(item.mainTo); setMobileMenuOpen(false); }}
                >
                  {item.label}
                </button>
              ))}
              {/* Contact Us and Login/Admin Buttons (mobile only) */}
              <button
                className="mt-6 text-left py-2 bg-transparent border-none transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 300,
                }}
                onClick={() => { navigate('/jobs'); setMobileMenuOpen(false); }}
              >
                Join Us
              </button>
              <button
                className="mt-4 text-left py-2 bg-transparent border-none transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 300,
                }}
                onClick={() => { navigate('/contact'); setMobileMenuOpen(false); }}
              >
                Contact Us
              </button>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="mt-4 flex items-center space-x-2 text-left py-2 bg-transparent border-none cursor-pointer transition-all duration-300 focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: 300,
                  }}
                  title="Click to logout"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin Mode</span>
                </button>
              ) : (
                <button
                  className="group mt-4 text-left py-2 bg-transparent border-none transition-all duration-300 text-[13px] flex items-center focus:outline-none text-[rgba(255,255,255,0.5)] hover:text-white active:text-white"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 300,
                  }}
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                >
                  Login
                  <ArrowRight className="ml-2 h-4 w-4 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  )
}

export default Navbar
