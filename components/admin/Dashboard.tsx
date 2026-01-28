import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useArticles } from '../../contexts/ArticleContext';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { articles, deleteArticle } = useArticles();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Admin Header */}
      <header className="bg-black text-white px-6 py-4 border-b-2 border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-black text-2xl tracking-tighter hover:text-fas-red transition-colors">MAM</Link>
          <span className="bg-fas-red text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm tracking-widest">Admin</span>
        </div>
        <div className="flex items-center gap-6">
           <span className="text-gray-400 text-xs font-bold uppercase tracking-widest hidden sm:block">Logged in as Admin</span>
           <button onClick={handleLogout} className="text-xs font-bold uppercase tracking-widest hover:text-fas-red transition-colors">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
           <div>
             <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Content Dashboard</h1>
             <p className="text-gray-500 font-medium">Manage your blog posts and portfolio items.</p>
           </div>
           <Link to="/dashboard/new" className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest text-sm hover:bg-fas-red transition-colors shadow-lg">
             + New Article
           </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-white p-6 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Articles</div>
              <div className="text-5xl font-black">{articles.length}</div>
           </div>
           <div className="bg-white p-6 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Total Views</div>
              <div className="text-5xl font-black">24.5k</div>
           </div>
           <div className="bg-white p-6 border-2 border-gray-200">
              <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Avg. Read Time</div>
              <div className="text-5xl font-black">4m</div>
           </div>
        </div>

        {/* Articles List */}
        <div className="bg-white border-2 border-gray-200 overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-gray-50 border-b-2 border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500">
                   <th className="p-6">Article</th>
                   <th className="p-6">Category</th>
                   <th className="p-6">Date</th>
                   <th className="p-6 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {articles.map((article) => (
                   <tr key={article.id} className="group hover:bg-gray-50 transition-colors">
                     <td className="p-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-gray-200 flex-shrink-0 overflow-hidden">
                              <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <div className="font-bold text-lg leading-tight mb-1 group-hover:text-fas-red transition-colors">
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                              </div>
                              <div className="text-xs text-gray-400 font-mono truncate max-w-[200px]">{article.id}</div>
                           </div>
                        </div>
                     </td>
                     <td className="p-6">
                       <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest border border-gray-200 rounded-sm">
                         {article.category}
                       </span>
                     </td>
                     <td className="p-6 font-mono text-sm text-gray-500">
                       {article.date}
                     </td>
                     <td className="p-6 text-right">
                       <button 
                         onClick={() => deleteArticle(article.id)}
                         className="text-red-500 hover:text-black font-bold uppercase text-xs tracking-widest transition-colors"
                       >
                         Delete
                       </button>
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