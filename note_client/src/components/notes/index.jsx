import React, { useState, useEffect } from "react";
import { push as Menu } from 'react-burger-menu';
import "../../styles/notes.scss";
import NotesServices from "../../services/notes";
import NotesList from "../notes-list";
import Editor from "../notes-editor";
import Search from '../notes-search';

const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [current_note, setCurrent_note] = useState({ title: "", body: "", id: "" });


    async function fetchNotes() {
        const response = await NotesServices.index();
        if (response.data.length >= 1) {
            setNotes(response.data.reverse());
            setCurrent_note(response.data[0]);

        } else {
            setNotes([]);
        }
    }
    useEffect(() => {
        fetchNotes();
    }, []);

    const createNote = async () => {
        await NotesServices.create();
        fetchNotes();
    }

    const deleteNotes = async (id) => {
        await NotesServices.delete(id);
        fetchNotes();
    }
    const updateNote = async (oldNote, params) => {
        const updatedNote = await NotesServices.update(oldNote._id, params);
        const index = notes.indexOf(oldNote);
        const newNotes = notes;
        newNotes[index] = updatedNote.data;
        setNotes(newNotes);
        setCurrent_note(updatedNote.data);
    }
    const searchNotes = async (query) => {
        const response = await NotesServices.search(query);
        setNotes(response.data)
    }

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
                        <Search searchNotes={searchNotes} fetchNotes={fetchNotes} />
                    </div>
                </div>
                <div className="conatiner">
                    <NotesList notes={notes}
                        selectNote={selectNote}
                        current_note={current_note}
                        createNote={createNote}
                        deleteNotes={deleteNotes} />
                </div>

            </Menu>
            <div className="notes-container notes-editor" id="notes-container">

                <Editor
                    note={current_note}
                    updateNote={updateNote}
                >

                </Editor>

            </div>

        </>
    )
}

export default Notes;