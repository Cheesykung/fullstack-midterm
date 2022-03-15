import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import '../styles/postPage.css'


export default function PostPage() {
  let params = useParams();
  let id = params.id
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [comment, setComment] = useState([])
  const [commenterName, setCommenterName] = useState("")
  const [commenterMessage, setCommenterMessage] = useState("")
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts/' + id)
        const commentRaw = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=' + id)

        setContent(response.data.content.rendered)
        setTitle(response.data.title.rendered)
        setComment(commentRaw.data)
      } catch (error) {
        console.error(error);
        return null
      }
    }
    getData().catch(console.error)
  }, [reload])

  function CommentsCards(data) {
    let commentList = data.comment
    let comments = commentList.map(element => {
      return (
        <div key={element.id} className="card mt-4">
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48"></figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{element.author_name}</p>
                <div dangerouslySetInnerHTML={{ __html: element.content.rendered }} />
              </div>
            </div>
          </div>
        </div>
      )
    })

    return comments
  }

  async function submit() {
    let name = commenterName
    let message = commenterMessage

    const headers = {
      'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw=='
    }

    let payload = {
      "author_name": name,
      "content": `<p>${message}</p>`,
      "post": id,
      "date": new Date()
    }

    await axios.post('https://fswd-wp.devnss.com/wp-json/wp/v2/comments/', payload, {
      headers: headers
    }).then((res) => {
      // console.log(res.status)
    }).catch((error) => {
      console.log(error)
    })

    setReload(!reload)
    setCommenterMessage("")
    setCommenterName("")
  }

  return (
    <div className='container' style={{ padding: "1rem 0" }}>
      <div className='title is-size-1 has-text-centered' style={{ color: "white" }}  >{title}</div>
      <div className='has-text-centered' dangerouslySetInnerHTML={{ __html: content }} />
      <hr />
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            Leave Your Comment
          </p>
        </header>
        <div className="card-content">
          <div className="content">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input onChange={(e) => {
                  setCommenterName(e.target.value)
                }} className="input" type="text" placeholder="Your name" value={commenterName} />
              </div>
            </div>

            <div className="field">
              <label className="label">Comment</label>
              <div className="control">
                <textarea onChange={(e) => setCommenterMessage(e.target.value)} className="textarea" placeholder="Write your comment" value={commenterMessage} />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button onClick={() => submit()} className="button is-link">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 style={{ color: "white" }} className='title has-text-centered mt-6'> Other Comment </h1>
      <CommentsCards comment={comment} />
    </div>
  );
}