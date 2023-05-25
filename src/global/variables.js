const Global = {
  proxy: 'https://blog-website-6r0k.onrender.com',
}

if (process.env.NODE_ENV == 'production'){
  Global.proxy = 'https://blog-website-6r0k.onrender.com'
}
else if (process.env.NODE_ENV == 'development') {
  Global.proxy = 'http://localhost:8000'
}

export default Global;
