import React from 'react';

import { FaBug } from 'react-icons/fa';

const WhoAmI = () => (
  <main
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '1rem',
    }}
  >
    <h1>I don not know!</h1>
    <h2>I would also like to know.</h2>
    <h3>
      While I discover it, I will continue to add more{' '}
      <FaBug style={{ margin: '0 0.5rem' }} /> to my code.
    </h3>
  </main>
);

export default WhoAmI;
