import 'antd/dist/reset.css'
import { ConditionEditPage } from 'pages/Condition/Edit'
import { LectureExcelPage } from 'pages/Lecture/Excel'
import { MainPage } from 'pages/Main'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as any)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/condition/edit/:major_code/:year" element={<ConditionEditPage />} />
        <Route path="/lecture/excel" element={<LectureExcelPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
