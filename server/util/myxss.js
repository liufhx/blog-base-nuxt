const xss =require('xss')

const options={
  whiteList:{
    ...xss.whiteList,
    xmp:[],
    h1: ['style', 'class'],
    h2: ['style', 'class'],
    h3: ['style', 'class'],
    h4: ['style', 'class'],
    h5: ['style', 'class'],
    h6: ['style', 'class'],
    hr: ['style', 'class'],
    span: ['style', 'class'],
    strong: ['style', 'class'],
    b: ['style', 'class'],
    i: ['style', 'class'],
    br: [],
    p: ['style', 'class'],
    pre: ['style', 'class'],
    code: ['style', 'class'],
    a: ['style', 'class', 'target', 'href', 'title', 'rel'],
    img: ['style', 'class', 'src', 'alt', 'title'],
    div: ['style', 'class'],
    table: ['style', 'class', 'width', 'border'],
    tr: ['style', 'class'],
    td: ['style', 'class', 'width', 'colspan'],
    th: ['style', 'class', 'width', 'colspan'],
    tbody: ['style', 'class'],
    ul: ['style', 'class'],
    li: ['style', 'class'],
    ol: ['style', 'class'],
    dl: ['style', 'class'],
    dt: ['style', 'class'],
    em: ['style'],
    //      cite: ['style'],
    //      section: ['style', 'class'],
    //      header: ['style', 'class'],
    //      footer: ['style', 'class'],
    // blockquote: ['style', 'class'],
    //      audio: ['autoplay', 'controls', 'loop', 'preload', 'src'],
    //      video: ['autoplay', 'controls', 'loop', 'preload', 'src', 'height', 'width']

  }
}
const myxss=new xss.FilterXSS(options)

module.exports=myxss