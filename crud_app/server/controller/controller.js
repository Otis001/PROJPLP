//controller.js
const Userdb = require('../model/model.js');

// Create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        meterNumber: req.body.meterNumber,
        location: req.body.location
    });

    user.save()
        .then(data => {
            res.redirect('/add-user');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user."
            });
        });
};

// Retrieve and return all users or a single user by ID
exports.find = (req, res) => {
    if (req.params.id) {
        const id = req.params.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found User with id " + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving User with id=" + id });
            });
    } else {
        Userdb.find()
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    }
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty!" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update User with id=${id}. Maybe User was not found!` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating User information" });
        });
};


// Delete a user with the specified ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete User with id=${id}. Maybe User was not found!` });
            } else {
                res.send({ message: "User was deleted successfully!" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};
