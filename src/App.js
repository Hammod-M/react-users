import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import { useEffect, useState } from "react";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchVal, setSearchVal] = useState("");
  const [Invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((obj) => {
        setItems(obj.data);
        setIsLoading(false);
      });
  }, []);

  function changeSearch(val) {
    setSearchVal(val);
  }
  function masInvites(id) {
    if (Invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  }
  return (
    <div className="App">
      {success ? (
        <Success count={Invites.length}/>
      ) : (
        <Users
          items={items}
          isLoading={isLoading}
          searchVal={searchVal}
          changeSearch={changeSearch}
          masInvites={masInvites}
          Invites={Invites}
          setSuccess={setSuccess}
        />
      )}
    </div>
  );
}

export default App;
