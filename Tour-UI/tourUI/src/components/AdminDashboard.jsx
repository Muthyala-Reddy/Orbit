import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function AdminDashboard() {

  const role = localStorage.getItem("role");
  if (role !== "ADMIN") return <Navigate to="/signin" />;
 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  // Dropdown filters
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
 
  // Level-3 extras
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");     
  const [sortBy, setSortBy] = useState("LATEST");
 
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
 
  
  const loadAllBookings = () => {
    setLoading(true);
    setError("");
 
    axios
      .get("http://localhost:8085/api/bookings/admin/all", {
        headers,
        withCredentials: true,
      })
      .then((res) => setBookings(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error(err);
        setError("Unable to load bookings. Check /api/bookings/admin/all API.");
        setBookings([]);
      })
      .finally(() => setLoading(false));
  };
 
  useEffect(() => {
    loadAllBookings();
  }, []);
 
  const userOptions = useMemo(() => {
    const set = new Set(bookings.map((b) => String(b.userId)));
    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, [bookings]);
 
  const packageOptions = useMemo(() => {
    const set = new Set(
      bookings.map((b) =>
        b.packageName ||
        b.tourName ||
        (b.tourId != null ? `Tour-${b.tourId}` : "Unknown")
      )
    );
    return Array.from(set);
  }, [bookings]);
 
  
  const statusCounts = useMemo(() => {
    const counts = { CONFIRMED: 0, CANCELLED: 0, CREATED: 0, OTHER: 0 };
    bookings.forEach((b) => {
      const s = (b.status || "CREATED").toUpperCase();
      if (s === "CONFIRMED") counts.CONFIRMED += 1;
      else if (s === "CANCELLED") counts.CANCELLED += 1;
      else if (s === "CREATED") counts.CREATED += 1;
      else counts.OTHER += 1;
    }); 

    return counts;
  }, [bookings]);
 
  const filteredBookings = useMemo(() => {
    const text = searchText.trim().toLowerCase();
 
    const from = fromDate ? new Date(fromDate + "T00:00:00") : null;
    const to = toDate ? new Date(toDate + "T23:59:59") : null;
 
    return bookings.filter((b) => {
      // dropdown: user
      const userMatch = selectedUserId
        ? String(b.userId) === String(selectedUserId)
        : true;
 
      // dropdown: package
      const pkgLabel =
        b.packageName ||
        b.tourName ||
        (b.tourId != null ? `Tour-${b.tourId}` : "Unknown");
 
      const pkgMatch = selectedPackage ? pkgLabel === selectedPackage : true;
 
      // date range: bookingDate
      const bd = b.bookingDate ? new Date(b.bookingDate) : null;
      const dateMatch =
        (!from || (bd && bd >= from)) && (!to || (bd && bd <= to));
 
      // search text
      const searchMatch = !text
        ? true
        : (
            String(b.id).toLowerCase().includes(text) ||
            String(b.userId).toLowerCase().includes(text) ||
            String(b.tourId).toLowerCase().includes(text) ||
            String(b.status || "").toLowerCase().includes(text) ||
            String(pkgLabel).toLowerCase().includes(text)
          );
 
      return userMatch && pkgMatch && dateMatch && searchMatch;
    });
  }, [bookings, selectedUserId, selectedPackage, searchText, fromDate, toDate]);
 

  const finalBookings = useMemo(() => {
    const arr = [...filteredBookings];
    if (sortBy === "AMOUNT_DESC") {
      arr.sort((a, b) => (Number(b.totalAmount) || 0) - (Number(a.totalAmount) || 0));
    } else if (sortBy === "AMOUNT_ASC") {
      arr.sort((a, b) => (Number(a.totalAmount) || 0) - (Number(b.totalAmount) || 0));
    } else {
      // LATEST
      arr.sort((a, b) => new Date(b.bookingDate || 0) - new Date(a.bookingDate || 0));
    }
    return arr;
  }, [filteredBookings, sortBy]);
 
  
  const totalBookings = bookings.length;
  const totalUsers = userOptions.length;
  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => (b.status || "").toUpperCase() === "CONFIRMED")
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  }, [bookings]);
                                                                                                                                    

  const updateBookingStatus = (bookingId, status) => {
    setError("");
 
    axios
      .put(
        `http://localhost:8085/api/bookings/admin/${bookingId}/status?status=${status}`,
        null,
        { headers, withCredentials: true }
      )
      .then(() => {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
        );
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update booking status.");
      });
  };
 
  
  const exportCSV = () => {
    if (!finalBookings.length) return;
 
    const headersRow = [
      "BookingId",
      "UserId",
      "TourId",
      "Package",
      "People",
      "Amount",
      "Status",
      "BookingDate",
    ];
 
    const rows = finalBookings.map((b) => {
      const pkg =
        b.packageName ||
        b.tourName ||
        (b.tourId != null ? `Tour-${b.tourId}` : "Unknown");
 
      const safe = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
 
      return [
        safe(b.id),
        safe(b.userId),
        safe(b.tourId),
        safe(pkg),
        safe(b.numberOfPeople),
        safe(b.totalAmount),
        safe(b.status),
        safe(b.bookingDate),
      ].join(",");
    });
 
    const csvString = [headersRow.join(","), ...rows].join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
 
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-bookings-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
 
  return (
    <div className="container-fluid px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-1">Admin Dashboard</h2>
          
        </div>
 
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={loadAllBookings}>
            Refresh
          </button>
          <button className="btn btn-dark" onClick={exportCSV}>
            Export CSV
          </button>
        </div>
      </div>
 
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading bookings…</div>}
 
      {/* KPI Cards */}
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body text-center">
              <h6 className="mb-1">Total Bookings</h6>
              <h2 className="fw-bold">{totalBookings}</h2>
            </div>
          </div>
        </div>
 
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-success text-white">
            <div className="card-body text-center">
              <h6 className="mb-1">Total Users</h6>
              <h2 className="fw-bold">{totalUsers}</h2>
            </div>
          </div>
        </div>
 
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-warning">
            <div className="card-body text-center">
              <h6 className="mb-1">Total Revenue (Confirmed)</h6>
              <h2 className="fw-bold">₹{totalRevenue}</h2>
            </div>
          </div>
        </div>
      </div>
 
      {/* Status quick counts */}
      <div className="mb-4">
        <span className="badge bg-success me-2">CONFIRMED: {statusCounts.CONFIRMED}</span>
        <span className="badge bg-danger me-2">CANCELLED: {statusCounts.CANCELLED}</span>
        <span className="badge bg-secondary me-2">CREATED: {statusCounts.CREATED}</span>
        <span className="badge bg-dark">OTHER: {statusCounts.OTHER}</span>
      </div>
 
      {/* Filters + Search + Date + Sort */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Filters</h5>
 
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Package</label>
              <select
                className="form-select"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
              >
                <option value="">All Packages</option>
                {packageOptions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
 
            <div className="col-md-3">
              <label className="form-label">User ID</label>
              <select
                className="form-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">All Users</option>
                {userOptions.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
 
            <div className="col-md-2">
              <label className="form-label">From</label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
 
            <div className="col-md-2">
              <label className="form-label">To</label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
 
            <div className="col-md-2">
              <label className="form-label">Sort</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="LATEST">Latest</option>
                <option value="AMOUNT_DESC">Amount High → Low</option>
                <option value="AMOUNT_ASC">Amount Low → High</option>
              </select>
            </div>
          </div>
 
          <div className="row g-3 mt-2">
            <div className="col-md-8">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search bookingId, userId, status, tour/package..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
 
            <div className="col-md-4 d-grid align-self-end">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedPackage("");
                  setSelectedUserId("");
                  setSearchText("");
                  setFromDate("");
                  setToDate("");
                  setSortBy("LATEST");
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
 
      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">
            Booking Details ({finalBookings.length})
          </h5>
 
          {finalBookings.length === 0 && !loading ? (
            <p className="text-muted">No bookings found for selected filters.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Package</th>
                    <th>Tour ID</th>
                    <th>People</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th style={{ width: 210 }}>Actions</th>
                  </tr>
                </thead>
 
                <tbody>
                  {finalBookings.map((b) => {
                    const pkg =
                      b.packageName ||
                      b.tourName ||
                      (b.tourId != null ? `Tour-${b.tourId}` : "Unknown");
 
                    const status = (b.status || "CREATED").toUpperCase();
 
                    return (
                      <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.userId}</td>
                        <td>{pkg}</td>
                        <td>{b.tourId ?? "-"}</td>
                        <td>{b.numberOfPeople ?? 0}</td>
                        <td>₹{b.totalAmount ?? 0}</td>
                        <td>
                          <span
                            className={`badge ${
                              status === "CONFIRMED"
                                ? "bg-success"
                                : status === "CANCELLED"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                        <td>
                          {b.bookingDate
                            ? new Date(b.bookingDate).toLocaleString()
                            : "-"}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success me-2"
                            disabled={status === "CONFIRMED"}
                            onClick={() => updateBookingStatus(b.id, "CONFIRMED")}
                          >
                            Confirm
                          </button>
 
                          <button
                            className="btn btn-sm btn-warning"
                            disabled={status === "CANCELLED"}
                            onClick={() => updateBookingStatus(b.id, "CANCELLED")}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
 
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}