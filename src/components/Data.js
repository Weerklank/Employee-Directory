import React, {useState} from "react";
import Nav from "./Nav";
import API from "../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

function DataBody({ users }) {
    function getDate(date) {
        const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const dateArray = date.split("-");
        const year = dateArray[0];
        const month = dateArray[1];
        const trueMonth = month - 1
        const dayArray = dateArray[2].split("T");
        let day = dayArray[0];
        let ending = "th"
        if (day.charAt(0) === "0"){
            day = (day.split("").pop())
        }
        if (day === "1") {
            ending = "st"
        }
        else if (day === "2") {
            ending = "nd"
        }
        else if (day === "3") {
            ending = "rd"
        }
        const formattedDate = (monthArray[trueMonth]+" "+day+ending+" "+year);
        return formattedDate;
    }
  
    return (
      <tbody>
        {users[0] !== undefined && users[0].name !== undefined ? (
          users.map(({ gender, name, dob, email, phone, picture, login }) => {
            return (
              <tr key={login.salt}>
                <td data-th="Image" className="center">
                  <img
                    src={picture.medium}
                    alt={"profile image for " + [name.first,name.last].join(" ")}
                    className="img-responsive"
                  />
                </td>
                <td data-th="Name" className=" cap center">
                  {[name.first,name.last].join(" ")}
                </td>
                <td data-th="Gender" className="cap center">
                  {gender}
                </td>
                <td data-th="Phone" className="center">
                  {phone}
                </td>
                <td data-th="Email" className="center">
                  <a href={"mailto:" + email} target="__blank">
                    {email}
                  </a>
                </td>
                <td data-th="DOB" className="center">
                  {getDate(dob.date)+" ("+dob.age+")"} 
                </td>
              </tr>
            );
          })
        ) : (
          <></>
        )}
      </tbody>
    );
}

function DataTable({ headings, users, handleSort }) {
  return (
    <div className="datatable mt-5">
      <table
        id="table"
        className="table table-striped table-hover table-bordered"
      >
        <thead>
          <tr>
            {headings.map(({ name, width }) => {
              if (name === "Name") {
                return (
                <th
                  className="col"
                  key={name}
                  style={{ width }}
                  onClick={() => {
                    handleSort(name.toLowerCase());
                  }}
                >
                  {name}
                  <span style={{color: "#ffb598"}}><FontAwesomeIcon icon={faSort}/></span>
                </th>
              )}
              else {
                return (
                  <th
                    className="col"
                    key={name}
                    style={{ width }}
                    onClick={() => {
                      handleSort(name.toLowerCase());
                    }}
                  >
                    {name}
                  </th>
                )
              }
            })}
          </tr>
        </thead>

        <DataBody users={users} />
      </table>
    </div>
  );
}

export default function DataArea (){
  const [user,setUser] = useState({
    users: undefined,
    order: "descend",
    filteredUsers: [{}]
  })

  if (user.users === undefined) {
    getUsers()
  }

  const headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Gender", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ]

  const handleSort = heading => {
    if (user.order === "descend") {
      setUser({
        order: "ascend"
      })
    } else {
      setUser({
        order: "descend"
      })
    }
    const sorting = (a, b) => {
      if (user.order === "ascend") {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }

    }
    setUser({ filteredUsers: user.filteredUsers.sort(sorting) });
  }

  const handleSearchChange = event => {
    event.preventDefault()
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    console.log(event.target.value,user.users)
    const filter = event.target.value;
    const filteredList = user.users.filter(item => {
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setUser({ filteredUsers: filteredList });
  }

  function getUsers() {
    API.getUsers().then(results => {
      setUser({
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  }

    return (
      <>
        <Nav handleSearchChange={handleSearchChange} />
        <div className="data-area">
          <DataTable
            headings={headings}
            users={user.filteredUsers}
            handleSort={handleSort}
          />
        </div>
      </>
    );

}