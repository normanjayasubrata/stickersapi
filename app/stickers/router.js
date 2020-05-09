const {Router} = require("express");
const passport = require("../../config/passport");

const router =  new Router();

const Sticker = require("./")
const queries = require("./query");

//validation
const validateId = (req, res, next) => {
    if (!isNaN(req.params.id)) {
        next();
    } else {
        next(new Error("Not Valid Params"));
    }
}

//router api
router.get("/", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    queries.read().then(result => {
        res.json(result)
    })
    .catch(error => next(error))
})

router.get("/:id", validateId, passport.authenticate("jwt", {session: false}), (req, res, next) => {
    queries.read(req.params).then(([result]) => {
        if (result) {
            res.json(result)
        } else {
            next(new Error("Not Found"))
        }
    })
    .catch(error => next(error))
})

router.post("/", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    const sticker = new Sticker(req.body)
    if (sticker.validate()) {
        queries.create(sticker)
        .then(([result]) => res.json(result))
        .catch(error => next(error))
    } else {
        next(new Error("Sticker not Valid"))
    }
})

router.put("/:id", validateId, passport.authenticate("jwt", {session: false}), (req, res, next) => {
    const sticker = new Sticker(req.body)
    const {id} = req.params;
    if (sticker.validate()) {
        queries.update(id, sticker)
        .then(([result]) => {
            if (result) {
                res.json(result)
            } else {
             next(new Error("Not Found"))
            }
        })
        .catch(error => next(error))
    } else {
        next(new Error("Sticker not Valid"))
    }
})

router.delete("/:id", validateId, passport.authenticate("jwt", {session: false}), (req, res, next) => {
    queries.delete(req.params.id)
    .then(rowCount => {
        if (rowCount !== 0) {
            res.json({deleted: true})
        } else {
            next(new Error("Sticker not Found"))
        }
        // res.json({message: `id ${req.params.id} is deleted`})
    })
    .catch(error => next(error))
})


module.exports = router