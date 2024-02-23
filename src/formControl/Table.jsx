// Table.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { gridClasses } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const CustomTable = ({ rows, columns, uniquekey }) => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle pagination change
  const handlePaginationChange = (page) => {
    // You can perform any actions here based on the selected page
    console.log(`Page changed to: ${page}`);
  };

  const handleChangePageSize = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to the first page when changing the page size
  };

  function CustomToolbar() {
    return (
      <>
        <Stack direction="row" justifyContent="flex-end">
          <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarExport />
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarFilterButton />
          </GridToolbarContainer>
        </Stack>
      </>
    );
  }

  const CustomFooter = () => {
    return (
      <Box p={2} textAlign="right" bgcolor="#f0f0f0">
        <Pagination
          count={Math.ceil(rows.length / 10)} // Adjust as per your requirements
          page={1} // Set the current page
          onChange={(event, value) => handlePaginationChange(value)}
        />
      </Box>
    );
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <div
      style={{
        paddingRight: "10px",
        paddingLeft: "10px",
        paddingBottom: "10px",
      }}
    >
      <DataGrid
        getRowId={(row) => row[uniquekey]} // Fix the syntax here
        rows={rows.slice(startIndex, endIndex)}
        columns={columns}
        rowCount={rows.length}
        rowHeight={40}
        autoHeight={true}
        className="bg-white"
        density="compact"
        pagination
        pageSize={pageSize}
        // hideFooterPagination={true}
        onPageSizeChange={handleChangePageSize}
        components={{
          Toolbar: CustomToolbar,
          // Footer: CustomFooter,
        }}
      />
    </div>
  );
};

CustomTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  uniquekey: PropTypes.string.isRequired, // Add the prop type for uniquekey
};

export default CustomTable;
