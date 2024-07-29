import React, { useEffect, useState } from 'react';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import useCookies from './hooks/useCookies';
import Loader from './components/Loader';
const queryclient = new QueryClient();

function App() {
  const { getCookies } = useCookies();
  const [loading,setLoading] = useState(true)
  const componentMount = () => {
     const ac_tkn:any = getCookies('ac_tkn');
     if(ac_tkn && window.location.pathname === '/'){
       window.location.href = '/home?redirect=true?em='+ac_tkn;
     }
     else{
       setLoading(false)
     }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=> {componentMount()},[]);
  return (
    <>
     {
       loading ? (
         <Loader/>
       ) : (
        <QueryClientProvider client={queryclient}>
      <RouterProvider router={router} />
        </QueryClientProvider>
       )
     }
    </>
  );
}

export default App;
