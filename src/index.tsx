import 'antd/dist/reset.css'
import { ConditionEditPage } from 'pages/Condition/Edit'
import { LectureExcelPage } from 'pages/Lecture/Excel'
import { LectureGroupPage } from 'pages/Lecture/Group'
import { MainPage } from 'pages/Main'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { saveDefaultTimetable } from 'utils/saveDefaultTimetable'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

const VersionCheckProvider = () => {
  useEffect(() => {
    saveDefaultTimetable()
  }, [])
  return null
}

root.render(
  <React.StrictMode>
    <VersionCheckProvider />
    <BrowserRouter>
      <Routes>
        <Route path="/condition/edit/:major_code/:year" element={<ConditionEditPage />} />
        <Route path="/lecture/excel" element={<LectureExcelPage />} />
        <Route path="/lecture/group" element={<LectureGroupPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
