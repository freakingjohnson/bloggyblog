module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.post_blog([req.body.title, req.body.body, req.body.date])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    getBlogPost: (req, res, next) => {
        const db = req.app.get('db')
        const params = req
        console.log(params)
        db.get_blog([params.id])
            .then(body => res.status(200).send(body))
            .catch(() => res.status(500).send())
    },
    postImage: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.post_image([req.body.image, req.body.title])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send())
    },
    getImage: (req, res, next) => {
        const db = req.app.get('db')
        const params = req
        console.log(params)
        db.get_image([params.id])
            .then(body => res.status(200).send(body))
            .catch(() => res.status(500).send())
    }
}