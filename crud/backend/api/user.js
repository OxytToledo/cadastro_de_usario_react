module.exports = app => {
    const { existsOrError, existsOrErrorEmail } = app.api.validation

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado!')
            existsOrErrorEmail(user.email, 'E-mail não informado!')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(!user.id) {
            app.db('users').insert(user).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        } else {
            app.db('users').update(user).where({ id: user.id }).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
        }
    }

    const getUser = (req, res) => {
        app.db('users').select('id', 'name', 'email').then(users => res.json(users)).catch(err => res.status(500).send(err))
    }

    const getUserByID = (req, res) => {
        app.db('users').select('id', 'name', 'email').where({ id: req.params.id }).then(user => res.json(user)).catch(err => res.status(400).send(err))
    }

    const removeUser = (req, res) => {
        app.db('users').delete().where({ id: req.params.id }).then(_ => res.send('Sucess'))
    }

    return { save, getUser, getUserByID, removeUser }
}