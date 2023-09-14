"use client";
import React, { useState, useEffect } from "react";
import AddToCartForm from "@forms/cart/atc-form";
import PrivateRoute from "@components/PrivateRoute";
import { useRouter } from "next/router";
import { fetchData } from "@helpers/fetchData";

function AddToCart() {
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
    item_name: storeItemData?.title,
  };
  return (
    <PrivateRoute>
      <h1>Add To Cart</h1>
      {storeItemData ? (
        <AddToCartForm initialValues={values} />
      ) : (
        <h3>Loading Add to Cart Form</h3>
      )}
    </PrivateRoute>
  );
}

export default AddToCart;
