/**
 * @param  {Object} app
 */
initIndex = (app, con, io, moment) => {
  let users = [];

  app.get('/', (req, res) => {
    return res.render('index', {
      titles: 'Accueil',
      message: 'Porte folio',
    });
  });

  app.get('/login', (req, res) => {
    if (req.session.connected) return res.redirect('home_worldchat');
    return res.render('users/login', {
      titles: 'Login',
      info: 'Connectez-vous',
    });
  });

  app.get('/login_tictactoe', (req, res) => {
    if (req.session.connected) return res.redirect('home_tictactoe');
    return res.render('users/login_tictactoe', {
      titles: 'Login',
      info: 'Connectez-vous',
    });
  });

  app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let search = 'SELECT * FROM users WHERE username = ? AND password = ?';
    con.query(search, [username, password], (err, result, fields) => {
      if (err) throw err;
      if (result.length != 0) {
        req.session.connected = true;
        req.session.id_user = result[0].id_user;
        req.session.mail_users = result[0].mail_users;
        req.session.username = username;
        req.session.account_type = result[0].role;
        req.session.img_url = result[0].img_url;

        return res.send({
          username: username,
          success: true,
        });
      }
      return res.send({
        success: false,
      });
    });
  });

  app.get('/logout', (req, res) => {
    if (!req.session.connected) {
      return res.render('users/login', {
        message: 'Connectez-vous',
      });
    }
    let userCon = users.find((userInfo) => userInfo.id_user === req.session.id_user);
    if (userCon) {
      users.splice(users.indexOf({
        username: req.session.username,
        id_user: req.session.id_user,
      }), 1);
      io.sockets.emit('remove user', users);
    }
    req.session.destroy((err) => {
      if (err) throw err;
      return res.render('users/login', {
        message: 'Bienvenue',
      });
    });
  });

  app.get('/logout_tictactoe', (req, res) => {
    if (!req.session.connected) {
      return res.render('users/login_tictactoe', {
        message: 'Connectez-vous',
      });
    }
    let userCon = users.find((userInfo) => userInfo.id_user === req.session.id_user);
    if (userCon) {
      users.splice(users.indexOf({
        username: req.session.username,
        id_user: req.session.id_user,
      }), 1);
      io.sockets.emit('remove user', users);
    }
    req.session.destroy((err) => {
      if (err) throw err;
      return res.render('users/login_tictactoe', {
        message: 'Bienvenue',
      });
    });
  });

  app.get('/signup', (req, res) => {
    res.render('users/signup', {
      message: 'Bienvenue',
    });
  });


  app.get('/signup_tictactoe', (req, res) => {
    res.render('users/signup_tictactoe', {
      message: 'Bienvenue',
    });
  });

  app.post('/signup', (req, res) => {
    let mail = req.body.mail;
    let username = req.body.username;
    let password = req.body.password;
    let accountType = 0;
    let imgUrl = 'https://img-19.ccm2.net/nk1eHVlqfdoTvhQItQ2WE6Jbj70=/91a1e9868ec347bcb203ca1a63034cb6/ccm-ugc/efa5cf51c0711fafc61e73f90e05bc12-s-.png';
    let search = 'SELECT username, mail_users FROM users WHERE username = ? AND mail_users = ?';
    con.query(search, [username, mail], (err, result) => {
      console.log('result start:', result);

      if (err) throw err;
      if (result.length == 0) {
        console.log('result: true', result);

        let sql = 'INSERT INTO users(username, mail_users, password, account_type, img_url) VALUES(?,?,?,?,?)';
        con.query(sql, [username, mail, password, accountType, imgUrl], (err, result) => {
          if (err) throw err;
          return res.send({
            username: result.username,
            image: result.img_url,
            success: true,
            message: 'Utilisateur crée !',
          });
        });
      } else {
        return res.send({
          username: username,
          success: false,
          message: 'Utilisateur/Mail déjà existant.',
        });
      }
    });
  });

  app.get('/worldchat_home', (req, res) => {
    if (!req.session.connected) return res.redirect('/login');
    return res.render('home_worldchat', {
      message: 'Bonjour',
      username: req.session.username,
      id_user: req.session.id_user,
      image: req.session.img_url,
    });
  });


  app.get('/worldchat', (req, res) => {
    if (!req.session.connected) return res.redirect('/login');
    return res.render('worldChat', {
      message: 'hello',
      username: req.session.username,
      id_user: req.session.id_user,
      image: req.session.img_url,
    });
  });

  app.get('/worldchat/getMessages', (req, res) => {
    let search = 'SELECT *, u.img_url FROM messages m, users u WHERE m.id_user=u.id_user LIMIT 30';

    let userCon = users.find((userInfo) => userInfo.id_user === req.session.id_user);

    if (!userCon) {
      users.push({
        username: req.session.username,
        id_user: req.session.id_user,
        img_url: req.session.img_url,
      });

      io.sockets.emit('add user', users);
    } else {
      io.sockets.emit('add user', users);
    }

    con.query(search, (err, result, fields) => {
      if (err) throw err;
      if (result.length != 0) {
        let messages = [];
        let date;

        for (let i = 0; i < result.length; i++) {
          date = moment(result[i].created_at).format('D MMM YY HH:mm');

          messages.push({
            username: result[i].username,
            message: result[i].message,
            created_at: date,
            id_user: result[i].id_user,
            id_message: result[i].id_message,
            img_url: result[i].img_url,
          });
        }

        return res.send({messages});
      } else {
        return res.send({});
      }
    });
  });

  app.post('/worldchat/sendMessage', (req, res) => {
    let message = req.body.message;
    let id_user = req.session.id_user;


    let search = 'INSERT INTO messages(id_user, message, created_at) VALUES(?,?,NOW())';
    con.query(search, [id_user, message], (err, result, fields) => {
      if (err) throw err;

      io.sockets.emit('echo', {
        message: message,
        id_message: result.insertId,
        username: req.session.username,
        created_at: moment().format('D MMM YY HH:mm'),
        id_user: id_user,
        img_url: req.session.img_url,
      });

      return res.send({
        success: true,
        content: message,
      });
    });
  });

  app.get('/tictactoe', (req, res) => {
    if (!req.session.connected) return res.redirect('/login_tictactoe');
    return res.render('home_tictactoe', {
      message: 'Bonjour',
      username: req.session.username,
      id_user: req.session.id_user,
      image: req.session.img_url,
    });
  });

  app.get('/tictactoe-game', (req, res) => {
    if (!req.session.connected) return res.redirect('/login_tictactoe');
    return res.render('tictactoe', {
      message: 'Bonjour',
      username: req.session.username,
      id_user: req.session.id_user,
      image: req.session.img_url,
    });
  });

  app.get('/profil_tictactoe', (req, res) => {
    if (!req.session.connected) {
      return res.render('users/login_tictactoe', {
        titles: 'Profil',
        message: 'Bienvenue',
      });
    }
    return res.render('users/profil_tictactoe', {
      message: 'Profil',
      image: req.session.img_url,
      username: req.session.username,
      mail: req.session.mail_users,
    });
  });

  app.get('/profil', (req, res) => {
    if (!req.session.connected) {
      return res.render('users/login', {
        titles: 'Profil',
        message: 'Bienvenue',
      });
    }
    return res.render('users/profil', {
      message: 'Profil',
      image: req.session.img_url,
      username: req.session.username,
      mail: req.session.mail_users,
    });
  });

  app.post('/getInfo', (req, res) => {
    return res.send([
      {
        id: 1,
        date: new Date,
        nom: 'Ticket 1'
      },
      {
        id: 2,
        date: new Date,
        nom: 'Ticket 2'
      },
      {
        id: 3,
        date: new Date,
        nom: 'Ticket 3'
      },
      {
        id: 4,
        date: new Date,
        nom: 'Ticket 4'
      },
      {
        id: 5,
        date: new Date,
        nom: 'Ticket 5'
      }
    ]);
  })
};

module.exports = initIndex;
