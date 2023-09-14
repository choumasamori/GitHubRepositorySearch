"use client";
import React, { useState, useEffect } from 'react';
import { FiChevronDown , FiChevronUp} from 'react-icons/fi';
import { AiFillStar } from "react-icons/ai";

// Define TypeScript types for your data
interface Repo {
  repo_name: string;
  desc: string;
  stars: number;
}

interface User {
  name: string;
  repos: Repo[];
}

interface UserResponse {
  login: string;
}

interface RepoResponse {
  name: string;
  description: string;
  stargazers_count: number;
}

// User Component
const User = ({ user }: { user: User }) => {
  const [showRepos, setShowRepos] = useState(false);

  const toggleRepos = () => {
    setShowRepos(!showRepos);
  };

  return (
    <div style={{marginTop:4}}>
      <div style={{backgroundColor: 'lightgray', padding: 8, flexDirection: 'row', display: 'flex', justifyContent: 'space-between', cursor:'pointer'}} onClick={toggleRepos}>
        <a>{user.name}</a>
          {showRepos ? <FiChevronUp style={{ marginTop: 4 }} /> : <FiChevronDown style={{ marginTop: 4 }} />}
      </div>
      {showRepos && <Repositories repos={user.repos} />}
    </div>
  );
};

// Repositories Component
const Repositories = ({ repos }: { repos: Repo[] }) => (
  <>
    {repos.length > 0 ? (
      repos.map((res: Repo, index: number) => (
        <div key={index} style={{ backgroundColor: 'lightgray', padding: 8, marginTop: 8, marginLeft: 8, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flexDirection: 'column', display: 'flex' }}>
            <a style={{ fontWeight: 'bold' }}>{res.repo_name}</a>
            <a>{res.desc}</a>
          </div>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            {res.stars}
            <AiFillStar style={{ marginTop: 4 }} />
          </div>
        </div>
      ))
    ) : (
      <p>No repositories available.</p>
    )}
  </>
);

const Main = () => {
  const [query, setQuery] = useState('');
  const [dataList, setDataList] = useState<User[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsLoading(true)
    setShowResult(false)
    setDataList([])
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${query}+in:login&per_page=5`);
      const data = await response.json();
  
      const users: User[] = await Promise.all(
        data.items.map(async (r: UserResponse) => {
          const reposResponse = await fetch(`https://api.github.com/users/${r.login}/repos?per_page=100`);
          const reposData = await reposResponse.json();
  
          const repos: Repo[] = reposData.map((d: RepoResponse) => ({
            repo_name: d.name,
            desc: d.description,
            stars: d.stargazers_count
          }));
  
          return { name: r.login, repos: repos };
        })
      );
  
      setDataList(users);
      setShowResult(true);
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ flexDirection: 'column', display: 'flex', width: '90%', maxWidth:500}}>
      <input
        type="text"
        placeholder="Enter username"
        value={query}
        onChange={handleInputChange}
        style={{ backgroundColor: 'lightgray', padding: 8 }}
      />
      <button onClick={handleSubmit} style={{ backgroundColor: '#1DA1F2', color: 'white', padding: 8, marginTop: 8 }}>
        Search
      </button>
      <div>
        {isLoading && <div style={{alignSelf:'center'}}>Fetching...</div>}
        {showResult && (
          <>
            <a style={{ color: 'gray' }}>Showing users for {query}</a>
            {dataList.map((data, index) => (
              <User key={index} user={data} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Main;