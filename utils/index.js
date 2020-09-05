exports.verifyAdmin = function (req, res, next) {
    if(req.user) {
        const isAdmin = req.user.isAdmin
        if(!isAdmin) {
        let err = new Error('You are not authorized!');
            err.status = 401;
            return next(err);
        } else {
            return next();
        }
    }
};