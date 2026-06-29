import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddCity() {
  const[cityname,setCityname]=useState("");
  const[stateid,setStateid]=useState();
  
  // const[msg,setMsg]=useState("");

useEffect(()=>{
  getcity();
  getstate();

},[])
  const[statelst,setstatelst]=useState([])
  function getstate(){
      axios
      .get("http://localhost:8081/GetState")
      .then((res)=>{
          setstatelst(res.data)
      })
  }

const[citylst,setCityLst]=useState([])
  function getcity(){
    axios
    .get("http://localhost:8081/GetCity")
    .then((res)=>{
      setCityLst(res.data)
    })
  }
  function clearall(){
    setCityname("")
    setStateid("")
    
  }

  function handleaddcity(e){
    e.preventDefault();
    const obj={cityname}
    axios
    .post(`http://localhost:8081/Addcity/${stateid}`,obj)
    .then((res)=>{
      if(res.data === "city name already added"){
        // setMsg("city name already added")
        toast.error("city name already added")
      }
      else{
        // setMsg("city name added successfully")
        toast.success("city added successfully")
      }
      clearall()
      getcity()
      getstate()
    })
  }



const[cityid,setCityid]=useState();
function Assigndata(city){
  setCityid(city.cityid)
    setCityname(city.cityname)
}
function handledit(){
    const obj1={cityid ,cityname}
    axios
    .put("http://localhost:8081/UpdateC",obj1)
    .then((res)=>{
        toast.success(res.data);
        clearall()
        getstate();
        getcity()
    })
}

function Deletestate(id){
    
  axios
  .delete(`http://localhost:8081/Deletec/${id}`)
  .then((res)=>{
      toast.success(res.data);
      clearall();
      getstate();
      getcity();
  })
  .catch((error) => {
      toast.error("id not found");
});
}
  return (
    <div className='container'>
      <div className='row'>
        <div className='card p-5 col-5'>
          <div>
            <label>select state</label>
            <select className='form-select mb-3'
            value={stateid}
            onChange={(e)=>setStateid(e.target.value)}>
              <option value={0}>--select--</option>
              {
                statelst.map((item,index)=>{
                  return(
                    <option key={index}
                    value={item.stateid}>{item.statename}</option>
                  )
                })
              }

            </select>
          </div>
          <div>
            <label>enter the city</label>
            <input type='text' className='form-control' 
            value={cityname}
            onChange={(e)=>setCityname(e.target.value)}/>

          </div>
        {/* <div className='mt-3 text-end'>
              <Link className='btn btn-primary' onClick={handleaddcity}>
              AddCity</Link>
        </div> */}

         <div>
         <Link className={cityid? 'btn btn-warning text-end mt-4':'btn btn-primary text-end mt-4'} onClick={cityid?handledit:handleaddcity}>{cityid?"Edit product":"Add product"}</Link>
         </div>
        </div>

        <div className='col-6'>
          <table className='table'>
            <thead>
              <tr>
                <td>slno</td>
                <td>statename</td>
                <td>cityname</td>
                <td>Edit</td>
                <td>delete</td>
              </tr>
            </thead>
            <tbody>
              {
                citylst.map((item,index)=>{
                  return(
                    <tr key={index}>
                      <td >{index+1}</td>
                      <td>{item.statemaster.statename}</td>
                      <td>{item.cityname}</td>
                      <td>
                      <Link className='btn btn-primary' onClick={()=>
                       Assigndata(item)
                      }>Edit</Link>
                      </td>
                      <td>
                     <Link className='btn btn-danger' onClick={()=>Deletestate(item.cityid)}>
                    Delete</Link>
                    </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}



