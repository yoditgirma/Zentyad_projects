import { useState } from "react";

import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";

function RegisterEmployee() {
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        employee_id: "",
        phone: "",
        password: "",
        confirm_password: "",
        role: "Employee",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(data.message);

                setFormData({
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: "",
                    employee_id: "",
                    phone: "",
                    password: "",
                    confirm_password: "",
                    role: "Employee",
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-12">

                    <h1 className="text-4xl font-bold mb-4">
                        Employee Management
                    </h1>

                    <p className="text-blue-100 leading-7 text-lg">
                        Register new employees and Management
                    </p>

                </div>

                {/* Right Side */}
                <div className="p-10">

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-slate-800">
                            Create Account
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Register a new employee into the system.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        <Input
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-4">

                            <Input
                                label="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <Input
                                label="Employee ID"
                                name="employee_id"
                                value={formData.employee_id}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-4">

                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <Select
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={[
                                {
                                    value: "Employee",
                                    label: "Employee",
                                },
                                {
                                    value: "Admin",
                                    label: "Admin",
                                },
                            ]}
                        />

                        <Button
                            type="submit"
                            
                        >
                            Register Employee
                        </Button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default RegisterEmployee;