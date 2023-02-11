import React ,{useContext,useState, useEffect,useRef}from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    const {notes,getNotes,editNote}=context;
    useEffect(()=>{
        if(localStorage.getItem('token')){
                getNotes()
            }
            else{
                navigate("/login")
            }
        // eslint-disable-next-line
    },[])
    const ref=useRef(null)
    const refClose=useRef(null)

    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const handleClick=(e)=>{
        e.preventDefault(); 
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("Note Updated Succesfully ","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    return  (
           <>
           <AddNote showAlert={props.showAlert}/>
           <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={note.etitle}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Description</label>
                            <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Password" onChange={onChange}  value={note.edescription}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Tag</label>
                            <input type="text" className="form-control" id="etag" name="etag" placeholder="Password" onChange={onChange}  value={note.etag}/>
                        </div>
                
                        {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<7} type="button" className="btn btn-primary">Update Note</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your notes</h2>
            </div>
            <div className=" container row my-3">
            { notes.length===0 && 'No notes to display'}
            {notes.map((note)=>{
                return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>;
            })}
            </div>
           </>
   )
}
