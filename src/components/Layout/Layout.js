import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.scss";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Xác định title động theo route
  let title = "Đăng kí khoá học";
  if (location.pathname === "/join-course") title = "Tham gia khoá học";
  else if (location.pathname === "/orders") title = "Lịch sử thanh toán";
  else if (location.pathname === "/course-management")
    title = "Quản lý khoá học";
  else if (location.pathname === "/accounts") title = "Quản lí tài khoản";
  else if (location.pathname === "/reports") title = "Báo cáo";
  else if (location.pathname === "/settings") title = "Cài đặt";

  return (
    <div className="layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        currentPath={location.pathname}
      />
      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <Header onMenuToggle={toggleSidebar} title={title} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
