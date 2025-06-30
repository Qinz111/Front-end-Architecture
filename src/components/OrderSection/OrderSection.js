import React, { useState } from "react";
import "./OrderSection.scss";

const OrderSection = ({ selectedTable, onAddToBill }) => {
  const [activeTab, setActiveTab] = useState("menu");
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const menuItems = [
    {
      id: 1,
      name: "Phở bò đặc biệt",
      price: 85000,
      category: "Món chính",
      image: "https://via.placeholder.com/300x200?text=Food",
      favorite: true,
    },
    {
      id: 2,
      name: "Bún chả Hà Nội",
      price: 75000,
      category: "Món chính",
      image: "https://via.placeholder.com/300x200?text=Food",
    },
    {
      id: 3,
      name: "Trà đào cam sả",
      price: 35000,
      category: "Đồ uống",
      image: "https://via.placeholder.com/300x200?text=Drink",
    },
    {
      id: 4,
      name: "Cơm tấm sườn nướng",
      price: 65000,
      category: "Món chính",
      image: "https://via.placeholder.com/300x200?text=Food",
    },
    {
      id: 5,
      name: "Gỏi cuốn tôm thịt",
      price: 45000,
      category: "Khai vị",
      image: "https://via.placeholder.com/300x200?text=Food",
    },
    {
      id: 6,
      name: "Cà phê sữa đá",
      price: 25000,
      category: "Đồ uống",
      image: "https://via.placeholder.com/300x200?text=Drink",
    },
    {
      id: 7,
      name: "Bánh xèo miền Tây",
      price: 55000,
      category: "Món chính",
      image: "https://via.placeholder.com/300x200?text=Food",
    },
    {
      id: 8,
      name: "Chả cá Lã Vọng",
      price: 120000,
      category: "Món chính",
      image: "https://via.placeholder.com/300x200?text=Food",
    },
    {
      id: 9,
      name: "Sinh tố bơ",
      price: 40000,
      category: "Đồ uống",
      image: "https://via.placeholder.com/300x200?text=Drink",
    },
  ];

  const categories = ["Tất cả", "Khai vị", "Món chính", "Đồ uống"];
  const tabs = [
    { id: "menu", name: "Thực đơn" },
    { id: "favorites", name: "Món yêu thích" },
    { id: "combos", name: "Combo" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "Tất cả" || item.category === activeCategory;
    const matchesTab =
      activeTab === "menu" ||
      (activeTab === "favorites" && item.favorite) ||
      (activeTab === "combos" && item.category === "Combo");
    return matchesCategory && matchesTab;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleAddToBill = (item) => {
    onAddToBill(item);
  };

  return (
    <div className="order-section mt-4">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            Order bàn <span className="fw-bold">{selectedTable.id}</span>
          </h5>
        </div>
        <div className="card-body">
          {/* Tab menu */}
          <ul className="nav nav-tabs mb-3">
            {tabs.map((tab) => (
              <li className="nav-item" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Categories */}
          <div className="categories mb-3">
            <div className="d-flex gap-2 overflow-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`btn btn-sm ${
                    activeCategory === category
                      ? "btn-primary"
                      : "btn-outline-secondary"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu items */}
          <div className="menu-items">
            <div className="row g-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="col-6 col-md-4 col-lg-3">
                  <div className="menu-item">
                    <div className="menu-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                      />
                      {item.favorite && (
                        <button className="favorite-btn">
                          <i className="fas fa-heart text-danger"></i>
                        </button>
                      )}
                    </div>
                    <div className="menu-item-info">
                      <h6 className="menu-item-name">{item.name}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="menu-item-price">
                          {formatPrice(item.price)}
                        </span>
                        <button
                          className="btn btn-sm btn-primary add-to-cart-btn"
                          onClick={() => handleAddToBill(item)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
