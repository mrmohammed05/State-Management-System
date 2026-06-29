import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddArea() {


  const [areaname, setAreaName] = useState("");
  const [arealst, setArealist] = useState([]);
  const [stateid, setStateid] = useState();
  const [statelst, setstatelst] = useState([]);
  const [cityid, setCityid] = useState("");
  const [citylst, setCityLst] = useState([]);

  useEffect(() => {
    getarea()
    getcity()
    getstate()
  }, [])
  function getstate() {
    axios
      .get("http://localhost:8081/GetState")
      .then((res) => {
        setstatelst(res.data)
     
      })
  }
  function getcity() {
    axios
      .get("http://localhost:8081/GetCity")
      .then((res) => {
        setCityLst(res.data)
      })
  }

  function getarea() {
    axios
      .get("http://localhost:8081/GetArea")
      .then((res) => {
        setArealist(res.data);

      })
  }

  function clearall() {
    setAreaName("");
    setStateid("");
    setCityid("");
    setAreaid("")
  }


  function handleAddArea(e) {
    e.preventDefault();
    const obj2 = { areaid,areaname }
    axios
      .post(`http://localhost:8081/addarea/${cityid}`, obj2)
      .then((res) => {
        if (res.data === "Area added already") {
          toast.error("Area added already")
        }
        else {
          toast.success("Area added successfully")
        }
        clearall()
        getarea()
        getcity()
        getstate()
      })
  }

  const [areaid, setAreaid] = useState("")
  function Assigndata(area) {
    setAreaid(area.areaid)
    setAreaName(area.areaname)
    setCityid(area.citymaster?.cityid);  
    setStateid(area.citymaster?.statemaster?.stateid); 
    
  }
  function handledit() {
    const obj1 = { areaid , areaname }
    axios
      .put("http://localhost:8081/UpdateA", obj1)
      .then((res) => {
        toast.success(res.data);
        clearall();
        getcity()
        getarea()
        getstate()
      })
  }

  function deltearea(id) {

    axios
      .delete(`http://localhost:8081/DeleteA/${id}`)
      .then((res) => {
        toast.success(res.data);
        clearall();
        getstate();
        getcity();
        getarea();
      })
      .catch((error) => {
        toast.error("id not found");
      });
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <div className='card p-5'>
            <div>
              <label >select state</label>
              <select className='form-select mb-3'
                value={stateid}
                onChange={(e) => setStateid(e.target.value)}>
                <option value={0}>--select</option>
                {
                  statelst.map((item, index) => {
                    return (
                      <option key={index} value={item.stateid}>{item.statename}</option>
                    )
                  })
                }
              </select>
            </div>


            <div>
              <label>select city</label>
              <select className='form-select mb-3'
                value={cityid}
                onChange={(e) => setCityid(e.target.value)}>
                <option value={0}>---select--</option>
                {
                  citylst.filter(s => s.statemaster?.stateid == stateid).map((item, index) => {
                    return (
                      <option key={index} value={item.cityid}>{item.cityname}</option>
                    )
                  })
                }
              </select>
            </div>
            <div>
              <label>Enter Area</label>
              <input type='text' className='form-control'
                value={areaname}
                onChange={(e) => setAreaName(e.target.value)} />
              <div>
                <Link className={areaid ? 'btn btn-warning text-end mt-4' : 'btn btn-primary text-end mt-4'} onClick={areaid ? handledit : handleAddArea}>{areaid ? "Edit product" : "Add product"}</Link>
              </div>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <table className='table'>
            <thead>
              <tr>
                <th>slno</th>
                <th>state name</th> 
                <th>city name</th>
                <th>areaname</th>
              </tr>
            </thead>
            <tbody>
              {
                arealst.map((item, index) => {
                  const stateName = item.citymaster?.statemaster?.statename || 'N/A';  
                  const cityName = item.citymaster?.cityname || 'N/A';
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.citymaster?.statemaster?.statename}</td> 
                      <td>{item.citymaster?.cityname}</td>
                      <td>{item.areaname}</td>
                      <td>
                        <Link className='btn btn-primary' onClick={() =>
                          Assigndata(item)
                        }>Edit</Link>
                      </td>
                      <td>
                        <Link className='btn btn-danger' onClick={() => deltearea(item.areaid)}>
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
