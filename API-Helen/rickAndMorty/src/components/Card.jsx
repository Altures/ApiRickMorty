import React from "react";

export default function Card({name, image, species, status}){
    return(
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p><strong>Espécie:</strong> {species}</p>
            <p><strong>Status:</strong> {status}</p>
        </div>
    );
}