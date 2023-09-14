"use client";
import React, { useState, useEffect } from "react";
import EditProfileForm from "@forms/edit-profile/EditProfile";
import PrivateRoute from "@components/PrivateRoute";
import { useRouter } from "next/router";

function EditProfile() {
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const user: any = localStorage.getItem("user");

    if (user) {
      const parsedUser: any = JSON.parse(user);
      setUserData(parsedUser);
    }
    console.log(userData);
  }, []);


  return (
    <PrivateRoute>
      {userData ? (
        <EditProfileForm initialValues={userData} />
      ) : (
        <div>Loading Profile</div>
      )}
    </PrivateRoute>
  );
}

export default EditProfile;
