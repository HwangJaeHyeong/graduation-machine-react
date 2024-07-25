import 'antd/dist/reset.css'
import { ConditionEditPage } from 'pages/Legacy/Condition/Edit'
import { GraduationDecisionPage } from 'pages/Legacy/Graduation/Decision'
import { LectureExcelPage } from 'pages/Legacy/Lecture/Excel'
import { LectureGroupPage } from 'pages/Legacy/Lecture/Group'
import { MainPage } from 'pages/Legacy/Main'
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
        <Route path="/legacy/condition/edit/:major_code/:year" element={<ConditionEditPage />} />
        <Route path="/legacy/lecture/excel" element={<LectureExcelPage />} />
        <Route path="/legacy/lecture/group" element={<LectureGroupPage />} />
        <Route path="/legacy/graduation/decision/:major_code/:year" element={<GraduationDecisionPage />} />
        <Route path="/legacy/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
