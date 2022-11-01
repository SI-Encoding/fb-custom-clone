import React from 'react'

export default function PostImage({image, sharedFrom, link, openInNewTab}) {
  return (
    <div className="post_image">
        <img className={sharedFrom !== undefined ? 'post_shared_from' : ''} src={image} onClick={sharedFrom !== undefined ? () => openInNewTab(link) : undefined}/>
    </div>
  )
}