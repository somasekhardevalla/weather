import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Forcaste() {
  const[feels,setfeels]=useState([])
  const[max,setMax]=useState([])
  const[min,setMin]=useState([])
    const [res,setRes]=useState([])
    const [city,setCity]=useState("Guntur")
    const [gcity,setGcity]=useState("")
    const [des,setDes]=useState([])
    const [icon,setIcon]=useState([])
    const [list,setList]=useState([])
    // const[licon,setLicon]=useState([])

   useEffect(()=>{
    {
      fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=14372193bf29a2dc870dc2bd95597f96&units=metric`)
          .then(response=>response.json())
          .then(response=>
              
                  {
                    // console.log(response)
                    setDes(response.weather[0].description)
                     setIcon(response.weather[0].icon)
                      setGcity(response.name)
             setfeels(response.main.feels_like+"°C")
             setMin(response.main.temp_min+"°C")
             setMax(response.main.temp_max+"°C")
             setRes(response.main.temp+"°C")
                  })
  
             fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=14372193bf29a2dc870dc2bd95597f96&units=metric`)
             .then(response=>response.json())
             .then(response=>
              {
                  console.log(response.list)
                 setList(response.list)

              })
  }
  },[])
  const getwether=()=>
  {
      fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=14372193bf29a2dc870dc2bd95597f96&units=metric`)
          .then(response=>response.json())
          .then(response=>
              
                  {
                      // console.log(response.weather[0].description)
                      setGcity(response.name)
                      setDes(response.weather[0].description)
                     setIcon(response.weather[0].icon)
             setfeels(response.main.feels_like+"°C")
             setMin(response.main.temp_min+"°C")
             setMax(response.main.temp_max+"°C")
             setRes(response.main.temp+"°C")
             
                  })
  
             fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=14372193bf29a2dc870dc2bd95597f96&units=metric`)
             .then(response=>response.json())
             .then(response=>
              {

                // console.log(response)
                console.log(response.list)
                setList(response.list)

              })
  }
  return (
    <div>
      <div className='card'>
        <input type="text" placeholder='City name...'  className='input' onChange={(e)=>{setCity(e.target.value)}}/>
        <br />
        <br />
        <input type="button" value='Get temparatue' onClick={getwether} />
        <br />
      {res && (
        <div className='data'>
           <div className='place'>
        <p>{res}</p>
        <p>{des}</p>
           <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}alt="" />
        {/* <p>{res.weather.description}</p> */}
          </div>
        <div className='details'>
           <p>Place : {gcity}</p>
          
        <p>Feels Like :{feels}</p>
        <p>Min_temp :{min}</p>
        <p>Max_temp :{max}</p>
        </div >
        </div>)}
       
      </div>
      { list?.map((data)=>{
        return <div className='list'>
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
          <p>{data.weather[0].description}</p>
          <p>{data.dt_txt}</p>
          <p>{data.main.temp}°C</p>
        </div>
      })
      }
    </div>
  )
}
