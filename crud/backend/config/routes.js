module.exports = app => {
    app.route('/users').post(app.api.user.save)
    app.route('/users').get(app.api.user.getUser)
    app.route('/users/:id').get(app.api.user.getUserByID).put(app.api.user.save).delete(app.api.user.removeUser)
}