import React from 'react';
import { Link } from "react-router-dom";


function Post(props) {
    function TagList(tags) {
        let tag = tags.tag
        let rendered = tag.map((element, index) => {
            return (
                <a key={index} className='p-1'>#{element.name}</a>
            )
        })

        return rendered
    }

    function CardList(raw) {
        const data = raw.data
        let card = data.map((item) => {
            return (
                <Link key={item.id} to={`/post/${item.id}`}>
                    <div className="card m-4">
                        <div className="card-image">
                            <figure className="image">
                                <h1 className='card-header-title'>{item.title}</h1>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <div className="columns">
                                        <TagList tag={item.tags}></TagList>
                                    </div>
                                    <p className="title"><Link to={`/user/${item.author.id}`}>Author: {item.author.name}</Link></p>
                                    <p className="subtitle is-6">on {item.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            )
        })

        return card
    }

    return (
        <CardList data={props.data} />
    )
}

export default Post;
