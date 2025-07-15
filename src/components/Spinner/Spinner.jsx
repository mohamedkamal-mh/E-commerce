import React, { useEffect ,useState} from 'react'
import style from './Spinner.module.css'
import { Grid } from 'react-loader-spinner';


export default function Spinner() {
  const [counter, setcounter] = useState(0)

  useEffect(()=>{

  },[])


  return <>
  <div className='h-screen flex justify-center items-center'>
    
  <Grid
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
 
</div>
  </>
}
