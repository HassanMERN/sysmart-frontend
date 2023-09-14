import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Tabs, Tab, IconButton } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

interface ViewTableProps {
  data: any[];
  columns: any[];
  buy?: (id: any) => void;
  addToCart?: (id: any) => void;
  poEndPoint?: string;
}

const ViewTable: React.FC<ViewTableProps> = ({
  data,
  columns,
  buy,
  addToCart,
  poEndPoint,
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.name}</th>
            ))}
            {poEndPoint ? <th>Actions</th> : <></>}
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
    </div>
  );
};

export default ViewTable;
