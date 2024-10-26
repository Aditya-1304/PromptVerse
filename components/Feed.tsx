"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import PromptCard from './PromptCard';

interface Post {
  _id: string;
  creator: {
    username: string;
    _id: string;
    email: string;
    image: string;
  };
  tag: string;
  prompt: string;
}

interface PromptCardListProps {
  data: Post[];
  handleTagClick: (tagName: string) => void;
}

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed: React.FC = () => {
  const [searchResult, setSearchedResults] = useState<Post[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchText: string): Post[] => {
    const regex = new RegExp(searchText, 'gi');
    return allPosts.filter((post) =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResult}
          handleTagClick={handleTagClick} 
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick} 
        />
      )}
    </section>
  );
};

export default Feed;