module.exports = {
    create: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.post_blog([req.body.title, req.body.body, req.body.date])
            .then(() => res.status(200).send())
            .catch((error) =>{ 
                console.log(error)
            res.status(500).send()})
    },
    getBlogPost: (req, res, next) => {
        const db = req.app.get('db')
        const params = req
        console.log(params)
        db.get_blog([params.id])
            .then(body => res.status(200).send(body))
            .catch((error) =>{ 
                console.log(error)
            res.status(500).send()})
    },
    postImage: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.post_image([req.body.image, req.body.title])
            .then(() => res.status(200).send())
            .catch((error) =>{ 
                console.log(error)
            res.status(500).send()})
    },
    getImage: (req, res, next) => {
        const db = req.app.get('db')
        const params = req
        console.log(params)
        db.get_image([params.id])
            .then(body => res.status(200).send(body))
            .catch((error) =>{ 
                console.log(error)
            res.status(500).send()})
    },
    postMessage: (req, res, next) => {
        const db = req.app.get('db')
        console.log(req.body)
        db.post_message([req.body.name, req.body.body, req.body.date])
            .then((response) => res.status(200).send())
            .catch((error) =>{ 
                console.log(error)
            res.status(500).send()})
    },
    getMessage: (req, res, next) => {
        const db = req.app.get('db')
        const params = req
        console.log(params)
        db.get_message([params.id])
            .then(body => res.status(200).send(body))
            .catch((error) =>{ 
                console.log(error)
            res.status(500).send()})
    }
}