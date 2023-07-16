import React, { useState, useEffect } from "react";
import { push as Menu } from 'react-burger-menu'
import "../../styles/notes.scss"
import NotesServices from "../../services/notes";
import NotesList from "../notes-list"

const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrent_note] = useState({ title: "", body: "", id: "" });


    async function fetchNotes() {
        const response = await NotesServices.index();
        if (response.data.length >= 1) {
            setNotes(response.data.reverse());
            setCurrent_note(response.data[0]);
           
        }
    }
    useEffect(() => {
        fetchNotes();
    }, []);

    const selectNote = (id) => {
        const note = notes.find((note) => {
            return note._id == id;
        })              
        setCurrent_note(note);       
    }




    return (
        <>
            <Menu pageWrapId={"notes-container"}
                onStateChange={(state) => props.setOpenMenu(state.isOpen)}
                isOpen={props.openMenu}
                outerContainerId={"dropDown"}
                customBurgerIcon={false}
                customCrossIcon={false}
            >

                <div className="container search">
                    <div class="columns notes" id="columns notes">
                        <div className="column notes-editor">Search</div>

                    </div>
                </div>
                <div className="conatiner">
                    <NotesList notes={notes}
                        selectNote={selectNote}
                        current_note={current_note} />
                </div>

            </Menu>
            <div className="notes-container" id="notes-container">
                <div class="columns notes" id="columns notes">
                    <div className="column notes-editor">Lucas</div>
                    <div className="column notes-editor">Lucas</div>
                </div>
            </div>

        </>
    )
}

export default Notes;