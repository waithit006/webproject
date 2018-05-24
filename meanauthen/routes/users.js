const express = require('express');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');
const dashboard = require('../models/dashboard');
const post = require('../models/post');
const profile = require('../models/profile');
//Register
var ObjectId = require('mongodb').ObjectID;



router.post('/createprofile', (req, res, next) => {
    let newprofile = new profile(req.body);
    console.log(req.body);

    profile.addProfile(newprofile, (err, profile) => {
        if (err) {
            res.json({
                success: false,
                msg: 'something wrong'
            })
        } else {
            res.json({
                success: true,
                msg: 'เพิ่มเสร็จสิ้น'
            })
        }
    })
})


router.post('/getpostwithid', (req, res, next) => {
    post.find({
        "_id": ObjectId(req.param('postid'))
    }, (err, data) => {
        if (err) throw err;

        res.json({
            post: data
        });
    })
})


router.get('/getprofile', (req, res, next) => {
    profile.findOne({
        "email": req.param('email')
    }, (err, data) => {
        if (err) throw err;

        res.json({
            profile: data
        });



    })
})

router.get('/getprofileimage', (req, res, next) => {
    profile.findOne({
        "email": req.param('email')
    }, (err, data) => {
        if (err) throw err;
        res.json({
            data: data['imageprofile']
        });
    })
})
router.get('/postuser', (req, res, next) => {
    post.find({
        "id_userpost": ObjectId(req.param('id_userpost'))
    }, (err, data) => {
        if (err) throw err;

        res.json({
            post: data
        });
    })
})

router.post('/editprofile', (req, res, next) => {
    let editprofile = new profile(req.body);
    profile.update({
        "email": req.body.email
    }, {
        $set: new profile(req.body)
    }, (err, check) => {
        console.log(req.body);


    });
});

router.post('/post', (req, res, next) => {
    let newPost = new post(req.body);


    post.addPost(newPost, (err, posts) => {
        if (err) {
            res.json({
                success: false,
                msg: 'มีข้อผิดพลาด'
            });
        } else {
            res.json({
                success: true,
                msg: 'โพสต์เสร็จสิ้น'
            })
        }
    })
})


router.post('/comment', (req, res, next) => {
    post.update({
        "_id": ObjectId(req.body.idpost)
    }, {
        $push: {
            comment: {
                name_comment: req.body.namecomment,
                plaintext_comment: req.body.plaintext
            }
        }
    }, function (err, data) {
        if (err) throw error;

        res.json(data);

    })
});



router.get('/readpost', (req, res, next) => {
    post.find({}, (err, post) => {
        if (err)
            res.status(500).json({
                errmsg: err
            });
        res.status(200).json({
            post
        });
    })
});

router.get('/getname', function (req, res) {
    User.findOne({
        "_id": ObjectId(req.param('id'))
    }, function (err, data) {
        if (err) throw err;

        res.json(data);
    })
})

function checkexist(like_by, userid) {
    let check = false;

    like_by.forEach(element => {
        if (userid == element) {
            check = true;
        }
    });
    return check;
}

router.get('/like', function (req, res) {
    post.findOne({
        "_id": ObjectId(req.param('id'))
    }, function (err, data) {
        if (err) throw err;
        console.log(req.param('id'));

        res.json(data);
        // console.log(checkexist(data.like_by,req.param('userid')));

        if (!checkexist(data.like_by, req.param('userid'))) {
            post.updateOne({
                "_id": ObjectId(req.param('id'))
            }, {
                $push: {
                    like_by: req.param('userid')
                }
            }, function (err, data) {
                if (err) throw err;

                console.log(data);

            })
        } else {
            post.updateOne({
                "_id": ObjectId(req.param('id'))
            }, {
                $pull: {
                    like_by: req.param('userid')
                }
            }, function (err, data) {
                if (err) throw err;

                console.log(data);

            })
        }

    })


})

function getdate() {
    var date = new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '');
    return date;
}

router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password
    });


    User.addUser(newUser, (err, count) => {

        if (count > 0) {
            res.json({
                success: false,
                msg: 'อีเมล์ถูกใช้งานไปแล้ว'
            });
        } else {
            res.json({
                success: true,
                msg: 'สมัครสมาชิกเสร็จสิ้น'
            })
        }
    })
});




router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
    res.json({
        user: req.user
    });
});



router.post('/authenticate', (req, res, next) => {
    const username = req.body.email;
    const password = req.body.password;

    User.updateOne({
        "email": username
    }, {
        $push: {
            Historylogin: new Date()
        }
    }, function (err, data) {
        if (err) throw err;
    })
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        console.log(user);

        if (!user) {

            return res.json({
                success: false,
                msg: 'อีเมล์หรือรหัสผ่านไม่ถูกต้อง'
            })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                return res.json({
                    success: false,
                    msg: 'รหัสผ่านผิด'
                })
            }
        });
    })
});
module.exports = router;