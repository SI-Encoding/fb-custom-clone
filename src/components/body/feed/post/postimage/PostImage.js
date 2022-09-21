import React from 'react'

export default function PostImage({image}) {
  return (
    <div className="post_image">
        <img src={image} />
    </div>
  )
}
