//render.js
const axios = require('axios');

exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        });
};

exports.add_user = (req, res) => {
    res.render("add_user");
};

exports.update_user = (req, res) => {
    const userId = req.query.id || req.params.id;
    axios.get(`http://localhost:3000/api/users/${userId}`)
        .then(response => {
            res.render("update_user", { user: response.data });
        })
        .catch(err => {
            res.send(err);
        });
};

exports.update_user_post = (req, res) => {
    const userId = req.body.id;
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        meterNumber: req.body.meter,
        location: req.body.location
    };

    axios.put(`http://localhost:3000/api/users/${userId}`, updatedUserData)
        .then(response => {
            console.log('User updated successfully:', response.data);
            res.redirect('/');
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).send('Error updating user');
        });
};
