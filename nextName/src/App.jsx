import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [pageNumber, setPageNumber] = useState(0);
  const [usersData, setUsersData] = useState([]);

  let fetchUsername = async (page) => {
    try {
      let userBody = await fetch(
        `https://give-me-users-forever.herokuapp.com/api/users/${page}/next`
      );
      let userList = await userBody.json();
      setUsersData(userList.users);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsername(pageNumber);
  }, [pageNumber]);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>USER DETAIL</h1>
      <div className="App">
        {usersData.map((user) => (
          <div class="card" key={user.ID}>
            <h1>{user.FirstNameLastName}</h1>

            <p class="title">{user.JobTitle}</p>
            <p>{user.Company}</p>
            <div class="nav-bottom">
              <span class="col-bottom">
                <a href={`mailto:${user.EmailAddress}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#231f20"
                      d="M27,26H5a3,3,0,0,1-3-3V9A3,3,0,0,1,5,6H27a3,3,0,0,1,3,3V23A3,3,0,0,1,27,26ZM5,8A1,1,0,0,0,4,9V23a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1V9a1,1,0,0,0-1-1Z"
                    />
                    <path
                      fill="#231f20"
                      d="M16,17a1,1,0,0,1-.55-.17l-12-8A1,1,0,0,1,4.55,7.17l12,8A1,1,0,0,1,16,17Z"
                    />
                    <path
                      fill="#231f20"
                      d="M16,17a1,1,0,0,1-.56-1.83l12-8a1,1,0,0,1,1.11,1.66l-12,8A1,1,0,0,1,16,17Z"
                    />
                  </svg>
                </a>
              </span>
              <span class="col-bottom">
                <a href={`tel:${user.Phone}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                  </svg>
                </a>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="pageButton">
        <button
          className="previous"
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber((prev) => prev - 1);
            }
          }}
        >
          &laquo; Previous
        </button>
        <button
          className="next"
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
}

export default App;
