import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './Map.css'

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2FtYW50aGF0dWNrZXIiLCJhIjoiY2tuc2JhbGdiMG9laTJvcGg5dTl1Z2FwcSJ9.MoGQ7EJJq51S2o8tcKL-3Q'



const Map = () => {
  const mapContainerRef = useRef(null)

  // set a defult lng and lat
  const [lng, setLng] = useState(-104)
  const [lat, setLat] = useState(39)
  const [zoom, setZoom] = useState(3.5)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    })

    // (+/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4))
      setLat(map.getCenter().lat.toFixed(4))
      setZoom(map.getZoom().toFixed(2))
    });

    return () => map.remove()
  }, []) 

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  )

}

export default Map
