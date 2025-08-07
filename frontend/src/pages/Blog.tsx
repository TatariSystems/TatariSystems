import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Navbar from '../components/Navbar';

interface BlogSection {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

const Blog = () => {
  const [sections, setSections] = useState<BlogSection[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSection, setNewSection] = useState({
    title: '',
    content: '',
    imageFile: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('employee_token');
    const email = localStorage.getItem('employee_email');
    setIsLoggedIn(!!(token && email));
  }, []);

  // Load blog sections from backend
  useEffect(() => {
    loadBlogSections();
  }, []);

  const loadBlogSections = async () => {
    try {
      const apiBaseUrl = process.env.NODE_ENV === 'development' 
        ? "http://localhost:8000" 
        : "https://tatari-backend.onrender.com";
      
             const response = await fetch(`${apiBaseUrl}/api/v1/blog/sections`);
       if (response.ok) {
         const data = await response.json();
         setSections(data || []);
       }
    } catch (error) {
      console.error('Error loading blog sections:', error);
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiBaseUrl = process.env.NODE_ENV === 'development' 
        ? "http://localhost:8000" 
        : "https://tatari-backend.onrender.com";
      
      const token = localStorage.getItem('employee_token');
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', newSection.title);
      formData.append('content', newSection.content);
      if (newSection.imageFile) {
        formData.append('image', newSection.imageFile);
      }
      
      const response = await fetch(`${apiBaseUrl}/api/v1/blog/sections`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setNewSection({ title: '', content: '', imageFile: null });
        setShowAddForm(false);
        loadBlogSections(); // Reload sections
        alert('Blog section added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail || 'Failed to add section'}`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    try {
      const apiBaseUrl = process.env.NODE_ENV === 'development' 
        ? "http://localhost:8000" 
        : "https://tatari-backend.onrender.com";
      
      const token = localStorage.getItem('employee_token');
      
      const response = await fetch(`${apiBaseUrl}/api/v1/blog/sections/${sectionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        loadBlogSections(); // Reload sections
        alert('Section deleted successfully!');
      } else {
        alert('Failed to delete section');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tatari Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, updates, and stories from the forefront of AI and blockchain technology
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Sections */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
                     {/* Add Section Button (Admin Only) */}
           {isLoggedIn && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8 flex justify-center"
             >
               <button
                 onClick={() => setShowAddForm(true)}
                 className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-200 flex items-center space-x-2"
               >
                 <Plus className="h-5 w-5" />
                 <span>Add New Section</span>
               </button>
             </motion.div>
           )}

          {/* Add Section Form (Admin Only) */}
          {showAddForm && isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-gray-800 rounded-2xl p-6 border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Add New Blog Section</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddSection} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={newSection.title}
                    onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter section title"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    value={newSection.content}
                    onChange={(e) => setNewSection({...newSection, content: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter section content"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setNewSection({...newSection, imageFile: file});
                      }
                    }}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                    required
                  />
                  {newSection.imageFile && (
                    <p className="text-sm text-gray-400 mt-2">
                      Selected: {newSection.imageFile.name}
                    </p>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{isLoading ? 'Adding...' : 'Add Section'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Blog Sections List */}
          <div className="space-y-8">
            {sections.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-400 text-lg">No blog sections yet.</p>
                {isLoggedIn && (
                  <p className="text-gray-500 mt-2">Click "Add New Section" to create the first blog post.</p>
                )}
              </motion.div>
            ) : (
              sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700"
                >
                  <div className="md:flex">
                                         <div className="md:w-1/3">
                       <img
                         src={`${process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://tatari-backend.onrender.com'}${section.imageUrl}`}
                         alt={section.title}
                         className="w-full h-64 md:h-full object-cover"
                         onError={(e) => {
                           e.currentTarget.src = 'https://via.placeholder.com/400x300/374151/FFFFFF?text=Blog+Image';
                         }}
                       />
                     </div>
                    <div className="md:w-2/3 p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {section.title}
                        </h2>
                        {isLoggedIn && (
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="text-red-400 hover:text-red-300 p-2"
                            title="Delete section"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        {section.content}
                      </p>
                      <div className="text-sm text-gray-500">
                        Published on {new Date(section.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 