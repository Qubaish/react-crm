const Router = require('express').Router;
const router = Router();
const { validateLeadInput} = require('../validator');
const Lead = require("../models/Lead");

router.post("/", function(req, res) {
    const { errors, isValid } = validateLeadInput(req.body);
    if (!isValid) {
        return res.status(200).json({...errors, err: true});
    }

    const newLead = new Lead({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        userId: req.body.user,
    });
    newLead
        .save()
        .then(lead => res.json(lead))
        .catch(err => console.log(err));
});

router.get("/:id", function(req, res) {
    Lead.find({userId: req.params.id}, function(err, leads) {
        if (err) {
            res.status(500).json({err: true})
        }
        res.status(200).json({err: false, leads: leads});
     });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Lead.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500).json({err: true})
        }
        res.status(200).json({err: false, msg: 'success'});
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const query = {_id: id};
    Lead.findOneAndUpdate(query, req.body, function(err, doc) {
        if (err) return res.send(500, {error: err});
            res.status(200).json({err: false, msg: 'success'});
    });
});

module.exports = router;
