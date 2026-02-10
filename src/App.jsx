import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Inscription from "./pages/Inscription";
import DashboardClient from "./pages/DashboardClient";
import DashboardAdmin from "./pages/DashboardAdmin";
import Subscriptions from "./pages/Subscriptions";
import Requests from "./pages/Requests";

function App() {
  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <BrowserRouter>
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <h1 style={{ textAlign: "center" }}>{appName}</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/dashboard-client" element={<DashboardClient />} />
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/requests" element={<Requests />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
