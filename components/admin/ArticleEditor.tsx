import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useArticles } from '../../contexts/ArticleContext';
import { Article } from '../../types';

export const ArticleEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { articles, addArticle, updateArticle } = useArticles();
  
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: '',
    description: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    author: 'MAM',
    themeColor: '#111111'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const article = articles.find(a => a.id === id);
      if (article) {
        setFormData(article);
      }
    }
  }, [id, articles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.content) {
      setError('Title and Content are required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (id) {
        await updateArticle(id, formData);
      } else {
        const newArticle = {
          date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          title: formData.title!,
          category: formData.category || 'Tech',
          description: formData.description || '',
          content: formData.content!,
          imageUrl: formData.imageUrl!,
          author: formData.author || 'MAM',
          themeColor: formData.themeColor || '#111111'
        };
        await addArticle(newArticle);
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Failed to save article:', err);
      setError(err.message || 'Failed to save article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      {/* Admin Header */}
      <header className="bg-black text-white px-6 py-4 border-b-2 border-gray-800 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <span className="font-black text-xl tracking-tighter">MAM Editor</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/dashboard')} className="text-xs font-bold uppercase tracking-widest hover:text-gray-300">Cancel</button>
           <button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-fas-red text-white px-6 py-2 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors disabled:opacity-50"
           >
             {isSubmitting ? 'Saving...' : (id ? 'Update Article' : 'Publish Article')}
           </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Main Metadata */}
          <div className="bg-white p-8 shadow-sm border border-gray-200 space-y-6">
            <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Title</label>
               <input
                 name="title"
                 value={formData.title}
                 onChange={handleChange}
                 className="w-full text-3xl font-black border-b-2 border-gray-200 focus:border-black focus:outline-none pb-2 transition-colors placeholder-gray-300"
                 placeholder="Enter article title..."
               />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Category</label>
                   <input
                     name="category"
                     value={formData.category}
                     onChange={handleChange}
                     className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors"
                     placeholder="e.g. AI, Web Dev, System Design"
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Theme Color</label>
                   <div className="flex gap-2">
                     <input
                       type="color"
                       name="themeColor"
                       value={formData.themeColor}
                       onChange={handleChange}
                       className="h-10 w-10 border-0 p-0 cursor-pointer"
                     />
                     <input
                       name="themeColor"
                       value={formData.themeColor}
                       onChange={handleChange}
                       className="flex-grow bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors font-mono text-sm"
                     />
                   </div>
                </div>
            </div>

            <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Short Description</label>
               <textarea
                 name="description"
                 value={formData.description}
                 onChange={handleChange}
                 rows={3}
                 className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors resize-none"
                 placeholder="Brief summary for the card view..."
               />
            </div>

            <div>
               <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-gray-500">Image URL</label>
               <input
                 name="imageUrl"
                 value={formData.imageUrl}
                 onChange={handleChange}
                 className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-black transition-colors font-mono text-sm"
               />
               {formData.imageUrl && (
                 <div className="mt-4 aspect-video w-full overflow-hidden bg-gray-100 rounded-sm">
                   <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                 </div>
               )}
            </div>
          </div>

          {/* Content Editor */}
          <div className="bg-white p-8 shadow-sm border border-gray-200">
             <div className="flex justify-between items-center mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Article Content (HTML)</label>
                <div className="text-xs text-gray-400">Supports basic HTML tags: &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.</div>
             </div>
             <textarea
               name="content"
               value={formData.content}
               onChange={handleChange}
               rows={20}
               className="w-full bg-gray-900 text-gray-100 font-mono text-sm p-6 focus:outline-none rounded-sm"
               placeholder="<p>Start writing your masterpiece...</p>"
             />
          </div>

        </form>
      </div>
    </div>
  );
};