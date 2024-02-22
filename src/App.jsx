import {useState,useEffect} from 'react';


export default function App() {
 const [data,setData]=useState([]);
 const [filteredData,setFilteredData]=useState(data);
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

      const handleChange=(e)=>{
        let inputVal=e.target.value;
        const searchData=data.filter(schoolInfo=>{
          return (inputVal.includes(schoolInfo.school_name))
        });
      console.log(searchData);

      setFilteredData(searchData);
      }
  
  return (
    <>
    <h2>School List</h2>

    {/* <input type="list" list="schools" placeholder='Search for school...' onChange={handleChange}/>
    <datalist id="schools">
      {filteredData.length>0 && filteredData.map(schoolData=>{
        return <option key={schoolData.dbn} value={schoolData.school_name}>{schoolData.school_name}</option>
      })}
      </datalist> */}

{/* <pre>{JSON.stringify(filteredData,null,2)}</pre> */}
      
<select name="search"   onChange={handleChange}>
{data.length>0 && data.map(schoolData=>{
        return <option key={schoolData.dbn} value={schoolData.school_name}>{schoolData.school_name} </option>
      })}
</select>

   {filteredData.length>0 && filteredData.map(data=>{
    return<p key={data.dbn}>{data.overview_paragraph}</p>
   })}

    {/* <ul>

    {data.length>0 && data.map(school=>{
      return <li key={school.dbn}>{school.school_name}
      <p key={school.dbn}>{school.overview_paragraph}</p></li>
    })}
     </ul>

    <pre>{JSON.stringify(data,null,2)}</pre> */}
      
    </>
  );
}
