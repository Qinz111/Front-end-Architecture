import React from "react";
import "./BillSection.scss";

const BillSection = ({
  selectedTable,
  tableBill,
  onUpdateQuantity,
  onPayment,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const calculateSubtotal = () => {
    return tableBill.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateVAT = () => {
    return Math.round(calculateSubtotal() * 0.1);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (!selectedTable) return;
    onUpdateQuantity(selectedTable.id, itemId, newQuantity);
  };

  const handlePayment = () => {
    if (!selectedTable || tableBill.length === 0) return;
    onPayment(selectedTable.id);
  };

  return (
    <div className="bill-section">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">
            {selectedTable ? `Hóa đơn bàn ${selectedTable.id}` : "Hóa đơn"}
          </h5>
        </div>
        <div className="card-body">
          {!selectedTable ? (
            <div className="text-center text-muted py-4">
              <i className="fas fa-receipt fa-3x mb-3"></i>
              <p>Chưa chọn bàn</p>
              <small>Vui lòng chọn bàn để xem hóa đơn</small>
            </div>
          ) : tableBill.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="fas fa-utensils fa-3x mb-3"></i>
              <p>Bàn {selectedTable.id} chưa có món nào</p>
              <small>Hãy thêm món từ menu bên trái</small>
            </div>
          ) : (
            <>
              {/* Bill items */}
              <div className="bill-items">
                {tableBill.map((item) => (
                  <div key={item.id} className="bill-item">
                    <div className="bill-item-info">
                      <h6 className="bill-item-name mb-1">{item.name}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="bill-item-price mb-0">
                          {formatPrice(item.price)}
                        </p>
                        <small className="text-muted">x{item.quantity}</small>
                      </div>
                    </div>
                    <div className="bill-item-controls">
                      <button
                        className="btn btn-sm btn-outline-secondary quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-primary quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total calculation */}
              <div className="bill-totals">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tạm tính:</span>
                  <span className="fw-medium">
                    {formatPrice(calculateSubtotal())}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Thuế VAT (10%):</span>
                  <span className="fw-medium">
                    {formatPrice(calculateVAT())}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="bill-actions mt-3">
                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={handlePayment}
                  disabled={tableBill.length === 0}
                >
                  <i className="fas fa-credit-card me-2"></i>
                  Thanh toán
                </button>
                <button className="btn btn-outline-secondary w-100">
                  <i className="fas fa-print me-2"></i>
                  In hóa đơn
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillSection;
