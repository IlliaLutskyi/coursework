import { useEffect, useState } from "react";
const custom_errors = {
  nameError: "",
  passworddError: "",
  emailError: "",
  generalError: "",
};
export function useFormErrors(formData: {
  name: string;
  email: string;
  password: string;
}) {
  const [errors, setErrors] = useState(custom_errors);
  useEffect(() => {
    setErrors(custom_errors);
    if (!formData.email) {
      setErrors((prev) => {
        return { ...prev, emailError: "Email is required" };
      });
    }
    if (!formData.name) {
      setErrors((prev) => {
        return { ...prev, emailError: "Name is required" };
      });
    }
    if (!formData.password) {
      setErrors((prev) => {
        return { ...prev, emailError: "Password is required" };
      });
    }
    if (formData.password.length <= 6) {
      setErrors((prev) => {
        return { ...prev, passworddError: "Password cant be less the 6 chars" };
      });
      return;
    }
  }, [formData]);
  return errors;
}
