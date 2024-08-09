import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((error) => console.log(error));
  }, []);

  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((data) => setToys((prevToys) => [...prevToys, data]))
      .catch((error) => console.log(error));
  }

  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((data) => setToys(data && toys.filter((toy) => toy.id !== id)))
      .catch((error) => console.log(error));
  }

  function likeToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toys.find((toy) => toy.id === id).likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        setToys((prevToys) =>
          prevToys.map((toy) => (toy.id === id ? data : toy))
        )
      )
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={deleteToy} onLike={likeToy} />
    </>
  );
}

export default App;
