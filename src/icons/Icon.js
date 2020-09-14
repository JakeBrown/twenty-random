import React, { useState, useEffect } from 'react'
import { icon } from '@fortawesome/fontawesome-svg-core'

function Icon({ name, size, color }) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let i = icon(
      { prefix: 'fas', iconName: name },
      {
        classes: [],
        styles: { color: color, width: size, height: size },
      },
    )
    setHtml(i.html)
  }, [name, size, color])
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Icon
