import React, { useState } from 'react'
import note1 from '../../assets/images/notes1.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Register() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  let navigate = useNavigate()


  async function registerSubmit(values) {
    setLoading(true)
    try {
      let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      navigate('/login')
    } catch (error) {
      setError(error.response.data.msg)
    }
    setLoading(false)
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(2, 'minimum length is 2').max(20, 'maximum length is 20'),
    email: Yup.string().required('email is required').email('enter valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number:'),
    age: Yup.number().required('age is required').min(10, 'minimum age is 10').max(100, 'maximum age is 100'),
    phone: Yup.string().required('phone is required'),
  })



  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone: ''
    },
    validationSchema,
    onSubmit: registerSubmit
  })






  return (
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className='ps-2 fs-4 fw-bold'>Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-5 d-none d-sm-block p-4">
            <div className='d-flex justify-content-center align-items-center vh-100'>
              <img src={note1} alt="note1" />
            </div>
          </div>
          <div className="col-sm-7 col-12">
            <div className='vh-100 d-flex justify-content-center align-items-center'>
              <div className='rounded shadow p-4 w-100'>
                <h2 className='text-center'>Sign Up Now</h2>
                {error ? <div className='alert alert-danger text-center'>{error}</div> : null}
                <form onSubmit={formik.handleSubmit}>
                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' className='form-control' type="text" placeholder='Enter Your Name' />
                    {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-1'>{formik.errors.name}</div> : null}
                  </div>
                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className='form-control' type="email" placeholder='Enter Your Email' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-1'>{formik.errors.email}</div> : null}
                  </div>
                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className='form-control' type="password" placeholder='Enter Your Password' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-1'>{formik.errors.password}</div> : null}
                  </div>
                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.age} name='age' className='form-control' type="number" placeholder='Enter Your Age' />
                    {formik.errors.age && formik.touched.age ? <div className='alert alert-danger p-1'>{formik.errors.age}</div> : null}
                  </div>
                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' className='form-control' type="tel" placeholder='Enter Your Phone' />
                    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger p-1'>{formik.errors.phone}</div> : null}
                  </div>
                  {loading ? <div className='bg-info text-center p-2 rounded text-white w-100'>Loading...</div> : <button className='btn btn-info text-white w-100' type="submit">Sign Up</button>}
                </form>
                <p className='text-center mt-2'>Already have account? <Link to={'/login'} className='text-decoration-none'>Login Now</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
