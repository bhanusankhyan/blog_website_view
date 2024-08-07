import React, {Suspense,lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Redirect, BrowserRouter as Router, Routes, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NotFound from './404.js'
// import 'font-awesome/css/font-awesome.min.css';
// import Home from './components/Home/Home'

const Home = lazy(() => import('./components/Home/Home'))
const Login = lazy(() => import('./components/Authentication/Login'))
const SignUp = lazy(() => import('./components/Authentication/SignUp'))
const Blog = lazy(() => import('./components/Blog/Blog'))
const BlogsTag = lazy(() => import('./components/BlogTag/BlogTag'))
const AddPost = lazy(() => import('./components/handlePost/AddPost'))
const ForgotPassword = lazy(() => import('./components/Authentication/ForgotPassword'))

function App() {
  return (
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="blogs/:tag" element={<BlogsTag />} />
        <Route path="/add_blog" element={<AddPost />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
