import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article } from '../types';
import { supabase } from '../services/supabase';

interface ArticleContextType {
  articles: Article[];
  loading: boolean;
  addArticle: (article: Omit<Article, 'id'>) => Promise<void>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  refreshArticles: () => Promise<void>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      console.log('Fetching articles from Supabase...');
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch error:', error);
        throw error;
      }

      console.log('Fetched articles:', data);

      if (data) {
        const mappedArticles: Article[] = data.map(item => ({
          id: item.id,
          category: item.category,
          title: item.title,
          author: item.author,
          date: item.date,
          imageUrl: item.image_url,
          description: item.description,
          themeColor: item.theme_color,
          content: item.content
        }));
        setArticles(mappedArticles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const addArticle = async (article: Omit<Article, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([{
          category: article.category,
          title: article.title,
          author: article.author,
          date: article.date,
          image_url: article.imageUrl,
          description: article.description,
          theme_color: article.themeColor,
          content: article.content
        }])
        .select();

      if (error) throw error;

      if (data) {
        // Optimistic update or re-fetch
        await fetchArticles();
      }
    } catch (error) {
      console.error('Error adding article:', error);
      throw error;
    }
  };

  const updateArticle = async (id: string, article: Partial<Article>) => {
    try {
      const updates: any = {};
      if (article.category) updates.category = article.category;
      if (article.title) updates.title = article.title;
      if (article.author) updates.author = article.author;
      if (article.date) updates.date = article.date;
      if (article.imageUrl) updates.image_url = article.imageUrl;
      if (article.description) updates.description = article.description;
      if (article.themeColor) updates.theme_color = article.themeColor;
      if (article.content) updates.content = article.content;
      updates.updated_at = new Date();

      const { error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchArticles();
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setArticles(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      throw error;
    }
  };

  return (
    <ArticleContext.Provider value={{ articles, loading, addArticle, updateArticle, deleteArticle, refreshArticles: fetchArticles }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};