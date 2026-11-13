
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

// Form data type
type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
  terms: boolean;
};

// Validation errors type
type RegistrationErrors = Partial<
  Record<keyof RegistrationFormData, string>
>;

function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    email: "",
    password: "",
    role: "",
    terms: false,
  });

  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [success, setSuccess] = useState<string>("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = event.target;

    const fieldName = name as keyof RegistrationFormData;

    const fieldValue =
      event.target instanceof HTMLInputElement && type === "checkbox"
        ? event.target.checked
        : value;

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: fieldValue,
    } as RegistrationFormData));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: "",
    }));

    setSuccess("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newErrors: RegistrationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Please enter a password.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role.";
    }

    if (!formData.terms) {
      newErrors.terms = "Please accept the terms and conditions.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log("Registration Data:", formData);

    setSuccess("Registration submitted successfully!");

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      terms: false,
    });
  }

  return (
    <section
      className={`mb-[25px] rounded-[14px] p-[26px] shadow-[0_4px_18px_rgba(15,23,42,0.05)] ${
        document.documentElement.classList.contains("dark")
          ? "bg-[#1e293b] text-[#f1f5f9]"
          : "bg-white text-[#172b4d]"
      }`}
    >
      <h2 className="text-[21px] mb-[8px]">
        Registration Form
      </h2>

      <p className={`text-[14px] mb-[22px] leading-[1.5] ${
        document.documentElement.classList.contains("dark")
          ? "text-[#cbd5e1]"
          : "text-[#64748b]"
      }`}>
        Practise controlled inputs and form validation.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[17px]">

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="name" className="text-[13px] font-semibold">
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-[#cbd5e1] rounded-[7px] px-3 py-[11px] outline-none bg-white text-[#172b4d] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:bg-[#334155] dark:text-white dark:border-[#64748b] dark:placeholder:text-[#cbd5e1]"
          />

          {errors.name && (
            <p className="text-[#dc2626] text-[12px] mt-[6px]">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="email" className="text-[13px] font-semibold">
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-[#cbd5e1] rounded-[7px] px-3 py-[11px] outline-none bg-white text-[#172b4d] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:bg-[#334155] dark:text-white dark:border-[#64748b] dark:placeholder:text-[#cbd5e1]"
          />

          {errors.email && (
            <p className="text-[#dc2626] text-[12px] mt-[6px]">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="password" className="text-[13px] font-semibold">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-[#cbd5e1] rounded-[7px] px-3 py-[11px] outline-none bg-white text-[#172b4d] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:bg-[#334155] dark:text-white dark:border-[#64748b] dark:placeholder:text-[#cbd5e1]"
          />

          {errors.password && (
            <p className="text-[#dc2626] text-[12px] mt-[6px]">
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label htmlFor="role" className="text-[13px] font-semibold">
            Select Your Role
          </label>

          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-[#cbd5e1] rounded-[7px] px-3 py-[11px] outline-none bg-white text-[#172b4d] focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:bg-[#334155] dark:text-white dark:border-[#64748b]"
          >
            <option value="">Choose your role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="student">Student</option>
          </select>

          {errors.role && (
            <p className="text-[#dc2626] text-[12px] mt-[6px]">
              {errors.role}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-[7px]">
          <label className="flex items-center gap-[9px] text-[13px] cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="!w-4 !h-4 !p-0 shrink-0 accent-[#2563eb]"
            />

            I accept the terms and conditions.
          </label>

          {errors.terms && (
            <p className="text-[#dc2626] text-[12px] mt-[6px]">
              {errors.terms}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="border-0 rounded-[7px] px-[18px] py-[11px] bg-[#2563eb] text-white font-semibold whitespace-nowrap hover:bg-[#1d4ed8]"
        >
          Register
        </button>

        {success && (
          <p className="text-[#15803d] text-[13px] mt-[10px]">
            {success}
          </p>
        )}
      </form>
    </section>
  );
}

export default RegistrationForm;
