import 'antd/dist/reset.css'
import { ConditionEditPage as LegacyConditionEditPage } from 'pages/Legacy/Condition/Edit'
import { GraduationDecisionPage as LegacyGraduationDecisionPage } from 'pages/Legacy/Graduation/Decision'
import { LectureExcelPage as LegacyLectureExcelPage } from 'pages/Legacy/Lecture/Excel'
import { LectureGroupPage as LegacyLectureGroupPage } from 'pages/Legacy/Lecture/Group'
import { MainPage as LegacyMainPage } from 'pages/Legacy/Main'
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
        <Route path="/legacy/condition/edit/:major_code/:year" element={<LegacyConditionEditPage />} />
        <Route path="/legacy/lecture/excel" element={<LegacyLectureExcelPage />} />
        <Route path="/legacy/lecture/group" element={<LegacyLectureGroupPage />} />
        <Route path="/legacy/graduation/decision/:major_code/:year" element={<LegacyGraduationDecisionPage />} />
        <Route path="/legacy/" element={<LegacyMainPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
