import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_LIST } from "./Queries";
// import { LISTEMAIL } from "./Queries";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

const DataShow = () => {
  const columnDefs = [
    { headerName: "UserName", field: "UserName" },
    { headerName: "Email", field: "Email" },
    { headerName: "Role", field: "Role" },
  ];

  // debugger;
  const { error, data, loading } = useQuery(GET_USER_LIST, {
    // const { error, data, loading } = useQuery(LISTEMAIL, {
    onError: () => {
      console.log("error");
    },

    onCompleted: (data) => {},
    fetchPolicy: "no-cache",
  });

  console.log({ data, error });
  console.log(data);
  console.log(error);

  if (loading) return "Loading...";

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: true,
  };

  const onGridReady = (params) => {
    console.log(data);
    params.api.applyTransaction({ add: data.User });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-md-6 col-10 mx-auto">
            <div
              className="ag-theme-alpine mx-auto"
              style={{ height: 350, width: 800 }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                // rowData={rowData}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                pagination={true}
                paginationPageSize={5}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>

      {/* 
      <div className="container mt-2">
        <table className="table table-striped">
          <tbody>
            <tr className="fs-5 table-dark">
              <td>User Name</td>
              <td>User Email Id</td>
              <td>User --</td>
              <td>User Role</td>
            </tr> */}
      {/* {data.FindByRole.map((launch, i) => (
              <tr key={i}>
                <td>{launch.UserName}</td>
                <td>{launch.Email}</td>

                <td>{launch.Role}</td>
              </tr>
            ))}
 */}
      {/* {data.User.map((launch) => (
              <tr key={launch.id}>
                <td>{launch.UserName}</td>
                <td>{launch.Email}</td>
                <td>{launch.Password}</td>

                <td>{launch.Role}</td>
              </tr>
            ))}
          </tbody> */}
      {/* </table>
      </div> */}
    </>
  );
};
export default DataShow;
