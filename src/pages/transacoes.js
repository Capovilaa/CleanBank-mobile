import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import TelaFundo from '../components/global/telaFundo'
import Botao from '../components/global/botao'
import Passo from '../components/global/passo'
import axios from 'axios'


const Transacoes = ({ route, navigation }) => {
    const { idGlobal } = route.params;
    const [transacoes, setTransacoes] = useState([])

    // Navegação
    const irHome = () => {
        navigation.navigate('Home', { idGlobal: idGlobal })
    }

    // Buscar minhas transações
    useEffect(() => {
        let access_token = JSON.parse(localStorage.getItem('token'))

        axios.get('http://127.0.0.1:8000/banco/transacoes/?cliente_id=' + idGlobal,
            { headers: { Authorization: `JWT ${access_token.access}` } })
            .then((res) => {
                setTransacoes(res.data)
            })
    }, [])


    return (
        <>
            {/* View que irá agrupar tudo */}
            <View className='w-screen h-full items-center flex flex-col justify-end'>
                {/* Background 1/5 */}
                <TelaFundo titulo='Transações' />

                {/* Restante da tela 4/5 */}
                <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                    {/* Título do conteúdo */}
                    <View className='h-1/6 w-4/5 flex justify-center'>
                        <Passo texto='HISTÓRICO' />
                    </View>

                    {/* Para separar melhor os componentes nela */}
                    <View className='h-5/6 w-4/5 '>

                        {/* Intruções 1/5 */}
                        <View className='w-full h-1/5'>
                            <Text className='text-[#5A5252] text-lg'>
                                Informe um <b>valor</b> para simular o empréstimo
                            </Text>
                        </View>

                        {/* Conteúdo 3/5 */}
                        {/* Fazer aqui o map para transações */}
                        <ScrollView className='w-full h-3/5 flex flex-col'>

                            {transacoes.map((item) => (
                                <>
                                    <View key={item.id} className='flex-row items-center justify-center w-full h-24 bg-[#FFFBFB] rounded-lg 
                                pt-1'>
                                        {/* Metade esquerda 1/2 */}
                                        <View className='h-full w-1/2 flex flex-col justify-center'>
                                            <Text className='text-[#5A5252]'><b>Data</b> {item.data}</Text>
                                            <Text className='text-[#5A5252]'><b>Destinatário</b> {item.destinatario}</Text>
                                        </View>

                                        {/* Metade direira 1/2 */}
                                        <View className='h-full w-1/2 flex flex-col justify-center'>
                                            <Text className='text-[#5A5252]'><b>Tipo</b> {item.tipo_transacao}</Text>
                                            <Text className='text-[#5A5252]'><b>Valor</b> R$ {item.valor}</Text>
                                        </View>
                                    </View>

                                    <View className='pt-3'>

                                    </View>
                                </>


                            ))}

                        </ScrollView>

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

export default Transacoes