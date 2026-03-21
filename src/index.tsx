import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import StudentPage from './pages/StudentPage'
import TeacherPage from './pages/TeacherPage'
import HomePage from './сomponents/HomePage'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/student' element={<StudentPage />} />
        <Route path='/teacher' element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
