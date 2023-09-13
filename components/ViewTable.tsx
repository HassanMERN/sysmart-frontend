import React, { useEffect } from "react";
import Link from "next/link";
import { Tabs, Tab, IconButton } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

interface Column {
  name: string;
  field: string;
}

interface DataItem {
  [key: string]: any;
}

interface ViewTableProps {
  data: DataItem[];
  columns: Column[];
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
  useEffect(() => {
    console.log(localStorage);
  }, []);

  return (
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
        {data.map((item, index) => (
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
  );
};

export default ViewTable;
