import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, Tab, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteData } from "@helpers/deleteData";

interface DataTableProps {
  data: any[];
  columns: any[];
  onUpdate?: (id: any) => void;
  updateEndPoint?: string;
  deleteEndPoint?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  updateEndPoint,
  deleteEndPoint,
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

  const handleDelete = (id: any) => {
    deleteEndPoint ? deleteData(deleteEndPoint, id) : {};
    window.location.reload();
  };

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
            <th>Actions</th>
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
                  <Tab
                    icon={
                      <IconButton onClick={() => handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  />

                  <Link href={`/${updateEndPoint}?id=${item.id}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
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

export default DataTable;
