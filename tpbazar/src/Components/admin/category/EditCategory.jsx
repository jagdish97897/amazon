import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
function EditCategory() {
    const [data, setData] = useState({
        cname: '',
    })
    const navigate = useNavigate()
    const { cid } = useParams();
    ////for update data
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/category/viewcategory' + cid)
            .then(res => {
                setData({
                    ...data, categoryname: res.data.Result[0].cname,
                })
            })
            .catch(err => console.log(err));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:5000/api/admin/category/updatecategory/:cid' + cid, data)
            .then(res => {
                if (res.data.status === "success") {
                    console.log(res)
                    navigate('/category')
                }
            })
            .catch(err => console.log(err));
    }
    return (
<>
<div className='d-flex flex-column align-items-center pt-4'>
            <h2>Update Category</h2>
            <form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
                    <label for="InputPcategoryid" class="form-label">Category ID</label>
                    <input type="text" class="form-control" id="InputPcategoryid" placeholder='Enter ID' autoComplete='off'
                        onChange={e => setData({ ...data, cid: e.target.value })} value={data.cid} />
                </div>
                <div class="col-12">
                    <label for="inputName" class="form-label">Category Name</label>
                    <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setData({ ...data, cname: e.target.value })} value={data.cname} />
                </div> 
                <div class="col-12"> 
                
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
</>
    )
}
export default EditCategory