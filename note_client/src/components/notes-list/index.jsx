import React from "react";
import Moment from "moment/moment";

function ListNotes(props) {          
    return (
        <>
            <div className="columns">
                <div className="column">
                    <p className="title">{props.notes.length} Notes</p>
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
                            <div className="column">
                                <span className="tag has-background-black has-text-white">{Moment(item.created_at).format('DD/MM')}</span>
                            </div>
                        </div>
                    </div>
                )}
            </ul>
        </>
    )
}

export default ListNotes