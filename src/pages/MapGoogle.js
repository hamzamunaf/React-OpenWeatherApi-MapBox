/** @jsxImportSource @emotion/react */
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';
import { css } from '@emotion/react';

mapboxgl.accessToken =
  '{token for Mapbox here}';



const MapGoogle = (props) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(props.setLng || []);
  const [lat, setLat] = useState(props.setLat || []);
  const [zoom, setZoom] = useState(9);
  const mapcontainer = css`

  `;
  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)


    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    map.resize();
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div css={mapcontainer} ref={mapContainerRef} />
    </div>
  );
};

export default MapGoogle;
