const {Router} = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../../config/passport");

const router = new Router();

const queries = require("./query");
const Account = require("./index")


router.get("/", (req, res, next) => {
    queries.readAll()
    .then(accounts => res.json(accounts))
    .catch(error => next(error))
})

router.post("/register", (req, res, next) => {
    const account = new Account(req.body);
    if (account.validate()) {
        queries.readByEmail(account.email)
        .then(result => {
            if (!result) {
                bcrypt.hash(account.password, 10).then(hash => {
                    account.password = hash;
                    queries.create(account)
                    .then(response => res.json(response))
                    .catch(error => next(error))
                }).catch(err => next(err))
            } else {
                next(new Error("Email Already Registered"))
            }
        })
        .catch(error => next(error))
    } else {
        next(new Error("Form not Complete"))
    }
})

router.post("/login", (req, res, next) => {
    const account = new Account(req.body)
    if (account.login()) {
        queries.readByEmail(account.email)
        .then(result => {
            if (result) {
                bcrypt.compare(account.password, result.password)
                .then(match => {
                    if (match) {
                        const payload = {id: result.id, username: result.username}
                        const token = jwt.sign(payload, process.env.SECRET_OR_KEY)
                        res.json({token})
                    } else {
                        // res.json({message: "Wrong Password"})
                        next(new Error("Wrong Password"))
                    }
                }).catch(error => next(error))
                
            } else {
                next(new Error("Account Not Found"))
            }
        }).catch(error => next(error))
        
    } else {
        next(new Error("Form not Complete"))
    }
})

router.get("/getprofile", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    const {email, username} = req.user
    res.json({email, username})
})

router.get("/protected", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    res.json({message: "I'm Protected"})
})

module.exports = router;