import {useState,useEffect} from 'react';


export default function App() {
 const [data,setData]=useState([]);
 useEffect(()=>{
  const abortController=new AbortController();
  const signal=abortController.signal;
const dataFetch=(async()=>{
  const response= await fetch("https://data.cityofnewyork.us/resource/s3k6-pzi2.json",{signal});
  try{

    if(response.ok){
      const data=await response.json();
      setData(data);
    }
    
  }catch(err){
    if(err.name==="AbortError")
      console.error("Sorry the fetch was aborted");
    console.error("Something went wrong",err.message);
  }
});
dataFetch();
return()=>{
  setTimeout(()=>abortController.abort(),5000);
}
 },[]);
 
  return (
    <>
    <h2>School List</h2>
    <ul>

    {data.length>0 && data.map(school=>{
      return <li key={school.dbn}>{school.school_name}
      <p key={school.dbn}>{school.overview_paragraph}</p></li>
    })}
     </ul>

    {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
      
    </>
  );
}
