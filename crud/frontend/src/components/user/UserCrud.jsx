import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    // Essa função faz uma chamada no backend pra obter a lista de cadastro
    // Para fazer uma requisição no backend em React posso usar o Axios ou o Fetch
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // Função para limpar o estado
    clear() {
        this.setState({user: initialState.user})
    }

    // Função para Alterar ou Salvar um cadastro novo
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        // O axios é uma função e como o 'method' vai receber uma
        // string, estou colocando o method em colchetes
        // esse colchetes se refere a como se fosse um ponto, tipo: axios.post ou axios.put
        axios[method] (url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    // Função para atualizar a lista
    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    // Função para atualizar um campo, tanto pra atualizado o nome, como o email
    updateField(event) {
        // Nessa constante, estou clonando o objeto User, porque vou
        // alterar o conteúdo de usuário, e não é interessante 
        // alterar diretamente no 'State' e sim clonar o objeto e alterar esse clone
        // depois setar o estado usando a função 'setState'
        const user = { ...this.state.user }
        // esta utilizando o colchetes, pois está pegando de um value de string
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    // Função para renderizar o Formulário, exportando para a
    // função render no final do código
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">

                            <label>Nome</label>
                            <input type="text" className="form-control" 
                            name="name" 
                            value={this.state.user.name} 
                            onChange={e => this.updateField(e)} 
                            placeholder="digite o nome..." />
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

                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
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
