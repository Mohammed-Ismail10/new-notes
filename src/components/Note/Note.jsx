import axios from 'axios'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Note({ note, getNotes }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deleteNoteModal(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "ms-2 btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  async function deleteNote(id) {
    try {
      let { data } = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
        headers: { token: `3b8ny__${localStorage.getItem('token')}` }
      })
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }


  async function updateNote(newNote) {
    try {
      console.log(newNote)
      let {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,newNote,{
        headers: { token: `3b8ny__${localStorage.getItem('token')}` }
      })
      console.log(data)
      getNotes()
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }
  let formik = useFormik({
    initialValues: {
      title: note.title,
      content: note.content
    },
    onSubmit: updateNote
  })




  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={formik.handleChange} defaultValue={note.title} className='form-control mb-2' type="text" name='title' placeholder='title' />
            <input onChange={formik.handleChange} defaultValue={note.content} className='form-control' type="text" name='content' placeholder='content' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Edit Note
          </Button>
        </Modal.Footer>
      </Modal>









      <div className='rounded p-5 bg-white mt-3'>
        <h4>{note.title}</h4>
        <p>{note.content}</p>
        <i onClick={() => deleteNoteModal(note._id)} className="fa-solid fa-trash-can curser-pointer me-2"></i>
        <i onClick={handleShow} className="fa-solid fa-pen-to-square curser-pointer mx-2"></i>
      </div>
    </>
  )
}
