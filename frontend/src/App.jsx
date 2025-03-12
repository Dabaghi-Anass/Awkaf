import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50") // Fetch 50 random users
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.results.map((user, index) => ({
            id: index + 1, // Assign a random ID
            username: user.login.username,
            first_name: user.name.first,
            last_name: user.name.last,
            email: user.email,
            company: user.location.city, // Using city as a fake company
          }))
        )
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Username", accessor: "username" },
      { Header: "First Name", accessor: "first_name" },
      { Header: "Last Name", accessor: "last_name" },
      { Header: "Email", accessor: "email" },
      { Header: "Company", accessor: "company" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <div className="App">
      <div className="containner">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
