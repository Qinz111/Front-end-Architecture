import React, { useState, useEffect } from "react";
import "./Header.scss";

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <h1 className="h4 mb-0 fw-semibold text-dark">
                {title || "Quản lý bàn & Đặt món"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
