import React from 'react'

function Table({props}) {
    const item = props.map((prop) => JSON.stringify(prop, null, 2))
    const listItems = item.map((item) => 
    <li><pre>{item}</pre><hr></hr></li>
    );
    
    return (
        <div className="table-wrapper">
            <ul>
                {listItems}
            </ul>
        </div>
    )
}

export default Table
