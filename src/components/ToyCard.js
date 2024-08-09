import React from "react";

function ToyCard({ toy, onDelete, onLike }) {
  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button onClick={() => onLike(toy.id)} className="like-btn">
        Like {"<3"}
      </button>
      <button onClick={() => onDelete(toy.id)} className="del-btn">
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
