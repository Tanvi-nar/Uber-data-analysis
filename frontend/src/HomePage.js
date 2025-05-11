import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import analysisImg from "./assets/car.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="left">
        <h1 className="title">
          <span className="line">Uber Data</span>
          <span className="line">Analysis</span>
        </h1>

        {/* 👉 go to /upload */}
        <button className="analysBtn" onClick={() => navigate("/upload")}>
         Analysis.
        </button>
      </div>

      <img src={analysisImg} alt="Uber analysis" className="hero" />
    </div>
  );
}
