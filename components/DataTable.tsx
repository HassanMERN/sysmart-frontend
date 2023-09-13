import React from "react";
import Link from "next/link";
import { Tabs, Tab, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteData } from "@helpers/deleteData";

interface Column {
  name: string;
  field: string;
}

interface DataItem {
  [key: string]: any;
}

interface DataTableProps {
  data: DataItem[];
  columns: Column[];
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
  const handleDelete = (id: any) => {
    deleteEndPoint ? deleteData(deleteEndPoint, id) : {};
    window.location.reload();
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.field}>{column.name}</th>
          ))}
          <th>Actions</th>{" "}
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
  );
};

export default DataTable;
