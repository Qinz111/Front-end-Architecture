import React, { useState } from "react";
import "./TableList.scss";

const TableList = ({ selectedTable, onTableSelect, tableBills }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Tất cả khu vực");

  const tables = [
    {
      id: "01",
      name: "Bàn 01",
      capacity: 4,
      area: "Tầng 1",
      status: "available",
    },
    {
      id: "02",
      name: "Bàn 02",
      capacity: 6,
      area: "Tầng 1",
      status: "occupied",
    },
    {
      id: "03",
      name: "Bàn 03",
      capacity: 2,
      area: "Tầng 2",
      status: "reserved",
    },
    {
      id: "04",
      name: "Bàn 04",
      capacity: 8,
      area: "Khu VIP",
      status: "available",
    },
    {
      id: "05",
      name: "Bàn 05",
      capacity: 4,
      area: "Tầng 1",
      status: "occupied",
    },
    {
      id: "06",
      name: "Bàn 06",
      capacity: 6,
      area: "Tầng 2",
      status: "available",
    },
    {
      id: "07",
      name: "Bàn 07",
      capacity: 10,
      area: "Khu VIP",
      status: "reserved",
    },
    {
      id: "08",
      name: "Bàn 08",
      capacity: 4,
      area: "Tầng 1",
      status: "available",
    },
  ];

  const areas = ["Tất cả khu vực", "Tầng 1", "Tầng 2", "Khu VIP"];

  const getStatusClass = (status) => {
    switch (status) {
      case "available":
        return "table-available";
      case "occupied":
        return "table-occupied";
      case "reserved":
        return "table-reserved";
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Trống";
      case "occupied":
        return "Đang dùng";
      case "reserved":
        return "Đã đặt trước";
      default:
        return "Không xác định";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "available":
        return "bg-success";
      case "occupied":
        return "bg-danger";
      case "reserved":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  const getBillInfo = (tableId) => {
    const bill = tableBills[tableId] || [];
    if (bill.length === 0) return null;

    const totalItems = bill.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = bill.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return { totalItems, totalAmount };
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesArea =
      selectedArea === "Tất cả khu vực" || table.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="table-list">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Danh sách bàn</h5>
            <div className="d-flex gap-2">
              <select
                className="form-select form-select-sm"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                style={{ width: "auto" }}
              >
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Tìm bàn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "200px" }}
                />
                <i className="fas fa-search position-absolute top-50 end-0 translate-middle-y me-2 text-muted"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {filteredTables.map((table) => {
              const billInfo = getBillInfo(table.id);
              return (
                <div key={table.id} className="col-6 col-md-4 col-lg-3">
                  <div
                    className={`table-card ${getStatusClass(table.status)} ${
                      selectedTable?.id === table.id ? "selected" : ""
                    }`}
                    onClick={() => onTableSelect(table)}
                  >
                    <div className="table-icon">
                      <i className="fas fa-utensils"></i>
                    </div>
                    <div className="table-info">
                      <h6 className="table-name mb-1">{table.name}</h6>
                      <p className="table-details mb-2">
                        {table.capacity} chỗ • {table.area}
                      </p>
                      <span
                        className={`badge ${getStatusBadgeClass(table.status)}`}
                      >
                        {getStatusText(table.status)}
                      </span>

                      {/* Bill info */}
                      {billInfo && (
                        <div className="bill-info mt-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              <i className="fas fa-receipt me-1"></i>
                              {billInfo.totalItems} món
                            </small>
                            <small className="fw-bold text-primary">
                              {formatPrice(billInfo.totalAmount)}
                            </small>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableList;
