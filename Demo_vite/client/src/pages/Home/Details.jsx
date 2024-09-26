import React, {useState} from 'react';
import axios from "axios";
import {BASE_URL} from "../../../../config.js";
import toast from "react-hot-toast";

const Details = () => {

    let [detail, setDetail] = useState({name:''});

    const handleSubmit = async () =>{
       console.log("name: ",detail.name)
        try{
            let res = await axios.post(`${BASE_URL}/api/v1/Details`,{name:detail.name},{withCredentials:true})
            if(res.data['status']==="success"){
                toast.success("Data is Submitted")
            }
        }catch (e) {
            toast.error("something went wrong !");
        }

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 pt-4 ">
                    <lable>Name :</lable>
                    <input name="name" type="text" className="form-control"
                    onChange={(e)=> setDetail({...detail,name:e.target.value})}/>
                </div>
                <div className="col-md-4 pt-4 ">
                    <button type="submit" onClick={handleSubmit} className="btn btn-success submit-button">Submit</button>
                </div>

            </div>
        </div>
    );
};

export default Details;