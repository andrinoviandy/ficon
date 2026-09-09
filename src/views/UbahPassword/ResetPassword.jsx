import { swal } from "global/helper/swal";
import storeSchema from "global/store";
import React, { useState } from "react";

import {
    IoLockClosed,
    IoPerson,
    IoEye,
    IoEyeOff,
    IoShieldCheckmark,
} from "react-icons/io5";

export default function ResetPassword({ dataUser }) {
    const [formData, setFormData] = useState({
        identifier: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.newPassword === "" ||
            formData.confirmPassword === ""
        ) {
            swal.warning(
                "Password baru dan Konfirmasi Password wajib terisi."
            );
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            swal.warning(
                "Password baru dan Konfirmasi Password harus sama."
            );
            return;
        }

        try {
            setLoading(true);

            swal.loading();

            const res = await storeSchema.actions.updatePassword({
                identifier: dataUser.username,
                password: formData.newPassword,
            });

            if (res?.status) {
                setFormData({
                    identifier: "",
                    newPassword: "",
                    confirmPassword: "",
                });

                swal.success("Password Berhasil Diubah !");
            } else {
                swal.error("Password Gagal Diubah !");
            }
        } catch (error) {
            swal.error("Terjadi kesalahan saat menghubungi server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-blue-900/10 flex items-center justify-center">
                    <IoShieldCheckmark className="text-3xl text-blue-900" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Perubahan Password
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        Ubah Password Kamu Secara Berkala
                    </p>
                </div>

            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* NIPP */}
                <div>

                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Username
                    </label>

                    <div className="relative">

                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <IoPerson className="text-xl" />
                        </div>

                        <input
                            type="text"
                            name="identifier"
                            value={dataUser?.username}
                            disabled={true}
                            className="
                                w-full
                                pl-12
                                pr-4
                                py-4
                                rounded-2xl
                                border
                                border-gray-200
                                bg-gray-100
                                text-gray-500
                                outline-none
                            "
                        />

                    </div>

                </div>

                {/* PASSWORD */}
                <div>

                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Password Baru
                    </label>

                    <div className="relative">

                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <IoLockClosed className="text-xl" />
                        </div>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                            className="
                w-full
                pl-12
                pr-14
                py-4
                rounded-2xl
                border
                border-gray-200
                focus:border-blue-900
                focus:ring-4
                focus:ring-blue-900/10
                outline-none
                transition-all
                duration-300
              "
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? (
                                <IoEyeOff className="text-xl" />
                            ) : (
                                <IoEye className="text-xl" />
                            )}
                        </button>

                    </div>

                </div>

                {/* CONFIRM PASSWORD */}
                <div>

                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Konfirmasi Password Baru
                    </label>

                    <div className="relative">

                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <IoLockClosed className="text-xl" />
                        </div>

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                            className="
                w-full
                pl-12
                pr-14
                py-4
                rounded-2xl
                border
                border-gray-200
                focus:border-blue-900
                focus:ring-4
                focus:ring-blue-900/10
                outline-none
                transition-all
                duration-300
              "
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? (
                                <IoEyeOff className="text-xl" />
                            ) : (
                                <IoEye className="text-xl" />
                            )}
                        </button>

                    </div>

                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
            w-full
            bg-blue-900
            hover:bg-blue-800
            text-white
            py-4
            rounded-2xl
            font-semibold
            shadow-lg
            hover:shadow-blue-900/30
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-3
            disabled:opacity-70
          "
                >

                    {loading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Updating Password...
                        </>
                    ) : (
                        <>
                            <IoShieldCheckmark className="text-xl" />
                            Simpan Perubahan
                        </>
                    )}

                </button>

            </form>
        </div>
    );
}