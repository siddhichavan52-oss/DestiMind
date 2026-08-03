import { useNavigate } from "react-router-dom";
import "./DestinationCard.css";


export default function DestinationCard({ destination }) {

  const navigate = useNavigate();


  return (

    <div className="destination-card">


      <img
        src={destination.image}
        alt={destination.name}
      />


      <div className="card-content">


        <h2>
          {destination.name}
        </h2>


        <p>
          📍 {destination.country}
        </p>


        <p>
          ⭐ {destination.rating}/5
        </p>


        <p>
          🎯 {destination.match}% Match
        </p>


        <p>
          💰 ₹{destination.price.toLocaleString()}
        </p>



        <button
          onClick={() =>
            navigate("/destination", {
              state: {
                destination: destination
              }
            })
          }
        >

          Explore

        </button>


      </div>


    </div>

  );
}