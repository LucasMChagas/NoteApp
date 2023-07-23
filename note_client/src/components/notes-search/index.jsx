import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Search(props) {
    const [query, setQuery] = useState("")

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.searchNotes(query)
        }
    }

    return (
        <>
            <div className="columns">
                <div className="column is-8">
                    <input class="input searchNote"
                        name={query}
                        value={query}
                        type="text"
                        placeholder="Search note..."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown} />
                </div>

                <div className='column is-4 search-icon'>
                    <a href="#" onClick={() => {
                        props.fetchNotes()
                        setQuery('')
                    }}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            color="grey"
                            className="is-pulled-left  "
                        />
                    </a>
                
                </div>
            </div>
        </>
    )
}
export default Search;