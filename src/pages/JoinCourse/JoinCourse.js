import React from "react";

// Dữ liệu mẫu các khoá học đã mua
const purchasedCourses = [
  {
    id: "C01",
    name: "React Cơ Bản",
    description: "Khoá học nhập môn React cho người mới bắt đầu.",
    price: 500000,
    type: "frontend",
    image: "https://reactjs.org/logo-og.png",
  },
  {
    id: "C02",
    name: "NodeJS Nâng Cao",
    description: "Xây dựng backend với NodeJS chuyên sâu.",
    price: 700000,
    type: "backend",
    image: "https://nodejs.org/static/images/logo.svg",
  },
  {
    id: "C03",
    name: "UI/UX Design",
    description: "Thiết kế giao diện người dùng chuyên nghiệp.",
    price: 400000,
    type: "design",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
  },
];

const JoinCourse = () => {
  const handleCourseClick = (courseId) => {
    // Chuyển hướng sang trang chi tiết khoá học (demo)
    window.location.href = `/course/${courseId}`;
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Khoá học đã mua</h3>
      {purchasedCourses.length === 0 ? (
        <div className="text-muted">Bạn chưa mua khoá học nào.</div>
      ) : (
        <div className="row">
          {purchasedCourses.map((course) => (
            <div className="col-md-4 mb-4" key={course.id}>
              <div
                className="card h-100 shadow-sm hover-shadow"
                style={{ cursor: "pointer" }}
                onClick={() => handleCourseClick(course.id)}
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="card-img-top"
                  style={{
                    height: 160,
                    objectFit: "contain",
                    background: "#f8f9fa",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text text-truncate">
                    {course.description}
                  </p>
                  <span className="badge bg-primary me-2">{course.type}</span>
                  <span className="fw-bold float-end">
                    {course.price.toLocaleString()}đ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinCourse;
