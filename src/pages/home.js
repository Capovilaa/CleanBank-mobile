import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'
import CabecalhoHome from '../components/global/cabecalhoHome'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'


const Home = ({ route, navigation }) => {

    // Para acesso    
    const { idGlobal, pix } = route.params;
    const getConta = 'http://127.0.0.1:8000/banco/conta/' + idGlobal
    const getCliente = 'http://127.0.0.1:8000/banco/cliente/' + idGlobal

    const [dadosConta, setDadosConta] = useState([])
    const [dadosCliente, setDadosCliente] = useState([])


    // Navegação
    const irPix = () => {
        navigation.navigate('Pix', { idGlobal: idGlobal, saldo: dadosConta.saldo, remetente: dadosCliente.user, dadosGeraisConta: dadosConta })
    }

    const irEmprestimo = () => {
        navigation.navigate('Emprestimo', { idGlobal: idGlobal, dadosGeraisConta: dadosConta })
    }

    const irTransacoes = () => {
        navigation.navigate('Transacoes', {idGlobal: idGlobal})
    }

    const irPerfil = () => {
        navigation.navigate('Perfil', {idGlobal: idGlobal})
    }

    // Busca dados da conta
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getConta,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                setDadosConta(res.data)
            })
    }, [pix])

    // Busca dados cliente
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getCliente,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                console.log(res.data)
                setDadosCliente((res.data))
            })
    }, [pix])
    
    return (
        <>
            <View className='flex-1'>
                {/* Cabeçalho 1/5 */}
                <CabecalhoHome user={dadosCliente.nome} foto={dadosCliente.foto} />
                {/* Restante da tela 4/5 */}
                <View className='w-full h-4/5'>

                    {/* Parte de cima */}
                    <View className='w-full h-1/5 items-center pt-5'>

                        {/* Mostra o saldo */}
                        <View className='w-4/5'>
                            <Text className='font-semibold italic'>SEU SALDO</Text>
                            <Text className='italic'>R${dadosConta.saldo}</Text>
                        </View>
                    </View>

                    {/* Ícones */}
                    <View className='w-full h-3/5 flex flex-col items-center justify-center'>

                        {/* Para centralizar */}
                        <View className='w-4/5 h-2/5'>

                            {/* Fileira 1 */}
                            <View className='items-center w-full h-1/2 flex flex-row justify-around'>

                                {/* Botão pix */}
                                <TouchableOpacity onPress={() => irPix()}>
                                    <Image source={require('../../src/img/pix.png')} className='w-[50px] h-[50px]' />
                                </TouchableOpacity>

                                {/* Botão cartão */}
                                <TouchableOpacity>
                                    <Image source={require('../../src/img/cartao.png')} className='w-[50px] h-[50px]' />
                                </TouchableOpacity>

                                {/* Botão Usuário */}
                                <TouchableOpacity onPress={()=> irPerfil()}>
                                    <Image source={require('../../src/img/user.png')} className='w-[50px] h-[50px]' />
                                </TouchableOpacity>
                            </View>

                            {/* Fileira 2 */}
                            <View className='items-center w-full h-1/2 flex flex-row justify-around'>

                                {/* Botão extrato */}
                                <TouchableOpacity>
                                    <Image source={require('../../src/img/historico.png')} className='w-[50px] h-[50px]' />
                                </TouchableOpacity>

                                {/* Botão empréstimo */}
                                <TouchableOpacity onPress={() => irEmprestimo()}>
                                    <Image source={require('../../src/img/emprestimo.png')} className='w-[50px] h-[50px]' />
                                </TouchableOpacity>

                                {/* Botão trasação */}
                                <TouchableOpacity onPress={() => irTransacoes()}>
                                    <Image source={require('../../src/img/transacoes.png')} className='w-[50px] h-[50px]' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Restante */}
                    <View className='w-full h-1/5'>

                    </View>
                </View>
            </View>
        </>
    )
}

export default Home