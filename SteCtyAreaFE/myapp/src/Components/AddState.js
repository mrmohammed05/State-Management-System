import axios from 'axios';
// import { Toast } from 'bootstrap';
import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddState() {
    const[statename,setstatename]=useState("");
    // const[msg,setmsg]=useState("");
    
    useEffect(()=>{
        getstate()
        Deletestate()
        handledit()
    },[])

    function handlestatename(e){
        e.preventDefault();
        var obj={statename}
        axios
        .post("http://localhost:8081/AddState",obj)
        .then((res)=>{
            if(res.data === "state name already added"){
            //   setmsg("state name already added")
            toast.error("already added")
            }
            else{
                // setmsg("state name added successfully")
            toast.success(res.data)
            }
     
            clearall()
            getstate()
            }
        )
    }
    function clearall(){
        setstatename("");
        setStateid("");
    }

const[statelst,setstatelst]=useState([]);
function getstate(){
    axios
    .get("http://localhost:8081/GetState")
    .then((res)=>{
        setstatelst(res.data)
    })
}


const[stateid,setStateid]=useState();
function Assigndata(state){
    setStateid(state.stateid)
    setstatename(state.statename)
}
function handledit(){
    const obj={statename}
    axios
    .put("http://localhost:8081/Update",obj)
    .then((res)=>{
        toast.success(res.data);
        clearall()
        getstate();
    })
    .catch((error) => {
        toast.error("id not found");
  });
}

function Deletestate(id){
    
    axios
    .delete(`http://localhost:8081/Delete/${id}`)
    .then((res)=>{
        toast.success(res.data);
        clearall();
        getstate();
    })
    .catch((error) => {
        toast.error("id not found");
  });
}

// function Deletestate(id) {
//     if (id && !isNaN(id)) {
//       axios
//         .delete(`http://localhost:8081/Delete/${id}`)
//         .then((res) => {
//           toast.success(res.data); 
//           clearall(); 
//           getstate();
//         })
//     //     .catch((error) => {
//     //       toast.error("An error occurred while deleting the state.");
//     //     });
//     // } else {
//     //   toast.error("Invalid state ID"); // Show error if ID is invalid
//     // }
//   }
  return (
    <div className='container'>
        <div className='row'>
            <div className='card col-6 '>
                <form>
                    <div>
                        <label className='form-label m-1 p-3'>Enter StateName</label>
                        <input type='text' className='form-control'
                        placeholder='Enter...!' 
                        value={statename}
                        onChange={(e)=>
                            setstatename(e.target.value)
                        }/>

                    </div>
                    <div>
                        <Link className={stateid? 'btn btn-warning text-end mt-4':'btn btn-primary text-end mt-4'} onClick={stateid?handledit:handlestatename}>{stateid?"Edit product":"Add product"}</Link>
                    </div>
                    {/* <p>{msg}</p> */}
                </form>
            </div>
            <div className='col-6'>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>slno</td>
                            <td>statename</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statelst.map((item,index)=> {
                                return(
                                <tr key={index}>
                                    <td >{index+1}</td>
                                    <td>{item.statename}</td>
                                    <td>
                                        <Link className='btn btn-primary' onClick={()=>
                                            Assigndata(item)
                                        }>Edit</Link>
                                    </td>
                                    <td>
                                        <Link className='btn btn-danger' onClick={()=>Deletestate(item.stateid)}>
                                        Delete</Link>
                                    </td>
                                </tr>
                             ) })
                        }
                    </tbody>
                </table>
            </div>
        </div>
      
    </div>
  )
}
