import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nama: "",
    nipp: "",
    email: "",
    password: "",
    role: "pm",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://pelindo-dev.id/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Registrasi berhasil!");
        setFormData({
          nama: "",
          nipp: "",
          email: "",
          password: "",
          role: "pm",
        });
      } else {
        setMessage(result.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      setMessage("Gagal mengirim data. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Form Registrasi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">NIPP</label>
          <input
            type="number"
            name="nipp"
            value={formData.nipp}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="pm">PM</option>
            <option value="am">AM</option>
            <option value="be">BE</option>
            <option value="delivery">Delivery</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
}
