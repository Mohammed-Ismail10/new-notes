import React, { useState } from 'react'
import note3 from '../../assets/images/notes3.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'


export default function Login() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  let navigate = useNavigate()


  async function loginSubmit(values) {
    setLoading(true)
    try {
      let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
      localStorage.setItem('token', data.token)
      navigate('/home')
    } catch (error) {
      console.log(error)
      setError(error.response.data.msg)
    }
    setLoading(false)
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('email is required').email('enter valid email'),
    password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number:'),
  })



  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: loginSubmit
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
              <img src={note3} alt="note3" />
            </div>
          </div>
          <div className="col-sm-7 col-12">
            <div className='vh-100 d-flex justify-content-center align-items-center'>
              <div className='rounded shadow p-4 w-100'>
                <h2 className='text-center'>Login Now</h2>
                {error ? <div className='alert alert-danger text-center'>{error}</div> : null}
                <form onSubmit={formik.handleSubmit}>

                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className='form-control' type="email" placeholder='Enter Your Email' />
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-1'>{formik.errors.email}</div> : null}
                  </div>
                  <div className='my-3'>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className='form-control' type="password" placeholder='Enter Your Password' />
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-1'>{formik.errors.password}</div> : null}
                  </div>


                  {loading ? <div className='bg-info text-center p-2 rounded text-white w-100'>Loading...</div> : <button className='btn btn-info text-white w-100' type="submit">Login</button>}
                </form>
                <p className='text-center mt-2'>Don't have account? <Link to={'/'} className='text-decoration-none'>Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
