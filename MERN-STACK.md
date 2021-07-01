##### React Shopping Cart #####
# Run project
- Frontend yarn start
- Backend nodemon server.js
- Start MongoDB Compass (check db collection -> orders, products, users)

### Back-end ###

# Database with MongoDB Compass
- Database name : react-shopping-cart-db
- Collection name : orders, products, users

Create backend folder
Package.json
- npm init  -y

Dependencies
express
- npm install express
body-parser
- is not work!
- npm install body-parser
cors
- npm install cors
formidable
- npm install formidable
mongoose
- npm install mongoose@5.11.15 
fs extra
- npm install fs-extra
bcrypt (hash data)
- npm install bcrypt

Tools
nodemon
- npm install -g nodemon

### Front-end ###  
Install React
- npx create-react-app react-shopping-cart

-> Dependencies
react router dom 
- npm install react-router-dom
ใช้ในการเปลี่ยนหน้า route ต่างๆ

axios Promise based HTTP client for the browser and node.js
- npm install axios
ใช้ในการยิง api บนหลังบ้าน fetch ข้อมูลมา

url join
- npm install url-join
ใช้ในการเชื่อมต่อ path ในการทำ http interceptor ไฟล์ HttpClient

redux
- npm install redux
ใช้ในการจัดการ redux ui -> action -> recuder -> store

react redux
- npm install react-redux
ใช้ในการสร้าง store เก็บข้อมูล 

redux logger
npm install redux-logger
ใช้ในการดู logger state

Material-UI
material core
- npm install @material-ui/core
// with npm
material svg icons
- npm install @material-ui/icons
alert ui/lab
- npm install @material-ui/lab
add to index.html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

Material-Table
- npm install material-table
จัดการ table

Formik
- npm install formik --save
- formik-material-ui
จัดการฟอร์ม

จัดการฟอร์ม login register edit product 








