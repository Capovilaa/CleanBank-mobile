import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'
import Cabecalho from "../components/global/cabecalho"
import Input from '../components/global/input'
import Botao from '../components/global/botao'
import BtVoltar from '../components/global/btVoltar'
import axios from 'axios'

const Login = ({ navigation }) => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [statusLogin, setStatusLogin] = useState(false)
    const [token, setToken] = useState([])


    const logar = () => {
        axios
            .post('http://127.0.0.1:8000/auth/jwt/create', {
                cpf: user,
                password: password,                
            })
            .then(function (response) {
                console.log(response)
                localStorage.setItem('token', JSON.stringify({access: (response.data.access)}))    
                axios.get('http://127.0.0.1:8000/auth/users/', 
                {
                    headers: {
                        Authorization: `JWT ${response.data.access}`
                    }
                })
                         .then((res) => {
                            setStatusLogin(true)
                            irHome(res.data[0].id)
                         })
                
            })
            .catch(function (error) {
                alert('Credenciais incorretas')
            })            
    }



    // Navegação
    const irCadastro = () => {
        navigation.navigate('Cadastro')
    }
    
    const irHome = (id) => {
        console.log(`meu id é : ${id}`)
        navigation.navigate('Home', {idGlobal: id, pix: ''})
    }


    return (
        <>
            {/* View que engloba tudo */}
            <View className='flex-1'>

                {/* Cabeçalho, que é um componente 1/4*/}
                <Cabecalho />

                {/* Restante da tela com conteúdo 3/4*/}
                <View className='flex flex-col items-center justify-center w-screen h-3/4'>

                    {/* Agrupar os elementos no centro do conteúdo */}
                    <View className='flex flex-col items-center justify-center w-4/5 h-5/6'>
                        <Input placeholder='Usuário' set={setUser} value={user} />
                        <Input placeholder='Senha' set={setPassword} value={password} />
                    </View>

                    {/* Botão avulso */}
                    <Botao texto='ENTRAR' onPress={logar} />
                    <View className='flex items-end justify-end w-full h-1/6'>
                        <BtVoltar onPress={irCadastro} texto='Cadastro' />
                    </View>

                </View>
            </View>
        </>
    )
}

export default Login