"use client";
import React, { useState, useEffect } from "react";
import POForm from "@forms/create-purchase-order/po-form";
import PrivateRoute from "@components/PrivateRoute";
import { useRouter } from "next/router";
import { fetchData } from "@helpers/fetchData";

function CreatePo() {
  const router = useRouter();
  const { id } = router.query;

  const [storeItemData, setStoreItemData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchStoreItemData = async () => {
        try {
          const response: any = await fetchData(`api/store-items/find/${id}`);
          setStoreItemData(response.data);
        } catch (error) {
          console.error("Error fetching store item data:", error);
        }
      };

      fetchStoreItemData();
    }
  }, [id]);
  const values = {
    store_id: storeItemData?.storeId,
    id: storeItemData?.id,
    title: storeItemData?.title,
  };
  return (
    <PrivateRoute>
      <h1>Create Purchase Order</h1>
      {storeItemData ? (
        <POForm initialValues={values} />
      ) : (
        <h3>Loading Purchase Order Form</h3>
      )}
    </PrivateRoute>
  );
}

export default CreatePo;
