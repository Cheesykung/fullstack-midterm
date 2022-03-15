import React from 'react';

function Filter(props) {
    function TagsList(tag) {
        let x = tag.tag.map(element => {
            return (
                <li onClick={() => props.changeTag(element)} key={element.id}><a id='tagItem' style={{ color: "white" }}>{element.name}</a></li>
            )
        })

        return x
    }

    function CategoriesList(categories) {
        let x = categories.categories.map(element => {
            return (
                <li onClick={(e) => props.changeCate(element)} key={element.id}><a id='tagItem' style={{ color: "white" }}>{element.name}</a></li>
            )
        })

        return x
    }

    return (
        <aside id='filterMenu' className="menu">
            <p style={{ fontSize: "2em", fontWeight: "bold" }} className="menu-label ">
                Filter: <p style={{ color: "white" }}>{props.isOn}</p> 
            </p>
            <p style={{ fontSize: "2em", fontWeight: "bold" }} className="menu-label ">
                tag
            </p>
            <ul className="menu-list">
                <TagsList tag={props.tag} />
            </ul>
            <p style={{ fontSize: "2em", fontWeight: "bold" }} className="menu-label ">
                categories
            </p>
            <ul className="menu-list">
                <CategoriesList categories={props.categories} />
            </ul>
            <p style={{ fontSize: "2em", fontWeight: "bold" }} className="menu-label ">
                tools
            </p>
            <ul className="menu-list">
                <li onClick={(e) => props.clear()} key="clear"><a id='tagItem' style={{ color: "white" }}>clear filter</a></li>
            </ul>
        </aside>
    )
}

export default Filter