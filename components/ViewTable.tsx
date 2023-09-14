import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs, Tab, IconButton } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteData } from "@helpers/deleteData";
import { putData } from "@helpers/putData";
import { postData } from "@helpers/postData";
import ButtonLink from "./ButtonLink";

interface ViewTableProps {
  data: any[];
  columns: any[];
  buy?: (id: any) => void;
  addToCart?: (id: any) => void;
  poEndPoint?: string;
  cartEndPoint?: string;
  deleteEndPoint?: string;
  buyItemEndPoint?: string;
  cart?: boolean;
}

const ViewTable: React.FC<ViewTableProps> = ({
  data,
  columns,
  buy,
  addToCart,
  poEndPoint,
  cartEndPoint,
  deleteEndPoint,
  buyItemEndPoint,
  cart,
}) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(localStorage);
  }, []);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id: any) => {
    deleteEndPoint ? deleteData(deleteEndPoint, id) : {};
    window.location.reload();
  };
  const handleBuy = (item: any) => {
    buyItemEndPoint ? postData(buyItemEndPoint + `/${item.id}`, item) : {};
    window.location.reload();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.name}</th>
            ))}
            {poEndPoint || cart ? <th>Actions</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.field}>{item[column.field]}</td>
              ))}
              <td>
                <Tabs>
                  {poEndPoint ? (
                    <>
                      <Link href={`/${poEndPoint}?id=${item.id}`}>
                        <IconButton>
                          <ShoppingBasketIcon />
                        </IconButton>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}

                  {cartEndPoint ? (
                    <>
                      <Link href={`/${cartEndPoint}?id=${item.id}`}>
                        <IconButton>
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Link>
                    </>
                  ) : (
                    <></>
                  )}
                  {cart ? (
                    <>
                      <Tab
                        icon={
                          <IconButton onClick={() => handleBuy(item)}>
                            <ShoppingBasketIcon />
                          </IconButton>
                        }
                      />

                      <Tab
                        icon={
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Tabs>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalItems <= itemsPerPage}
        >
          Next
        </button>
      </div>

      <ButtonLink text="Go to Dashboard" route="/" />
    </div>
  );
};

export default ViewTable;
