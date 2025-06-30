import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ collapsed, onToggle, currentPath }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="d-flex align-items-center">
          <i className="fas fa-utensils me-2"></i>
          {!collapsed && <span className="fw-bold">E-LearningPro</span>}
        </div>
        <button
          className="btn btn-link text-white p-0 d-md-none"
          onClick={onToggle}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* User Info */}
      <div className="sidebar-user">
        <div className="avatar">
          <i className="fas fa-user"></i>
        </div>
        {!collapsed && (
          <div className="user-info">
            <p className="name mb-0">Nguyễn Văn A</p>
            <p className="role mb-0">Nhân viên phục vụ</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {/* Nhân viên */}
        <div className="nav-section">
          {!collapsed && <p className="nav-title">Sinh viên</p>}
          <div className="nav-items">
            <button
              className={`nav-item ${currentPath === "/" ? "active" : ""}`}
              onClick={() => handleNavigation("/")}
              title={collapsed ? "Bàn & Đặt món" : ""}
            >
              <i className="fas fa-tv"></i>
              {!collapsed && <span>Đăng kí khoá học</span>}
            </button>
            <button
              className={`nav-item ${
                currentPath === "/join-course" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/join-course")}
              title={collapsed ? "Chuyển bàn" : ""}
            >
              <i className="fas fa-exchange-alt"></i>
              {!collapsed && <span>Tham gia khoá học</span>}
            </button>
          </div>
        </div>

        {/* Quản trị */}
        <div className="nav-section">
          {!collapsed && <p className="nav-title">Giảng viên</p>}
          <div className="nav-items">
            <button
              className={`nav-item ${
                currentPath === "/course-management" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/course-management")}
              title={collapsed ? "Quản lý bàn" : ""}
            >
              <i className="fas fa-chair"></i>
              {!collapsed && <span>Quản lý khoá học</span>}
            </button>
          </div>
        </div>
        <div className="nav-section">
          {!collapsed && <p className="nav-title">Quản trị</p>}
          <div className="nav-items">
            <button
              className={`nav-item ${
                currentPath === "/accounts" ? "active" : ""
              }`}
              onClick={() => handleNavigation("/accounts")}
              title={collapsed ? "Tài khoản" : ""}
            >
              <i className="fas fa-users-cog"></i>
              {!collapsed && <span>Tài khoản</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="nav-item">
          <i className="fas fa-cog"></i>
          {!collapsed && <span>Cài đặt</span>}
        </button>
        <button className="nav-item logout">
          <i className="fas fa-sign-out-alt"></i>
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
