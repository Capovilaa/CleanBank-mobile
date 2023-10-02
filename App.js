import React from 'react';
import Routers from './src/routers';
import { withExpoSnack } from 'nativewind';

export default withExpoSnack( function App() {
  return (    
    <Routers />
  );
})

