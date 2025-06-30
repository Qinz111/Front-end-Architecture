import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Lấy trang đích từ state hoặc mặc định là dashboard
  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, accept any username/password combination
      // In real app, you would make an API call here
      console.log("Login attempt:", formData);

      // Store user info in localStorage or context
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          role: "admin",
        })
      );

      // Redirect to the page they were trying to access
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        general: "Đăng nhập thất bại. Vui lòng thử lại.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-overlay"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <i className="fas fa-utensils logo-icon"></i>
            </div>
            <h1 className="login-title">Đăng nhập</h1>
            <p className="login-subtitle">
              Chào mừng bạn đến với hệ thống quản lý nhà hàng
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {errors.general}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user me-2"></i>
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Nhập tên đăng nhập"
                disabled={isLoading}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-2"></i>
                Mật khẩu
              </label>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Nhập mật khẩu"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="text-muted mb-0">
              <small>
                <i className="fas fa-info-circle me-1"></i>
                Demo: Sử dụng bất kỳ tên đăng nhập và mật khẩu nào
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
