import React from "react";
import "./PaymentModal.scss";

const PaymentModal = ({
  show,
  onHide,
  course,
  cartCourses,
  onCompletePayment,
}) => {
  if (!show) return null;

  // Nếu là thanh toán giỏ hàng
  if (cartCourses && cartCourses.length > 0) {
    const total = cartCourses.reduce((sum, c) => sum + c.price, 0);
    return (
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Xác nhận thanh toán giỏ hàng</h5>
              <button type="button" className="close" onClick={onHide}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Bạn có chắc chắn muốn thanh toán các khoá học sau?</p>
              <ul>
                {cartCourses.map((c) => (
                  <li key={c.id}>
                    {c.name} - {c.price.toLocaleString()}đ
                  </li>
                ))}
              </ul>
              <p className="fw-bold">Tổng: {total.toLocaleString()}đ</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onHide}
              >
                Huỷ
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onCompletePayment}
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Nếu là thanh toán 1 khoá học
  if (!course) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Thanh toán khoá học</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Bạn có chắc chắn muốn mua khoá học <b>{course.name}</b>?
            </p>
            <p>
              Giá: <b>{course.price.toLocaleString()}đ</b>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Huỷ
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCompletePayment}
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
