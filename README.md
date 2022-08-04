#Link Previewer By Monu Shaw
Made With pupeteer and cherio.
##Exclusive made Findcoder.io Challenge 
challenge link (https://www.findcoder.io/challenges)

##How To use 
npm i monu-linkpreview \n

import getLinkPreview from 'monu-linkpreview';
import React, {useState, useEffect} from 'react'


export default function Heading() {
  const [link, setLink] = useState([]);
  useEffect(()=>{
    getLinkPreview('https://webscraper.io/test-sites').then(res=>setLink(res));
  },[])
  return (

  )
}

##Demo Here