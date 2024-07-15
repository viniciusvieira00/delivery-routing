'use client';

import { useState } from 'react';
import Map from '../components/Map';
import { Box, Button, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { LatLngLiteral } from '../utils/grafos';
import { useRouter } from 'next/navigation';

const geocode = async (address: string, apiKey: string): Promise<LatLngLiteral | null> => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
  const data = await response.json();
  if (data.results.length > 0) {
    return data.results[0].geometry.location;
  }
  return null;
};

const HomeView: React.FC = () => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [originCoords, setOriginCoords] = useState<LatLngLiteral | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<LatLngLiteral | null>(null);
  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
    const originLocation = await geocode(origin, apiKey);
    const destinationLocation = await geocode(destination, apiKey);
    setOriginCoords(originLocation);
    setDestinationCoords(destinationLocation);
    console.log(originLocation, destinationLocation);
  };

  return (
    <Box>
      <Typography variant='h1'>Delivery Routing</Typography>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        margin: '20px 0',
      }} onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel>Origem:</InputLabel>
          <Input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Destino:</InputLabel>
          <Input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </FormControl>
        <Button variant='contained' type="submit">Calcular Rota</Button>
      </form>
      <Map reset={
        () => {
          setOrigin('');
          setDestination('');
          setOriginCoords(null);
          setDestinationCoords(null);
          route.push('/#');
        }
      
      } origin={originCoords} destination={destinationCoords} />
    </Box>
  );
};

export default HomeView;
