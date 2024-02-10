import React, {useState, useEffect} from "react"
import Card from 'react-bootstrap/Card';

function CardComponent() {
  const [lat, setLat] = useState([]); 
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [weather, setWeather] = useState([]); 

  // fetch the data via API call 
  const fetchData = async() => {  
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(result => {
      setData(result);  
      setWeather(result); 
      console.log(result);
    });
  }

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(function(position) { 
      setLat(position.coords.latitude); 
      setLong(position.coords.longitude);
    }); 
    fetchData();
  }, [lat, long]); 

  return (
    <Card style={{ width: '30rem' }}>
      <div ClassName="iamge-container">
        <Card.Img variant="top" src="" /> 
      </div>
      <Card.Body>
        <Card.Title><h1>Weather Today</h1></Card.Title>
        <Card.Text>
        {(typeof data.main != 'undefined') ? (
        <h3> Location: {data.name} <br></br> Temprature: {data.main.temp}°C <br></br> Feels like: {data.main.feels_like}°C</h3>
        
        ): (
          <div></div>
        )}

        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;