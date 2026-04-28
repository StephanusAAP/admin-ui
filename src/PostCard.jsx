import React, { useState } from "react";

function PostCard({ id, userId, title, body }) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="
        flex flex-col justify-between
        bg-white p-6 rounded-lg shadow
        transition-all duration-300
        hover:scale-105 hover:border hover:bg-pink-100
      "
    >
      {/* Judul */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>

      {/* Isi */}
      <p className="text-gray-600 mb-4 flex-grow">
        {body}
      </p>

      {/* Tombol */}
      <button
        className={`text-white p-2 rounded-md transition
          ${
            clicked
              ? "bg-special-red2 hover:brightness-110"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        onClick={() => setClicked(true)}
      >
        {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
      </button>
    </div>
  );
}

export default PostCard;