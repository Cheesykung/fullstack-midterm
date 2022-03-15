import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import '../styles/postPage.css'
import PostModel from '../model/postModel';
import Post from './post';


export default function UserPage() {
    let params = useParams();
    let id = params.id
    const [userData, setUserData] = useState([])
    const [postData, setData] = useState([])

    function convertToRealDate(dateTime) {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let index = Number.parseInt(dateTime[1]) - 1
        return dateTime[2] + " " + month[index] + " " + dateTime[0]
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=' + id)
                const tagRaw = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/tags')
                const userRaw = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/users/' + id)

                let tagList = tagRaw.data
                let user = userRaw.data

                let data = []
                response.data.forEach(element => {
                    let rawDate = element.date
                    let split = rawDate.split("T")
                    let dmy = split[0].split("-")
                    let realTime = convertToRealDate(dmy) + ", " + split[1]
                    let tagNameList = element.tags.map(value => {
                        for (let i = 0; i < 3; i++) {
                            if (tagList[i].id === value) {
                                return {
                                    "id": tagList[i].id,
                                    "name": tagList[i].name
                                }
                            }
                        }
                    })

                    data.push(new PostModel(
                        element.id,
                        realTime,
                        element.title.rendered,
                        user,
                        tagNameList,
                        element.categories,
                        element.content.rendered
                    ))
                });

                console.log(data)

                setUserData(user)
                setData(data)
            } catch (error) {
                console.error(error);
                return null
            }
        }

        getData().catch(console.error)
    }, [])

    const UserCard = (data) => {
        let user = data.user

        return (
            <div style={{ padding: "1em" }} className='container'>
                <div className="card">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48"></figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{user.name}</p>
                                <p className="subtitle is-6">@{user.slug}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Post data={postData} />
            </div>
        )
    }

    return (
        <UserCard user={userData} />
    )
}