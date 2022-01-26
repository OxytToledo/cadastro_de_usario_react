import React from 'react'
import Main from '../template/Main'

export default props => 
    <Main icon="home" title="Início" subtitle="Seja bem-vindo, Chefe!" className={props}>
            <div className="display-4">Criação de Usuário!</div>
            <hr />
            <p className="mb-0">Crie seus novos cadastros acessando a aba de Usuários a esquerda. <i class="fa fa-smile-o" aria-hidden="true"></i> </p>
    </Main>
