// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Login from "./components/Login/Login";
import Name from "./components/Login/Name";
import Number from "./components/Login/Number";
import Avatar from "./components/Login/Avatar";
import Page1 from "./components/Login/Page1";
import Page2 from "./components/Login/Page2";
import Page3 from "./components/Login/Page3";
import Page4 from "./components/Login/Page4";
import Page5 from "./components/Login/Page5";
import Form from "./components/Form";

// Dashboard Pages
// import Dashboard from "./components/Dashboard/Dashboard";
import AuditReport from "./components/Dashboard/AuditReport";
import RaiseFunds from "./components/Dashboard/RaiseFunds";
// import ImpactCalculator from "./components/Dashboard/ImpactCalculator";
import WhyInternship from "./components/Dashboard/WhyInternship";
import UnderstandRole from "./components/Dashboard/UnderstandRole";
import StartOrientation from "./components/Dashboard/StartOrientation";
import Rewards from "./components/Dashboard/Rewards";
import BuildConnection from "./components/Dashboard/BuildConnection";
import CaptureAttention from "./components/Dashboard/CaptureAttention";
import G80Certificate from "./components/Dashboard/G80Certificate";
import TrustCertificate from "./components/Dashboard/TrustCertificate";
import ProjectKeytaab from "./components/Dashboard/Projectkeytaab";
import Learning from "./components/Dashboard/Learning";
import Emotional from "./components/Dashboard/emotional";
import Mental from "./components/Dashboard/Mental";
import Insights from "./components/Dashboard/Insights";
import Donations from "./components/Dashboard/Donation";
import Explore from "./components/Dashboard/Explore";
import Community from "./components/Dashboard/Community";
import CertificatesPage from "./components/dashboard/CertificatesPage";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/name" element={<Name />} />
      <Route path="/number" element={<Number />} />
      <Route path="/avatar" element={<Avatar />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/page4" element={<Page4 />} />
      <Route path="/page5" element={<Page5 />} />
      <Route path="/form" element={<Form />} />

      {/* Dashboard Routes inside layout */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audit" element={<AuditReport />} />
        <Route path="/raise-funds" element={<RaiseFunds />} />
        <Route path="/impact" element={<ImpactCalculator />} />
        <Route path="/internship" element={<WhyInternship />} />
        <Route path="/role" element={<UnderstandRole />} />
        <Route path="/orientation" element={<StartOrientation />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/connection" element={<BuildConnection />} />
        <Route path="/attention" element={<CaptureAttention />} />
        <Route path="/g80" element={<G80Certificate />} />
        <Route path="/trust" element={<TrustCertificate />} />
        <Route path="/keytaab" element={<ProjectKeytaab />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/community" element={<Community />} />
        <Route path="/emotional" element={<Emotional />} />
        <Route path="/mental" element={<Mental />} />
        <Route path="/certificates" element={<CertificatesPage />} />
      </Route>

      {/* Redirect unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
