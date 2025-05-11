import React, {Suspense,lazy} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Redirect, BrowserRouter as Router, Routes, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NotFound from './404.js'
import PageTitle from './components/utils/PageTitle'
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
        <Route path="/" element = {<>
                                      <PageTitle title="Latest industry news, interviews, technologies and resources | The Blog" />
                                      <Home />
                                   </>} />
        <Route path="/login" element={<>
                                        <PageTitle title="Login | The Blog" />
                                        <Login />
                                      </>} />
        <Route path="/signup" element={<>
                                        <PageTitle title="SignUp | The Blog" />
                                        <SignUp />
                                       </>} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="blogs/:tag" element={<BlogsTag />} />
        <Route path="/add_blog" element={<>
                                            <PageTitle title="Add Post | The Blog" />
                                            <AddPost />
                                         </>} />
        <Route path="/forgot_password" element={<>
                                                  <PageTitle title="Forgot Password | The Blog" />
                                                  <ForgotPassword />
                                                </>} />
        <Route path='*' element={<>
                                    <PageTitle title="Page Not found | The Blog" />
                                    <NotFound />
                                  </>} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
