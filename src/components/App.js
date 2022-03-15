import React, { useEffect, useState } from 'react';
import Post from './post';
import Filter from './filter';
import '../styles/App.css';
import axios from 'axios'
import PostModel from "../model/postModel"
import { Data } from "../model/samplePost"

function App() {
  const [postData, setData] = useState(Data)
  const [tag, setTag] = useState([])
  const [category, setCategory] = useState([])
  const [backup, setBackup] = useState([])
  const [isOn, setOn] = useState("OFF")

  function changeTag(filter) {
    let filtered = backup.filter(element => {
      for (let i = 0; i<element.tags.length; i++) {
        if (element.tags[i].id === filter.id) {
          setOn(element.tags[i].name)
          return element
        }
      }
    })
    setData(filtered)
  }

  function changeCate(filter) {
    let filtered = backup.filter(element => {
      for (let i = 0; i<element.categories.length; i++) {
        if (element.categories[i] === filter.id) {
          setOn(filter.name)
          return element
        }
      }
    })

    setData(filtered)
  }

  function clearFilter() {
    setData(backup)
    setOn("OFF")
  }

  function convertToRealDate(dateTime) {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let index = Number.parseInt(dateTime[1]) - 1
    return dateTime[2] + " " + month[index] + " " + dateTime[0]
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
        const tagRaw = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/tags')
        const categoriesRaw = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/categories')
        const userRaw = await axios.get('https://fswd-wp.devnss.com/wp-json/wp/v2/users')

        let tagList = tagRaw.data
        let categoriesList = categoriesRaw.data
        let userList = userRaw.data

        let data = []
        response.data.forEach(element => {
          let rawDate = element.date
          let split = rawDate.split("T")
          let dmy = split[0].split("-")
          let realTime = convertToRealDate(dmy) + ", " + split[1]
          let tagNameList = element.tags.map(value => {
            for (let i = 0; i<3; i++) {
              if (tagList[i].id === value) {
                return {
                  "id" : tagList[i].id,
                  "name" : tagList[i].name
                }
              }
            }
          })

          let user = userList.filter(user => {
            if (user.id === element.author) {
              return user
            }
          })

          data.push(new PostModel(
            element.id,
            realTime,
            element.title.rendered,
            user[0],
            tagNameList,
            element.categories,
            element.content.rendered
          ))
        });
        setData(data)
        setBackup(data)
        setTag(tagList)
        setCategory(categoriesList)
      } catch (error) {
        console.error(error);
        return null
      }
    }

    getData().catch(console.error)
  }, [])

  return (
    <div className="App-body">
      <div className='columns'>
        <div className='column is-2'>
          <Filter isOn={isOn} changeTag={changeTag} changeCate={changeCate} clear={clearFilter} tag={tag} categories={category} />
        </div>
        <div className='column'>
          <Post data={postData} />
        </div>
      </div>
    </div>
  );
}

export default App;