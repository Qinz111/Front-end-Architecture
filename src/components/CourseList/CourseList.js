import React from "react";

const CourseList = ({
  courses,
  selectedCourse,
  onCourseSelect,
  purchasedCourses,
  onBuyCourse,
}) => {
  return (
    <div className="card">
      <div className="card-header">Danh sách khoá học</div>
      <div className="card-body">
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-6 mb-3" key={course.id}>
              <div
                className={`card ${
                  selectedCourse && selectedCourse.id === course.id
                    ? "border-primary"
                    : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => onCourseSelect(course)}
              >
                <div className="card-body">
                  <h5 className="card-title">{course.name}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">
                    Giá: {course.price.toLocaleString()}đ
                  </p>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBuyCourse(course);
                    }}
                    disabled={purchasedCourses[course.id]}
                  >
                    {purchasedCourses[course.id] ? "Đã mua" : "Mua khoá học"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
