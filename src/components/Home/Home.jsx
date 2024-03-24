import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik';
import Note from '../Note/Note.jsx';

export default function Home() {
  const [addNoteErr, setAddNoteErr] = useState('');
  const [notes, setNotes] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function addNote(note) {
    try {
      let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`, note, {
        headers: { token: `3b8ny__${localStorage.getItem('token')}` }
      })
      console.log(data)
      handleClose()
      getNotes()
    } catch (error) {
      console.log(error.response.data.msg)
      setAddNoteErr(error.response.data.msg)
    }
  }
  let formik = useFormik({
    initialValues: {
      title: "",
      content: ""
    },
    onSubmit: addNote
  })

















  async function getNotes() {
    let { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
      headers: { token: `3b8ny__${localStorage.getItem('token')}` }
    })
    console.log(data.notes)
    setNotes(data.notes)
  }
  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {addNoteErr ? <div className='alert alert-danger p-1'>{addNoteErr}</div> : null}
            <input onChange={formik.handleChange} value={formik.values.title} className='form-control mb-2' type="text" name='title' placeholder='title' />
            <input onChange={formik.handleChange} value={formik.values.content} className='form-control' type="text" name='content' placeholder='content' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>















      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-lg-10 col-12">
          <div className="container">
            <div className='text-end mt-4'>
              <Button className='text-white fs-5' variant="info" onClick={handleShow}>
                + Add note
              </Button>
            </div>
            <div className="row">
              {notes.map((note) => <div className="col-12 col-md-6 col-lg-4">
                <Note key={note._id} note={note} getNotes={getNotes} />
              </div>)}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
