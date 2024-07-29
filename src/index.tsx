import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { PRIMARY_COLOR } from 'constants/common'
import { AdminConditionPage } from 'pages/Admin/Condition'
import { AdminConditionDetailPage } from 'pages/Admin/Condition/Detail'
import { AdminMainPage } from 'pages/Admin/Main'
import { ConditionEditPage as LegacyConditionEditPage } from 'pages/Legacy/Condition/Edit'
import { GraduationDecisionPage as LegacyGraduationDecisionPage } from 'pages/Legacy/Graduation/Decision'
import { LectureExcelPage as LegacyLectureExcelPage } from 'pages/Legacy/Lecture/Excel'
import { LectureGroupPage as LegacyLectureGroupPage } from 'pages/Legacy/Lecture/Group'
import { MainPage as LegacyMainPage } from 'pages/Legacy/Main'
import { MainPage } from 'pages/Main'
import { ResultPage } from 'pages/Result'
import { SubmitPage } from 'pages/Submit'
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

const theme = {
  token: {
    colorPrimary: PRIMARY_COLOR,
    fontFamily: 'Pretendard',
  },
}
root.render(
  <React.StrictMode>
    <VersionCheckProvider />
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/legacy/condition/edit/:major_code/:year" element={<LegacyConditionEditPage />} />
          <Route path="/legacy/lecture/excel" element={<LegacyLectureExcelPage />} />
          <Route path="/legacy/lecture/group" element={<LegacyLectureGroupPage />} />
          <Route path="/legacy/graduation/decision/:major_code/:year" element={<LegacyGraduationDecisionPage />} />
          <Route path="/legacy/" element={<LegacyMainPage />} />

          <Route path="/" element={<MainPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/result" element={<ResultPage />} />

          <Route path="/admin/" element={<AdminMainPage />} />
          <Route path="/admin/condition" element={<AdminConditionPage />} />
          <Route path="/admin/condition/detail/:id" element={<AdminConditionDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
)
