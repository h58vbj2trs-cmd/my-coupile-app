
import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { INITIAL_POSTS } from '../constants';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('sweetheart_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [newCaption, setNewCaption] = useState('');

  useEffect(() => {
    localStorage.setItem('sweetheart_posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = () => {
    if (!newCaption) return;
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'Me',
      imageUrl: `https://picsum.photos/seed/${Date.now()}/1000/1000`,
      caption: newCaption,
      date: new Date().toISOString().split('T')[0]
    };
    setPosts([newPost, ...posts]);
    setNewCaption('');
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FDFBF9] overflow-hidden">
      <header className="px-6 pt-16 pb-6 flex justify-between items-center">
        <h1 className="font-round text-3xl text-gray-800">우리의 기록</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-[#FF9E9E]">+</button>
      </header>
      <div className="flex-1 overflow-y-auto px-4 pb-40 space-y-6">
        {showAdd && (
          <div className="p-4 bg-white rounded-3xl shadow-sm border border-rose-50">
            <textarea value={newCaption} onChange={(e) => setNewCaption(e.target.value)} placeholder="오늘의 추억을 적어보세요" className="w-full h-24 p-2 outline-none font-round text-lg resize-none" />
            <button onClick={handleAddPost} className="w-full py-3 bg-[#FF9E9E] text-white rounded-xl font-round mt-2">올리기</button>
          </div>
        )}
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50">
            <img src={post.imageUrl} className="w-full aspect-square object-cover" />
            <div className="p-4">
              <p className="font-round text-xl text-gray-700">"{post.caption}"</p>
              <p className="text-[10px] text-gray-300 mt-2 uppercase">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
