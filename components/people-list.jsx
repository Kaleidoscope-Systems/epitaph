import { useEffect, useState } from "react";
import fetchPeople from "@/lib/people";
import Link from "next/link";

const PeopleList = () => {
  const [peopleListData, setPeopleListData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([
    "status",
    "name",
    "displayName",
    "mobilePhone",
    "executor",
  ]);

  useEffect(() => {
    fetchPeople("all")
      .then((data) => {
        setPeopleListData(data);
        console.log("Fetched people list from API");
      })
      .catch((error) => {
        console.error("Error fetching people data:", error);
      });
  }, []);

  const calcClassStatusBadge = (status) => {
    switch (status) {
      case "Living":
        return "bg-success";
      case "Reposed":
        return "bg-indigo";
      default:
        return "bg-secondary";
    }
  };

  const handleColumnToggle = (column) => {
    setSelectedColumns((prevColumns) => {
      if (prevColumns.includes(column)) {
        return prevColumns.filter((col) => col !== column);
      } else {
        return [...prevColumns, column];
      }
    });
  };

  const columnLabels = {
    status: "Status",
    name: "First/Last Name",
    displayName: "Display Name",
    mobilePhone: "Mobile Phone",
    executor: "Executor",
  };

  return (
    <div>
      <div>
        <button className="btn btn-primary mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Customize View</button>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <h2 className="offcanvas-title" id="offcanvasRightLabel">Customize View</h2>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div>Show Columns:</div>
            <div>
              <ul className="list-unstyled">
                {Object.entries(columnLabels).map(([column, label]) => (
                  <li className="px-2" key={column}>
                    <input
                      className="form-check-input me-1"
                      id={`displayColumn-${column}`}
                      type="checkbox"
                      checked={selectedColumns.includes(column)}
                      onChange={() => handleColumnToggle(column)}
                    />
                    <label htmlFor={`displayColumn-${column}`}>{label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <table id="peopleList" className="table table-striped table-hover">
          <thead>
            <tr>
              {selectedColumns.includes("status") && <th>Status</th>}
              {selectedColumns.includes("name") && <th>First/Last Name</th>}
              {selectedColumns.includes("displayName") && <th>Display Name</th>}
              {selectedColumns.includes("mobilePhone") && <th>Mobile Phone</th>}
              {selectedColumns.includes("executor") && <th>Executor</th>}
            </tr>
          </thead>
          <tbody>
            {peopleListData?.map((person, index) => (
              <tr key={index}>
                {selectedColumns.includes("status") && (
                  <td>
                    <span
                      className={`badge ${calcClassStatusBadge(person.status)} me-2`}
                      id="btn-status"
                    >
                      {person.status}
                    </span>
                  </td>
                )}
                {selectedColumns.includes("name") && (
                  <td>
                    <Link href={`/admin/people/${person.id}`}>
                      {`${person.givenName} ${person.familyName}`}
                    </Link>
                  </td>
                )}
                {selectedColumns.includes("displayName") && (
                  <td>
                    <Link href={`/admin/people/${person.id}`}>
                      {person.displayName}
                    </Link>
                  </td>
                )}
                {selectedColumns.includes("mobilePhone") && (
                  <td>{person.mobilePhone}</td>
                )}
                {selectedColumns.includes("executor") && (
                  <td>
                    {person.executor && (<Link href={`/admin/people/${person.executorId}`}>
                      {person.executor && person.executor.displayName}
                    </Link>)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeopleList;