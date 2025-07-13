import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookmarkList from './components/BookmarkList';
import AddBookmark from './components/AddBookmark';
import Categories from './components/Categories';
import SearchBar from './components/SearchBar';
import './App.css';

// Sample initial data
const SAMPLE_BOOKMARKS = [
  {
    id: '1',
    title: 'React Tutorial for Beginners',
    url: 'https://www.youtube.com/watch?v=dGcsHMXbSOA',
    channel: 'Programming with Mosh',
    description: 'Complete React tutorial for beginners',
    category: 'Tech',
    thumbnail: 'https://img.youtube.com/vi/dGcsHMXbSOA/maxresdefault.jpg',
    duration: '2:30:45',
    dateAdded: new Date('2024-01-15').toISOString(),
    rating: 4
  },
  {
    id: '2',
    title: 'JavaScript ES6 Features',
    url: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc',
    channel: 'Traversy Media',
    description: 'Modern JavaScript features explained',
    category: 'Tech',
    thumbnail: 'https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg',
    duration: '1:45:20',
    dateAdded: new Date('2024-01-10').toISOString(),
    rating: 5
  },
  {
    id: '3',
    title: 'Relaxing Piano Music',
    url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    channel: 'Peaceful Piano',
    description: 'Beautiful piano music for relaxation',
    category: 'Music',
    thumbnail: 'https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
    duration: '3:00:00',
    dateAdded: new Date('2024-01-08').toISOString(),
    rating: 3
  }
];

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [categories, setCategories] = useState(['All', 'Music', 'Tech', 'Gaming', 'Education', 'Entertainment']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('youtube-bookmarks');
      const savedCategories = localStorage.getItem('youtube-categories');
      
      if (savedBookmarks) {
        const parsedBookmarks = JSON.parse(savedBookmarks);
        setBookmarks(parsedBookmarks);
      } else {
        // Set sample data if no saved bookmarks
        setBookmarks(SAMPLE_BOOKMARKS);
      }
      
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(parsedCategories);
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Fallback to sample data
      setBookmarks(SAMPLE_BOOKMARKS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    if (!isLoading && bookmarks.length > 0) {
      try {
        localStorage.setItem('youtube-bookmarks', JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Error saving bookmarks:', error);
      }
    }
  }, [bookmarks, isLoading]);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('youtube-categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Error saving categories:', error);
      }
    }
  }, [categories, isLoading]);

  const addBookmark = (bookmark) => {
    const newBookmark = {
      ...bookmark,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString(),
      rating: bookmark.rating || 0
    };
    setBookmarks(prev => [newBookmark, ...prev]);
    setShowAddForm(false);
  };

  const deleteBookmark = (id) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const updateBookmark = (id, updatedBookmark) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.id === id 
          ? { ...bookmark, ...updatedBookmark }
          : bookmark
      )
    );
  };

  const updateRating = (id, rating) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.id === id 
          ? { ...bookmark, rating }
          : bookmark
      )
    );
  };

  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories(prev => [...prev, categoryName]);
    }
  };

  const deleteCategory = (categoryName) => {
    if (categoryName !== 'All') {
      setCategories(prev => prev.filter(cat => cat !== categoryName));
      // Update bookmarks that have this category
      setBookmarks(prev => 
        prev.map(bookmark => 
          bookmark.category === categoryName
            ? { ...bookmark, category: 'Entertainment' }
            : bookmark
        )
      );
    }
  };

  // Filter bookmarks based on selected category and search term
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesCategory = selectedCategory === 'All' || bookmark.category === selectedCategory;
    const matchesSearch = 
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bookmark.description && bookmark.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (bookmark.channel && bookmark.channel.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading YouTube Bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onAddClick={() => setShowAddForm(true)} 
          bookmarkCount={bookmarks.length} 
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-80">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
              />
              <Categories 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <BookmarkList 
                      bookmarks={filteredBookmarks}
                      onDelete={deleteBookmark}
                      onUpdate={updateBookmark}
                      onUpdateRating={updateRating}
                      categories={categories}
                    />
                  } 
                />
              </Routes>
            </div>
          </div>
        </main>

        {/* Add Bookmark Modal */}
        {showAddForm && (
          <AddBookmark 
            onAdd={addBookmark}
            onClose={() => setShowAddForm(false)}
            categories={categories}
            onAddCategory={addCategory}
          />
        )}
      </div>
    </Router>
  );
}

export default App;