/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import GridContainer from "../src/components/Grid/GridContainer.js";
import { DataGrid } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { act } from "react-dom/test-utils";

const useAxios = (url, setData, setColumns) => {
  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      const result = await axios.get(url);
      if (mounted) {
        act(() => {
          setData(result.data.cars);
          setColumns(result.data.columns);
        });
      }
    };
    loadData();

    return () => {
      mounted = false;
    };
  }, [url]);
};

export default function CarAvailable({ url }) {


  const [carList, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  useAxios(url, setData, setColumns);

  if (!carList && !columns) {
    return <span data-testid="loading">Loading data...</span>;
  } else {
    return (
      <span data-testid="resolved">
        <div>
          <GridContainer>
            <Container maxWidth="lg">
              <div style={{ height: 600, marginTop: 80 }}>
                <DataGrid
                  rows={carList}
                  columns={columns}
                  pageSize={10}
                  id="idCar"
                  hideFooterPagination
                />
              </div>
            </Container>
          </GridContainer>
        </div>
      </span>
    );
  }
}
