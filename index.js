const express = require('express');
const multer = require('multer')
const path = require('path')
require('dotenv').config();
const cors = require('cors');
const { checkSchema } = require('express-validator');
const app = express();
const configDB = require('./app/config/db');
const userCltr = require('./app/controller/user-controller');
const commentCltr = require('./app/controller/comment-controller')
const { registerSchema, loginSchema } = require('./app/validations/user-validation');
const { commentSchema } = require('./app/validations/comment-validation')
const postCltr = require('./app/controller/post-controller')
const { postSchema } = require('./app/validations/post-validation')
const { authenticateUser } = require('./app/middleware/auth');
const staticpath = path.join(__dirname,'/images')
app.use('/images',express.static(staticpath))
configDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the site');
});

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.post('/api/users/register', upload.single('profileImage'), checkSchema(registerSchema), userCltr.register);
app.post('/api/users/login', checkSchema(loginSchema), userCltr.login);
app.get('/api/users/profile', authenticateUser, userCltr.profile);
app.put('/api/users/profile', authenticateUser, userCltr.profileUpdate);
app.get('/api/posts/myposts',authenticateUser,checkSchema(postSchema),postCltr.getMyPosts)

app.post('/api/posts',authenticateUser,checkSchema(postSchema),postCltr.create)
app.post('/api/posts/:postId/comments',authenticateUser,commentCltr.create)
app.get('/api/posts/:postId/comments',commentCltr.retrieve) //check this
app.put('/api/posts/:postId/comments/:commentId',authenticateUser,commentCltr.update)
app.get('/api/posts',checkSchema(postSchema),postCltr.retrieve)
app.get('/api/posts/:id',checkSchema(postSchema),postCltr.retrieveOne)
app.put('/api/posts/:id',authenticateUser,checkSchema(postSchema),postCltr.update)
app.delete('/api/posts/:id',authenticateUser,checkSchema(postSchema),postCltr.delete)
app.delete('/api/posts/:postId/comments/:commentId',authenticateUser,commentCltr.delete)

const PORT = 3059;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
