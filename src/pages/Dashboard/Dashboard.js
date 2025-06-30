import React, { useState } from "react";
import CourseList from "../../components/CourseList/CourseList";
import OrderSection from "../../components/OrderSection/OrderSection";
import BillSection from "../../components/BillSection/BillSection";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import "./Dashboard.scss";

const Dashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [purchasedCourses, setPurchasedCourses] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentCourse, setPaymentCourse] = useState(null);
  const [cartCourses, setCartCourses] = useState([]);
  const [isCartPayment, setIsCartPayment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [cartSearchTerm, setCartSearchTerm] = useState("");
  const [cartFilterType, setCartFilterType] = useState("");

  const courseTypes = [
    { value: "", label: "Tất cả" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "design", label: "Design" },
  ];

  const courses = [
    {
      id: "C01",
      name: "React Cơ Bản",
      price: 500000,
      description: "Khoá học nhập môn React cho người mới bắt đầu.",
      type: "frontend",
    },
    {
      id: "C02",
      name: "NodeJS Nâng Cao",
      price: 700000,
      description: "Xây dựng backend với NodeJS chuyên sâu.",
      type: "backend",
    },
    {
      id: "C03",
      name: "UI/UX Design",
      price: 400000,
      description: "Thiết kế giao diện người dùng chuyên nghiệp.",
      type: "design",
    },
    {
      id: "C04",
      name: "HTML & CSS",
      price: 300000,
      description: "Cơ bản về HTML và CSS.",
      type: "frontend",
    },
    {
      id: "C05",
      name: "ExpressJS",
      price: 600000,
      description: "Backend với ExpressJS.",
      type: "backend",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "" || course.type === filterType)
  );

  const filteredCartCourses = cartCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(cartSearchTerm.toLowerCase()) &&
      (cartFilterType === "" || course.type === cartFilterType)
  );

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleBuyCourse = (course) => {
    if (
      !cartCourses.find((c) => c.id === course.id) &&
      !purchasedCourses[course.id]
    ) {
      setCartCourses((prev) => [...prev, course]);
    }
  };

  const handleCheckoutCart = () => {
    if (cartCourses.length === 0) return;
    setIsCartPayment(true);
    setShowPaymentModal(true);
  };

  const handleCompletePayment = () => {
    if (isCartPayment) {
      const newPurchased = { ...purchasedCourses };
      cartCourses.forEach((course) => {
        newPurchased[course.id] = true;
      });
      setPurchasedCourses(newPurchased);
      setCartCourses([]);
      setIsCartPayment(false);
      setShowPaymentModal(false);
    } else if (paymentCourse) {
      setPurchasedCourses((prev) => ({ ...prev, [paymentCourse.id]: true }));
      setShowPaymentModal(false);
      setPaymentCourse(null);
      if (selectedCourse && selectedCourse.id === paymentCourse.id) {
        setSelectedCourse(null);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="row g-4">
        {/* Danh sách khoá học và chi tiết */}
        <div className="col-lg-8">
          {/* Bộ lọc và tìm kiếm trên danh sách khoá học */}
          <div className="mb-3 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm khoá học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: 250 }}
            />
            <select
              className="form-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ maxWidth: 180 }}
            >
              {courseTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <CourseList
            courses={filteredCourses}
            selectedCourse={selectedCourse}
            onCourseSelect={handleCourseSelect}
            purchasedCourses={purchasedCourses}
            onBuyCourse={handleBuyCourse}
          />
          {selectedCourse && (
            <div className="card mt-4">
              <div className="card-body">
                <h5>{selectedCourse.name}</h5>
                <p>{selectedCourse.description}</p>
                <p>Giá: {selectedCourse.price.toLocaleString()}đ</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleBuyCourse(selectedCourse)}
                  disabled={purchasedCourses[selectedCourse.id]}
                >
                  {purchasedCourses[selectedCourse.id]
                    ? "Đã mua"
                    : "Mua khoá học"}
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Sidebar bên phải - Danh sách khoá học đã mua */}
        <div className="col-lg-4">
          {/* Bộ lọc và tìm kiếm trên giỏ hàng */}
          <div className="mb-3 d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm trong giỏ hàng..."
              value={cartSearchTerm}
              onChange={(e) => setCartSearchTerm(e.target.value)}
              style={{ maxWidth: 250 }}
            />
            <select
              className="form-select"
              value={cartFilterType}
              onChange={(e) => setCartFilterType(e.target.value)}
              style={{ maxWidth: 180 }}
            >
              {courseTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="card">
            <div className="card-header">Giỏ hàng</div>
            <div className="card-body">
              {filteredCartCourses.length === 0 ? (
                <div className="text-muted">
                  Chưa có khoá học nào trong giỏ hàng.
                </div>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {filteredCartCourses.map((course) => (
                      <li
                        key={course.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>{course.name}</span>
                        <span>{course.price.toLocaleString()}đ</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-3 fw-bold">
                    Tổng:{" "}
                    {filteredCartCourses
                      .reduce((sum, c) => sum + c.price, 0)
                      .toLocaleString()}
                    đ
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleCheckoutCart}
                  >
                    Thanh toán tất cả
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-header">Khoá học đã mua</div>
            <div className="card-body">
              {Object.keys(purchasedCourses).length === 0 ? (
                <div className="text-muted">Bạn chưa mua khoá học nào.</div>
              ) : (
                <ul className="list-group">
                  {courses
                    .filter((c) => purchasedCourses[c.id])
                    .map((course) => (
                      <li key={course.id} className="list-group-item">
                        {course.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Payment Modal */}
      <PaymentModal
        show={showPaymentModal}
        onHide={() => {
          setShowPaymentModal(false);
          setIsCartPayment(false);
          setPaymentCourse(null);
        }}
        course={isCartPayment ? null : paymentCourse}
        cartCourses={isCartPayment ? cartCourses : null}
        onCompletePayment={handleCompletePayment}
      />
    </div>
  );
};

export default Dashboard;
