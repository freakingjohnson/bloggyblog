module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.post_blog([req.body.title, req.body.body, req.body.date])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },

}