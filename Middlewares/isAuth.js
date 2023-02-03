

const isAuth = (req, res, next) => {
    if(req.session.isAuth ){
        next();
    }
    else{
        return res.send(
            {
                status: 405,
                message:"Invalid session, please login again"
            }
        )
    }
}

module.exports = isAuth