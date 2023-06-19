// const PORT = process.env.PORT ? ? 8000
// const express = require('express')
// const {
//    v4: uuidv4
// } = require('uuid')
// const cors = require('cors')
// const app = express()
// const pool = require('./db')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// app.use(cors())
// app.use(express.json())

// //get all todos
// app.get('/todos/:userEmail', async (req, res) => {

//    const {
//       userEmail
//    } = req.params
//    console.log(userEmail)
//    try {
//       const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1 ', [userEmail])
//       res.json(todos.rows)
//    } catch (err) {
//       console.log(err)
//    }
// })

// // Get todos where condition
// app.get('/todos/:userEmail/:condition', async (req, res) => {
//    const {
//       userEmail,
//       condition
//    } = req.params;
//    console.log(userEmail);
//    try {
//       const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1 AND condition = $2', [userEmail, condition]);
//       res.json(todos.rows);
//    } catch (err) {
//       console.log(err);
//    }
// });

// // create a new todo
// // app.post('/todos', async (req,res) => {
// //    const {user_email,title,progress,date}= req.body
// //    console.log(user_email,title,progress,date)
// //    const id = uuidv4();
// //    try{
// //   const newTodo= await pool.query('INSERT INTO todos(id, user_email,title,progress,date)VALUES($1,$2,$3,$4,$5)',
// //   [id,user_email,title,progress,date])
// //   res.json(newTodo);
// // }catch (err){
// //    console.error(err)
// // }
// // })

// app.post('/todos', async (req, res) => {
//    const {
//       user_email,
//       title,
//       progress,
//       condition,
//       date
//    } = req.body;
//    console.log(user_email, title, progress, condition, date);
//    const id = uuidv4();
//    try {
//       const newTodo = await pool.query('INSERT INTO todos (id, user_email, title, progress, condition, date) VALUES ($1, $2, $3, $4, $5, $6)',
//          [id, user_email, title, progress, condition, date]);
//       res.json(newTodo);
//    } catch (err) {
//       console.error(err);
//    }
// });


// // edit a todo
// // app.put('/todos/:id', async (req, res) => {
// //   const { id } = req.params;
// //   const { user_email, title, progress, condition, date } = req.body;
// //   console.log(user_email, title, progress, condition, date);
// //   try {
// //     const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, condition = $4, date = $5 WHERE id = $6;',
// //       [user_email, title, progress, condition, date, id]);
// //     res.json(editTodo);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // });

// // edit a todo
// app.put('/todos/:id', async (req, res) => {
//    const {
//       id
//    } = req.params;
//    const {
//       user_email,
//       title,
//       progress,
//       condition,
//       date
//    } = req.body;
//    console.log(user_email, title, progress, condition, date);
//    try {
//       const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, condition = $4, date = $5 WHERE id = $6;',
//          [user_email, title, progress, condition, date, id]);
//       res.json(editTodo);
//    } catch (err) {
//       console.error(err);
//    }
// });

// // DELETE a todo
// app.delete('/todos/:id', async (req, res) => {
//    const {
//       id
//    } = req.params;
//    try {
//       const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1;', [id])
//       res.json(deleteTodo);
//    } catch (err) {
//       console.error(err)
//    }

// })


// // signup
// app.post('/signup', async (req, res) => {
//    const {
//       email,
//       password
//    } = req.body
//    const salt = bcrypt.genSaltSync(10)
//    const hashedPassword = bcrypt.hashSync(password, salt)
//    try {
//       const signUp = await pool.query('INSERT INTO users (email,hashed_password) VALUES ($1, $2)',
//          [email, hashedPassword])
//       const token = jwt.sign({
//          email
//       }, 'secret', {
//          expiresIn: '1hr'
//       })
//       res.json({
//          email,
//          token
//       })

//    } catch (err) {
//       console.error(err)
//       if (err) {
//          res.json({
//             detail: err.detail
//          })
//       }
//    }
// })


// // login
// app.post('/login', async (req, res) => {
//    const {
//       email,
//       password
//    } = req.body
//    try {
//       const users = await pool.query('SELECT * FROM users WHERE email=$1', [email])
//       if (!users.rows.length) return res.json({
//          detail: 'User does not exist!'
//       })

//       const success = await bcrypt.compare(password, users.rows[0].hashed_password)
//       const token = jwt.sign({
//          email
//       }, 'secret', {
//          expiresIn: '1hr'
//       })
//       if (success) {
//          res.json({
//             'email': users.rows[0].email,
//             token
//          })
//       } else {
//          res.json({
//             detail: 'Invalid details!'
//          })
//       }

//    } catch (err) {
//       console.error(err)
//    }
// })



// app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

const PORT = process.env.PORT || 8000;
const express = require('express');
const {
   v4: uuidv4
} = require('uuid');
const cors = require('cors');
const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos/:userEmail', async (req, res) => {
   const {
      userEmail
   } = req.params;
   console.log(userEmail);
   try {
      const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail]);
      res.json(todos.rows);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

// Get todos with condition
app.get('/todos/:userEmail/:condition', async (req, res) => {
   const {
      userEmail,
      condition
   } = req.params;
   console.log(userEmail);
   try {
      const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1 AND condition = $2', [userEmail, condition]);
      res.json(todos.rows);
   } catch (err) {
      console.log(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

// Create a new todo
app.post('/todos', async (req, res) => {
   const {
      user_email,
      title,
      progress,
      condition,
      date
   } = req.body;
   console.log(user_email, title, progress, condition, date);
   const id = uuidv4();
   try {
      const newTodo = await pool.query('INSERT INTO todos (id, user_email, title, progress, condition, date) VALUES ($1, $2, $3, $4, $5, $6)',
         [id, user_email, title, progress, condition, date]);
      res.json(newTodo);
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

// Edit a todo
app.put('/todos/:id', async (req, res) => {
   const {
      id
   } = req.params;
   const {
      user_email,
      title,
      progress,
      condition,
      date
   } = req.body;
   console.log(user_email, title, progress, condition, date);
   try {
      const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, condition = $4, date = $5 WHERE id = $6',
         [user_email, title, progress, condition, date, id]);
      res.json(editTodo);
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
   const {
      id
   } = req.params;
   try {
      const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
      res.json(deleteTodo);
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

// Signup
app.post('/signup', async (req, res) => {
   const {
      email,
      password
   } = req.body;
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(password, salt);
   try {
      const signUp = await pool.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2)', [email, hashedPassword]);
      const token = jwt.sign({
         email
      }, 'secret', {
         expiresIn: '1hr'
      });
      res.json({
         email,
         token
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

// Login
app.post('/login', async (req, res) => {
   const {
      email,
      password
   } = req.body;
   try {
      const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (!users.rows.length) return res.json({
         detail: 'User does not exist!'
      });

      const success = await bcrypt.compare(password, users.rows[0].hashed_password);
      const token = jwt.sign({
         email
      }, 'secret', {
         expiresIn: '1hr'
      });
      if (success) {
         res.json({
            email: users.rows[0].email,
            token
         });
      } else {
         res.json({
            detail: 'Invalid details!'
         });
      }
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: 'Internal server error'
      });
   }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));