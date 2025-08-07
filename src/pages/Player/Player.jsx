import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [ apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  })

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzE2M2ZmMmZkZGFhZWQ5NmVjMjgzOTc5ZjY1MDVhNSIsIm5iZiI6MTc1NDU3MzUxNC44MjIsInN1YiI6IjY4OTRhYWNhOGVmNzYyM2RlOTk5YThmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ERDAZCs6-r82Ycc9w3Bb-rmKw2iT2woExhajjbrcNus'
  }
};

useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

},[])


  return (
    <div className='player'>
      <img src={back_arrow} alt="" onClick={() => {navigate(-1      )}}/>
      <iframe 
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='Trailer' 
      frameborder="0"
      allowFullScreen 
      width='90%'
      height= '90%'
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
