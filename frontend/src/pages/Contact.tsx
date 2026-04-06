import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getIconSrc } from '../utils/iconMapping';
import OrbBackground from '../components/OrbBackground';
import FilmGrain from '../components/FilmGrain';
import SectionLabel from '../components/SectionLabel';

const contactTypes = [
  {
    id: 'sales',
    title: 'Sales',
    desc: 'For enterprise demos, pricing, and partnerships.',
    icon: 'Users',
    color: 'bg-brand-cyan',
  },
  {
    id: 'general',
    title: 'General Inquiry',
    desc: 'Quick questions or other topics.',
    icon: 'MessageSquare',
    color: 'bg-brand-blue-1',
  },
  {
    id: 'support',
    title: 'Support',
    desc: 'Technical or operational issues.',
    icon: 'Shield',
    color: 'bg-brand-purple',
  },
  {
    id: 'investor',
    title: 'Investor Relations',
    desc: 'For investors and funding inquiries.',
    icon: 'DollarSign',
    color: 'bg-brand-green',
  },
];

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const Contact = () => {
  const [stage, setStage] = useState<'hero' | 'types' | 'form'>('hero');
  const [selectedType, setSelectedType] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const heroActive = stage === 'hero';
  const typesActive = stage === 'types';
  const formActive = stage === 'form';

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setForm(prev => ({
      ...prev,
      subject: `${type.title} Inquiry`
    }));
    setStage('form');
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(
        import.meta.env.PROD 
          ? `${import.meta.env.VITE_API_URL}/api/v1/contact/`
          : '/api/v1/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
        setForm(initialFormState);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--inst-bg)', color: 'var(--inst-text)', overflow: 'hidden' }}>
      <Navbar />
      <OrbBackground />
      <FilmGrain />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16 px-2">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
          <AnimatePresence mode='wait'>
            {stage === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center text-center py-24"
              >
                <SectionLabel number="01" title="Contact" className="justify-center" active={heroActive} />
                <h1 style={{ margin: '16px 0 12px', fontFamily: 'var(--inst-font-serif)', fontSize: 'clamp(42px, 8vw, 86px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.95, color: '#fff' }}>Let's Talk Compute</h1>
                <p style={{ fontSize: 16, color: 'var(--inst-text-60)', marginBottom: 48, maxWidth: 760, lineHeight: 1.8 }}>
                  Whether you're planning large-scale training, building with bare-metal infrastructure, or exploring partnerships, start here.<br />
                  <span style={{ color: 'var(--inst-text-75, rgba(255,255,255,0.75))' }}>Tatari-grade compute with a human touch.</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ background: 'var(--inst-surface-8)', border: '1px solid var(--inst-border-12)', color: '#fff', fontSize: 16, padding: '12px 20px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}
                  onClick={() => setStage('types')}
                >
                  I’m interested in <ArrowRight className="h-5 w-5 text-white" />
                </motion.button>
              </motion.div>
            )}

            {stage === 'types' && (
              <motion.div
                key="types"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center py-16"
              >
                <SectionLabel number="02" title="Inquiry Type" className="justify-center" active={typesActive} />
                <h2 style={{ margin: '14px 0 28px', fontFamily: 'var(--inst-font-serif)', fontWeight: 400, fontSize: 40 }}>How can we help you?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
                  {contactTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col items-center justify-center p-10 rounded-2xl border border-white/10 transition-all duration-200 cursor-pointer group bg-white/[0.03] hover:bg-white/[0.06]`}
                      onClick={() => handleTypeSelect(type)}
                    >
                      <div className="mb-6 rounded-full p-6 bg-white/10 transition-all">
                        <img src={getIconSrc(type.icon)} alt={type.title} className="h-12 w-12 object-contain" />
                      </div>
                      <div style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 30, marginBottom: 6 }}>{type.title}</div>
                      <div style={{ color: 'var(--inst-text-55)', fontSize: 13 }}>{type.desc}</div>
                    </motion.button>
                  ))}
                </div>
                <button
                  className="mt-14 text-base text-gray-400 underline"
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6797d6'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgb(156 163 175)'}
                  onClick={() => setStage('hero')}
                >
                  &larr; Back
                </button>
              </motion.div>
            )}

            {stage === 'form' && selectedType && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl mx-auto py-16"
              >
                <SectionLabel number="03" title="Form" active={formActive} />
                <div className="flex items-center gap-4 mb-8">
                  <div className="rounded-full p-4 bg-brand-cyan/10 backdrop-blur-xl">
                    <img src={getIconSrc(selectedType.icon)} alt={selectedType.title} className="h-10 w-10 object-contain" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 30 }}>{selectedType.title} Contact</div>
                    <div style={{ color: 'var(--inst-text-55)', fontSize: 13 }}>{selectedType.desc}</div>
                  </div>
                </div>
                <form onSubmit={handleFormSubmit} className="glass-card bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-12 flex flex-col gap-8 backdrop-blur-xl">
                  <div>
                    <label htmlFor="name" style={{ fontFamily: 'var(--inst-font-serif)', fontSize: 16, color: 'var(--inst-text-70)' }}>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-6 py-4 border border-gray-700 rounded-xl focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-colors text-white bg-white/10 placeholder-gray-400 text-lg backdrop-blur-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      placeholder="Email address"
                      className="w-full px-6 py-4 border border-gray-700 rounded-xl focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-colors text-white bg-white/10 placeholder-gray-400 text-lg backdrop-blur-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-lg font-semibold text-white mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleFormChange}
                      required
                      placeholder="Brief subject of your inquiry"
                      className="w-full px-6 py-4 border border-gray-700 rounded-xl focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-colors text-white bg-white/10 placeholder-gray-400 text-lg backdrop-blur-xl"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-lg font-semibold text-white mb-2">How can we help?</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleFormChange}
                      rows={5}
                      placeholder="Your message"
                      className="w-full px-6 py-4 border border-gray-700 rounded-xl focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 transition-colors text-white bg-white/10 placeholder-gray-400 text-lg backdrop-blur-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full glass-button bg-brand-cyan/80 hover:bg-brand-blue-1/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow transition-all duration-200 flex items-center justify-center gap-3 text-2xl backdrop-blur-xl"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'} 
                      {!isSubmitting && <ArrowRight className="h-7 w-7 text-white" />}
                    </button>
                    <button
                      type="button"
                      className="text-base text-gray-400 underline mt-2"
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#6797d6'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgb(156 163 175)'}
                      onClick={() => setStage('types')}
                    >
                      &larr; Back
                    </button>
                  </div>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-red-400 text-center font-semibold mt-2 text-lg"
                    >
                      {error}
                    </motion.div>
                  )}
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-green-400 text-center font-semibold mt-2 text-lg"
                    >
                      Message sent! We'll be in touch soon.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Contact; 