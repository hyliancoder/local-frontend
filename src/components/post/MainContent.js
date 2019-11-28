import React from 'react'

export default function MainContent(props) {
  return (
    <div className="postContainer">
      <p>{props.content}</p>
      <div className="post-img">
        <img className="postImage" alt="postImage" src={props.image} />
      </div>
    </div>
  )
}
