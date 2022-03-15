import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='container'>
            <div style={{ height: "40vmin" }}></div>
            <div className="card">
                <div className="card-content">
                    <div className="content has-text-centered">
                        Welcome
                    </div>
                    <div className="content has-text-centered">
                        <Link to={`/posts/`}><button className="button is-link">Let's go</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}