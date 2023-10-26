import { useEffect, useState } from "react";
import fetchPeople from "@/lib/people";
import Link from "next/link";

const PeopleList = () => {
  const [peopleListData, setPeopleListData] = useState([]);

  useEffect(() => {
    fetchPeople("all")
      .then((data) => {
        setPeopleListData(data);
        console.log("Fetched people list from API");
      })
      .catch((error) => {
        console.error("Error fetching people data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  const calcClassStatusBadge = (status) => {
    switch (status){
      case 'Living':
        return 'bg-success';
      case 'Reposed':
        return 'bg-indigo';
      default:
        return 'bg-secondary';
    }
  }
  
  return(
    <table id="peopleList" className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Status</th>
          <th>First/Last Name</th>
          <th>Display Name</th>
          <th>Mobile Phone</th>
          <th>Executor</th>
        </tr>
      </thead>
      <tbody>
        {peopleListData?.map((person, index) => (
          <tr key={index}>
            <td><span className={`badge ${calcClassStatusBadge(person.status)} me-2`} id="btn-status">{person.status}</span></td>
            <td><Link href={`/admin/people/${person.id}`}>{`${person.givenName} ${person.familyName}`}</Link></td>
            <td><Link href={`/admin/people/${person.id}`}>{person.displayName}</Link></td>
            <td>{person.mobilePhone}</td>
            <td><Link href={`/admin/people/${person.executorId}`}>{person.executor && person.executor.displayName}</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
  
}

export default PeopleList