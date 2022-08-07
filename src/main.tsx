import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from "./routes/post"

import { CommentsProvider, CommentsConfigContext } from "strapi-comments-client"

import { STRAPI } from "./lib/urls"
import AuthContext, { AuthProvider } from "./context/AuthContext"

interface AppWrapperProps {
  children: React.ReactNode
}
const AppWrapper = (props: AppWrapperProps) => {

  const { setUser } = useContext(CommentsConfigContext)

  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [user])
  return (<>{props.children}</>)
}

ReactDOM.render(
  <React.StrictMode>
    <CommentsProvider apiURL={STRAPI}>
      <AuthProvider>
        <BrowserRouter>
          <AppWrapper>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path=":contentID" element={<Post />} />
            </Routes>
          </AppWrapper>
        </BrowserRouter>
      </AuthProvider>
    </CommentsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
