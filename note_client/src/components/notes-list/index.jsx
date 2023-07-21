import React from "react";
import Moment from "moment/moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function ListNotes(props) {          
    return (
        <>
            <div className="columns">
                <div className="column is-6">
                    <p className="title is-4">{props.notes.length} Notes</p>
                </div>
                <div className="column is-6">
                    <button className="button is-custom-purple is-outlined is-small" onClick={()=> props.createNote()}>Criar nota</button>
                </div>
            </div>
            <ul className="notes-list">
                {props.notes.map((item, key) =>                     
                    <div className={`notes-item-list ${item == props.current_note ? 'notes-item-list-colorB' : ''}`} key={key} onClick={() => props.selectNote(item._id)}  >

                        <h1 className="is-4 title">
                            {item.title.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}
                        </h1>
                        <h1 className="is-6 subtitle"  >
                            {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}
                        </h1>
                        <div className="columns">
                            <div className="column is-10">
                                <span className="tag has-background-black has-text-white">{Moment(item.created_at).format('DD/MM')}</span>
                            </div>
                            <div className="column is-2">
                                <FontAwesomeIcon className="" icon={faTrash} style={{color: "#000000",}} onClick={() =>props.deleteNotes(item._id)} />
                                 
                            </div>
                        </div>
                    </div>
                )}
            </ul>
           <br /><br />
        </>
    )
}

export default ListNotes