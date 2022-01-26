import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastre, Altere ou Delete um Usuário!'
}
const baseUrl = 'http://localhost:4002'

const initialState = {
    user: {name: '', email: ''},
    list: [], 
    errorMessage: ''
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios.get(`${baseUrl}/users`).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({user: initialState.user})
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    save() {
        const method = this.state.user.id ? 'put' : 'post'
        const id = this.state.user.id ? `/${this.state.user.id}` : ''
        axios[method](`${baseUrl}/users${id}`, this.state.user).then(() => {this.clear()
            this.componentDidMount()
        } ).catch( function (error) {
            console.log(`Show error notification! ${error}`)
            this.setState({errorMessage : `${error}`})
            console.log(this.state.errorMessage)
            return Promise.reject(error)
          }.bind(this))
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">

                            <label>Nome</label>
                            <input  type="text" className="form-control" 
                            name="name" 
                            value={this.state.user.name} 
                            onChange={e => this.updateField(e)} 
                            placeholder="digite o nome..."/>
                            <small className="form-text text-muted">Não compartilhamos seu e-mail com ninguém.</small>

                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">

                            <label>Email</label>
                            <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o e-mail..."
                            />

                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary" onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        const idList = this.state.list.find((userID) => { return userID.id})
        const id = idList.id
        console.log(id)
        axios.delete(`${baseUrl}/users/${id}`, this.state.user).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
