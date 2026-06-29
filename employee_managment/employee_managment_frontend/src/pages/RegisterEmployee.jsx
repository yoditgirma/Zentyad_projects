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
        phone: "",
        password: "",
        confirm_password: "",
        role: "Employee"
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log(formData);

        // API call will go here later
    }

    return (
        <form onSubmit={handleSubmit}>

            <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />

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

            <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />

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

            <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={[
                    { value: "Employee", label: "Employee" },
                    { value: "Admin", label: "Admin" }
                ]}
            />

            <Button type="submit">
                Register Employee
            </Button>

        </form>
    );
}

export default RegisterEmployee;