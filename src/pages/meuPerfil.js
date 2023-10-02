import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import TelaFundo from '../components/global/telaFundo'
import Botao from '../components/global/botao'
import Passo from '../components/global/passo'
import axios from 'axios'


const MeuPerfil = ({ route, navigation }) => {
    const { idGlobal } = route.params;
    const getConta = 'http://127.0.0.1:8000/banco/conta/' + idGlobal
    const getCliente = 'http://127.0.0.1:8000/banco/cliente/' + idGlobal
    const getEndereco = 'http://127.0.0.1:8000/banco/endereco/' + idGlobal

    const [dadosConta, setDadosConta] = useState([])
    const [dadosCliente, setDadosCliente] = useState([])
    const [dadosEndereco, setDadosEndereco] = useState([])

    // Navegação
    const irHome = () => {
        navigation.navigate('Home', { idGlobal: idGlobal })
    }
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getConta,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                setDadosConta(res.data)
            })
    }, [])

    // Busca dados cliente
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getCliente,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {                
                setDadosCliente((res.data))
            })
    }, [])

    // Busca dados endereço
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get(getEndereco,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {                
                setDadosEndereco((res.data))
            })
    }, [])

    return (
        <>
            {/* View que irá agrupar tudo */}
            <View className='w-screen h-full items-center flex flex-col justify-end'>
                {/* Background 1/5 */}
                <TelaFundo titulo='Perfil' />

                {/* Restante da tela 4/5 */}
                <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                    {/* Título do conteúdo */}
                    <View className='h-1/6 w-4/5 flex justify-center'>
                        <Passo texto='SEUS DADOS' />
                    </View>

                    {/* Para separar melhor os componentes nela */}
                    <View className='h-5/6 w-4/5 '>

                        {/* Intruções 1/5 */}
                        <View className='w-full h-1/5'>
                            <Text className='text-[#5A5252] text-lg'>
                                Visualizae suas <b>informações</b>
                            </Text>
                        </View>

                        {/* Conteúdo 3/5 */}
                        <View className='w-full h-3/5 flex flex-col'>

                            {/* metade de cima com dados 2/3 */}
                            <View className='h-2/3 w-full flex flex-col justify-around'>
                                {/* linha 1 */}
                                <View className='h-1/5 w-full flex flex-row'>
                                    <View className='h-full w-1/2'>
                                        <Text>
                                            Nome: <br></br> {dadosCliente.nome}
                                        </Text>
                                    </View>

                                    <View className='h-full w-1/2'>
                                        <Text>
                                            Conta: <br></br> {dadosConta.conta}
                                        </Text>
                                    </View>
                                </View>


                                {/* linha 2 */}
                                <View className='h-1/5 w-full flex flex-row'>
                                    <View className='h-full w-1/2'>
                                        <Text>
                                            E-mail: <br></br> {dadosCliente.email}
                                        </Text>
                                    </View>

                                    <View className='h-full w-1/2'>

                                    </View>
                                </View>


                                {/* linha 3 */}
                                <View flex flex-row className='h-1/5 w-full'>
                                    <View className='h-full w-1/2'>
                                        <Text>
                                            Logradouro: <br></br> {dadosEndereco.logradouro}
                                        </Text>
                                    </View>

                                    <View className='h-full w-1/2'>
                                    </View>
                                </View>

                                {/* linha 4 */}
                                <View className='h-1/5 w-full flex flex-row'>
                                    <View className='h-full w-1/2'>
                                        <Text>
                                            Data abertura conta: <br></br> {dadosCliente.data_abertura}
                                        </Text>
                                    </View>

                                    <View className='h-full w-1/2'>
                                    </View>
                                </View>

                            </View>


                            {/* metade de baixo com fotos 1/3 */}
                            <View className='h-1/3 w-full flex items-center justify-center'>
                                <Image source={dadosCliente.foto} className='w-1/2 h-1/2' />
                            </View>
                        </View>

                        {/* Resto 1/5 */}
                        <View className='w-full h-1/5 flex flex-col justify-center 
                        items-center'>
                            <Botao texto='VOLTAR' onPress={irHome} />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default MeuPerfil