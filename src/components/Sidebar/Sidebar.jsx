import { Button, Drawer} from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Sidbar.module.css'
export default function Sidebar() {


  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


function logout(){
  localStorage.removeItem('token')
}



  return (
    <>


      <Button type="primary" onClick={showDrawer} className='d-lg-none'>
      <i className="fa-solid fa-bars"></i>
      </Button>
      <Drawer
        className='bg-dark ps-3'
        title={
          <>
            <div className='d-flex pt-3'>
              <i className="fa-regular fa-note-sticky text-info fs-2"></i>
              <h3 className='ms-3 text-white'>Notes</h3>
            </div>
          </>
        }
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <ul className='list-unstyled mt-5 ps-xxl-5 ps-3'>
          <li className='py-3'>
            <Link to={'/home'} className='text-decoration-none fs-4 text-white'>Home</Link>
          </li>
          <li className='py-3'>
            <Link onClick={logout} to={'/login'} className='text-decoration-none fs-4 text-white'>Logout</Link>
          </li>
        </ul>
      </Drawer>








      <div className={`bg-dark h-100 position-fixed ps-3 d-none d-lg-block ${style.sidebarWidth}`}>
        <div className='d-flex pt-3'>
          <i className="fa-regular fa-note-sticky text-info fs-2"></i>
          <h3 className='ms-3 text-white'>Notes</h3>
        </div>

        <ul className='list-unstyled mt-5 ps-xxl-5 ps-3'>
          <li className='py-3'>
            <Link to={'/home'} className='text-decoration-none fs-4 text-white'>Home</Link>
          </li>
          <li className='py-3'>
            <Link onClick={logout} to={'/login'} className='text-decoration-none fs-4 text-white'>Logout</Link>
          </li>
        </ul>
      </div>

    </>
  )
}
