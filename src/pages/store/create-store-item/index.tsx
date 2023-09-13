"use client";
import StoreItemForm from "@forms/create-store-item/create-store-item";
import PrivateRoute from "@components/PrivateRoute";

function Register() {
  return (
    <PrivateRoute>
      <StoreItemForm />
    </PrivateRoute>
  );
}

export default Register;
