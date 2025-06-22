import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

const users = [
  { id: 1, name: "AKMONSHAK", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNidf5LLmq8PMqC-B3HXvLs_msj61wp-NRSELY5qyW26RyuMgEQmdJvi0Rwjhx-p4j0Oc&usqp=CAU", friends: [2, 3, 4, 5, 6], bio: "Frontend разработчик. Люблю React и котиков." },
  { id: 2, name: "Bob", avatar: "https://shapka-youtube.ru/wp-content/uploads/2021/09/ava-lama-v-skafandre.jpg", friends: [1], bio: "Backend энтузиаст. Node.js — жизнь." },
  { id: 3, name: "Beka", avatar: "https://shapka-youtube.ru/wp-content/uploads/2020/12/girls-ava1.jpg", friends: [1], bio: "UX дизайнер и любитель кофе." },
  { id: 4, name: "Diana", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSUguOUXeYFbW3t-z3B0mzvdrHeZo14XQG4hDgZfKtVkBwQMCI1bK-v7qqUBtJs9LFaM&usqp=CAU", friends: [1], bio: "DevOps инженер. Docker навсегда." },
  { id: 5, name: "Nuka", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyP-7-3hL48Ow1Yg2VkoQnFiLK9X3FBrkN2Q&s", friends: [1], bio: "QA специалист. Ищу баги и счастье." },
  { id: 6, name: "Yerasyl", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCUOg3RzdL4aJPmoso0YNWx-0JxXXRrX3CgQ&s", friends: [1], bio: "Fullstack разработчик с чувством юмора." },
];

const initialPosts = [
  { id: 101, user: users[1], content: "Привет, React!", date: "2025-06-20 14:12", likes: 3 },
  { id: 102, user: users[2], content: "Сегодня был отличный день для дизайна.", date: "2025-06-21 09:30", likes: 5 },
  { id: 103, user: users[3], content: "CI/CD работает, как часы!", date: "2025-06-21 18:45", likes: 2 },
];

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">CONNECT</h1>
      <div className="nav-links">
        <Link to="/">🏠 Главная</Link>
        <Link to="/profile/1">👤 Профиль</Link>
      </div>
    </nav>
  );
}

function ProfilePage() {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));
  const friendList = users.filter((u) => user.friends.includes(u.id));
  const userPosts = initialPosts.filter((post) => post.user.id === user.id);

  return (
    <div className="container">
      <div className="profile-card">
        <img src={user.avatar} alt="avatar" className="avatar-xl" />
        <div>
          <h2 className="username-large">{user.name}</h2>
          <p className="description">{user.bio}</p>
          <p className="additional-info">📅 Участник с 2024 года<br/>🌐 Последний визит: 22 июня 2025</p>
        </div>
      </div>
      <div className="friends-section">
        <h3 className="friends-title">Друзья ({friendList.length})</h3>
        <ul className="friend-list">
          {friendList.map((friend) => (
            <li key={friend.id} className="friend-item">
              <Link to={`/profile/${friend.id}`} className="friend-link">
                <img src={friend.avatar} alt={friend.name} className="avatar" />
                <span>{friend.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="post-list">
        <h3 className="friends-title">Посты {user.name}</h3>
        {userPosts.map((post) => (
          <div key={post.id} className="post">
            <p className="content">{post.content}</p>
            <div className="date">{post.date}</div>
            <div className="like-button">❤️ {post.likes} лайков</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home({ posts, setPosts }) {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (text.trim() !== "") {
      const newPost = {
        id: Date.now(),
        user: users[0],
        content: text,
        date: new Date().toLocaleString(),
        likes: 0,
      };
      setPosts([newPost, ...posts]);
      setText("");
    }
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="container">
      <div className="create-post">
        <textarea
          className="textarea"
          rows="3"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что у вас нового?"
        ></textarea>
        <button onClick={handlePost} className="button">
          Опубликовать
        </button>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.user.avatar} alt="avatar" className="avatar" />
              <div>
                <div className="username">
                  <Link to={`/profile/${post.user.id}`} className="link-no-style">{post.user.name}</Link>
                </div>
                <div className="date">{post.date}</div>
              </div>
            </div>
            <p className="content">{post.content}</p>
            <button className="like-button" onClick={() => handleLike(post.id)}>
              ❤️ {post.likes} лайков
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;