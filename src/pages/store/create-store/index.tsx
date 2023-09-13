"use client";
import StoreForm from "@forms/create-store/create-store";
import PrivateRoute from "@components/PrivateRoute";

function Register() {
  return (
    <PrivateRoute>
      <StoreForm />
    </PrivateRoute>
  );
}

export default Register;
