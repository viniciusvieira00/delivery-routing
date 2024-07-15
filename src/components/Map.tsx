import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { dijkstra, shortestPath, haversineDistance, Graph, LatLngLiteral } from '../utils/grafos';

interface MapProps {
  origin: LatLngLiteral | null;
  destination: LatLngLiteral | null;
  reset: () => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const centerDefault = {
  lat: -23.55052,
  lng: -46.633308,
};

interface Intersection {
  lat: number;
  lng: number;
  placeId: string;
}

interface GraphResult {
  graph: Graph;
  allIntersections: Intersection[];
}

const getNearbyIntersections = async (location: LatLngLiteral, apiKey: string): Promise<Intersection[]> => {
  const response = await fetch(
    `https://roads.googleapis.com/v1/nearestRoads?points=${location.lat},${location.lng}&key=${apiKey}`
  );
  const data = await response.json();
  return data.snappedPoints.map((point: any) => ({
    lat: point.location.latitude,
    lng: point.location.longitude,
    placeId: point.placeId,
  }));
};

const generateGraph = async (origin: LatLngLiteral, destination: LatLngLiteral, apiKey: string): Promise<GraphResult> => {
  const originIntersections = await getNearbyIntersections(origin, apiKey);
  const destinationIntersections = await getNearbyIntersections(destination, apiKey);
  const allIntersections = [...originIntersections, ...destinationIntersections];
  const graph: Graph = {};

  allIntersections.forEach((intersection) => {
    graph[intersection.placeId] = {};
    allIntersections.forEach((neighbor) => {
      if (intersection.placeId !== neighbor.placeId) {
        graph[intersection.placeId][neighbor.placeId] = haversineDistance(intersection, neighbor);
      }
    });
  });

  graph['origin'] = {};
  graph['destination'] = {};
  originIntersections.forEach((intersection) => {
    graph['origin'][intersection.placeId] = haversineDistance(origin, intersection);
  });
  destinationIntersections.forEach((intersection) => {
    graph['destination'][intersection.placeId] = haversineDistance(destination, intersection);
    graph[intersection.placeId]['destination'] = haversineDistance(destination, intersection);
  });

  return { graph, allIntersections };
};

const Map: React.FC<MapProps> = ({ origin, destination, reset }) => {
  const [path, setPath] = useState<LatLngLiteral[]>([]);
  const [center, setCenter] = useState<LatLngLiteral>(centerDefault);
  const [zoom, setZoom] = useState<number>(10);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    const calculateRoute = async () => {
      if (origin && destination) {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
        const { graph, allIntersections } = await generateGraph(origin, destination, apiKey);
        const { distances, previous } = dijkstra(graph, 'origin');
        const pathNodes = shortestPath(previous, 'destination');

        setCenter({ lat: (origin.lat + destination.lat) / 2, lng: (origin.lng + destination.lng) / 2 });
        setZoom(14);

        const pathCoordinates = pathNodes.map(node => {
          if (node === 'origin') return origin;
          if (node === 'destination') return destination;
          const intersection = allIntersections.find(inter => inter.placeId === node);
          return intersection ? { lat: intersection.lat, lng: intersection.lng } : { lat: 0, lng: 0 };
        });

        setPath(pathCoordinates);

        if (mapRef.current) {
          const bounds = new google.maps.LatLngBounds();
          pathCoordinates.forEach(point => bounds.extend(point));
          mapRef.current.fitBounds(bounds);
        }
      }
    };

    calculateRoute();
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
      >
        {origin && <Marker position={origin} />}
        {destination && <Marker position={destination} />}
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{ strokeColor: '#FF0000' }}
          />
        )}
      </GoogleMap>
      <button onClick={() => {
        reset()
        setPath([])
        // reload page
        window.location.reload();
      }}>Calcular nova rota</button>
    </LoadScript>
  );
};

export default Map;
