import React ,{useState,useContext}from 'react'
import noteContext from '../context/notes/noteContext';

export default function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note added Succesfully ","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
  return (
        <div className ="container my-3">
            <h3>Add a Note</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={note.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Password" onChange={onChange} value={note.description}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Password" onChange={onChange} value={note.tag}/>
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<7} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
       </div>
  )
}
