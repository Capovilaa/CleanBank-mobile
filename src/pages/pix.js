import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import TelaFundo from '../components/global/telaFundo'
import Passo from '../components/global/passo'
import Botao from '../components/global/botao'
import BtCancelar from '../components/global/btCancelar'
import Input from '../components/global/input'
import InputPix from '../components/global/inputPix'
import BotaoValorPix from '../components/global/botaoValor'
import axios from 'axios'

const Pix = ({ route, navigation }) => {
    const { idGlobal } = route.params;
    const { saldo } = route.params;
    const { remetente } = route.params;
    const { dadosGeraisConta } = route.params;

    const [passo, setPasso] = useState(1)
    const [valor, setValor] = useState(0)
    const [numCPF, setCPF] = useState()
    const [dadosClienteDestinatario, setDadosClienteDestinatario] = useState([])
    const [dadosContaDestinatario, setDadosContaDestinatario] = useState([])
    const atual = new Date()
    const data = atual.getDate() + '/' + (atual.getMonth() + 1) + '/' + atual.getFullYear()

    const mudarValor = (quantia) => {
        setValor(parseInt(valor) + quantia)
    }


    // Navegação
    const proximoPassoPix = (valor) => {
        setPasso(valor)
    }

    const irHome = () => {
        navigation.navigate('Home', { idGlobal: idGlobal, pix: (Math.floor(Math.random() * (999 - 100 + 1)) + 100).toString() })
    }


    // useEffect
    // Busca dados de conta do destinatário
    useEffect(() => {        
        let access_token = JSON.parse(localStorage.getItem('token'))
        axios.get(`http://127.0.0.1:8000/banco/conta/${dadosClienteDestinatario.id}`,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {
                setDadosContaDestinatario(res.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [dadosClienteDestinatario])


    // Validações
    // CPF existe
    const validaCPF = () => {
        let access_token = JSON.parse(localStorage.getItem('token'))
        axios.get(`http://127.0.0.1:8000/banco/cliente/?cpf_cliente=${numCPF}`,
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            // Busca dados de cliente do destinatário
            .then((res) => {                
                if (res.data.length == 0) {
                    alert('Usuário não encontrado')
                } else {
                    setDadosClienteDestinatario(res.data[0])
                    proximoPassoPix(2)
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // Saldo disponível
    const validaSaldo = () => {
        if (valor > saldo) {
            alert('Saldo insuficiente')
        } else {
            proximoPassoPix(3)
        }
    }

    // Envia Pix
    const enviaPix = () => {
        // Primeiro remover saldo remetente OK
        // Adicionar saldo para conta do destinatário

        let access_token = JSON.parse(localStorage.getItem('token'))
        axios.put(`http://127.0.0.1:8000/banco/conta/${remetente}`,
            {
                cliente: idGlobal,
                agencia: dadosGeraisConta.agencia,
                conta: dadosGeraisConta.conta,
                saldo: dadosGeraisConta.saldo - valor,
            },
            { headers: { Authorization: `JWT ${access_token.access}` } }
        )
            .then((res) => {                
                let valorFinalDestinatario =  parseFloat(dadosContaDestinatario.saldo) + valor                
                axios.put(`http://127.0.0.1:8000/banco/conta/${dadosContaDestinatario.id}`,
                    {
                        cliente: idGlobal,
                        agencia: dadosContaDestinatario.agencia,
                        conta: dadosContaDestinatario.conta,
                        saldo: valorFinalDestinatario,
                    },
                    { headers: { Authorization: `JWT ${access_token.access}` } }
                )
                    .then((res) => {
                        // Adicionar aqui funcao para adicionar na tabela de transacoes
                        addTransferencias(dadosClienteDestinatario.nome)                        
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // Adiciona na tabela de transferências
    const addTransferencias = () => {
        let access_token = JSON.parse(localStorage.getItem('token'))
        axios.post('http://127.0.0.1:8000/banco/transacoes/',{
            cliente : idGlobal,
            tipo_transacao : 'Pix',
            valor : valor,
            destinatario : dadosClienteDestinatario.nome,        
        },{headers: {Authorization : `JWT ${access_token.access}`}})
            .then((res)=>{
                console.log(res)
                proximoPassoPix(4)
            })
            .catch(function(error){
                console.log(error)
            })
    }


    return (
        <>
            {/* Chave do pix */}
            {passo == 1 ?
                <>
                    {/* View que irá agrupar tudo */}
                    <View className='w-screen h-screen items-center flex flex-col justify-end'>
                        {/* Background 1/5 */}
                        <TelaFundo titulo='Escolher destino' />

                        {/* Restante da tela 4/5 */}
                        <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                            {/* Título do conteúdo */}
                            <View className='h-1/6 w-4/5 flex justify-center'>
                                <Passo texto='INFORME A CHAVE' />
                            </View>

                            {/* Para separar melhor os componentes nela */}
                            <View className='h-5/6 w-4/5 '>

                                {/* Intruções 1/5 */}
                                <View className='w-full h-1/5'>
                                    <Text className='text-[#5A5252] text-lg'>
                                        Insira a <b>chave</b> chave escolhida!
                                    </Text>
                                </View>

                                {/* Botões 2/5 */}
                                <View className='w-full h-2/5 flex flex-col items-center justify-center'>

                                    <Input placeholder='Chave' set={setCPF} value={numCPF} />

                                </View>

                                {/* Resto 2/5 */}
                                <View className='w-full h-2/5 flex flex-col justify-center 
                        items-center'>
                                    <Botao texto='CONTINUAR' onPress={() => validaCPF()} />
                                    <BtCancelar texto='Cancelar' onPress={irHome} />
                                </View>
                            </View>
                        </View>
                    </View>
                </>
                : null
            }


            {/* Informar valor do pix */}
            {passo == 2 ?
                <>
                    {/* View que irá agrupar tudo */}
                    <View className='w-screen h-screen items-center flex flex-col justify-end'>
                        {/* Background 1/5 */}
                        <TelaFundo titulo='Valor transação' />

                        {/* Restante da tela 4/5 */}
                        <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                            {/* Título do conteúdo */}
                            <View className='h-1/6 w-4/5 flex justify-center'>
                                <Passo texto='INFORME O VALOR' />
                            </View>

                            {/* Para separar melhor os componentes nela */}
                            <View className='h-5/6 w-4/5 '>

                                {/* Intruções 1/5 */}
                                <View className='w-full h-1/5'>
                                    <Text className='text-[#5A5252] text-lg'>
                                        Informe a <b>quantia</b> a ser enviada!
                                    </Text>
                                </View>

                                {/* Botões 2/5 */}
                                <View className='w-full h-2/5 flex flex-col items-center justify-center'>
                                    <InputPix placeholder='R$' value={valor} onChange={setValor} />

                                    {/* Aumentar o valor por botão */}
                                    <View className='flex flex-row justify-around w-full'>
                                        <BotaoValorPix valor='1' onPress={mudarValor} />
                                        <BotaoValorPix valor='5' onPress={mudarValor} />
                                        <BotaoValorPix valor='10' onPress={mudarValor} />
                                        <BotaoValorPix valor='100' onPress={mudarValor} />
                                    </View>
                                </View>

                                {/* Resto 2/5 */}
                                <View className='w-full h-2/5 flex flex-col justify-center 
                        items-center'>
                                    <Botao texto='CONTINUAR' onPress={() => validaSaldo()} />
                                    <BtCancelar texto='Cancelar' onPress={irHome} />
                                </View>
                            </View>
                        </View>
                    </View>

                </>
                : null
            }

            {/* Confirmação dos dados */}
            {passo == 3 ?
                <>
                    {/* View que irá agrupar tudo */}
                    <View className='w-screen h-screen items-center flex flex-col justify-end'>
                        {/* Background 1/5 */}
                        <TelaFundo titulo='Valor transação' />

                        {/* Restante da tela 4/5 */}
                        <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                            {/* Título do conteúdo */}
                            <View className='h-1/6 w-4/5 flex justify-center'>
                                <Passo texto='CONFIRME OS DADOS' />
                            </View>

                            {/* Para separar melhor os componentes nela */}
                            <View className='h-5/6 w-4/5 '>

                                {/* Intruções 1/5 */}
                                <View className='w-full h-1/5'>
                                    <Text className='text-[#5A5252] text-lg'>
                                        Confirme se todos os <b>dados</b> estão corretos.
                                    </Text>
                                </View>

                                {/* Botões 2/5 */}
                                <View className='w-full h-2/5 flex flex-col items-center justify-center'>
                                    {/* Nome */}
                                    <Text>
                                        {dadosClienteDestinatario.nome}
                                    </Text>

                                    {/* C.P.F */}
                                    <Text>
                                        {dadosClienteDestinatario.cpf_cliente}
                                    </Text>

                                    {/* Valor */}
                                    <Text>
                                        {valor}
                                    </Text>

                                    {/* Data */}
                                    <Text>
                                        {data}
                                    </Text>
                                </View>

                                {/* Resto 2/5 */}
                                <View className='w-full h-2/5 flex flex-col justify-center 
                        items-center'>
                                    <Botao texto='CONTINUAR' onPress={() => enviaPix()} />
                                    <BtCancelar texto='Cancelar' onPress={irHome} />
                                </View>
                            </View>
                        </View>
                    </View>
                </>
                : null
            }

            {/* Pix realizado com sucesso */}
            {passo == 4 ?
                <>
                    {/* View que irá agrupar tudo */}
                    <View className='w-screen h-screen items-center flex flex-col justify-end'>
                        {/* Background 1/5 */}
                        <TelaFundo titulo='Confirmação' />

                        {/* Restante da tela 4/5 */}
                        <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                            {/* Título do conteúdo */}
                            <View className='h-1/6 w-4/5 flex justify-center'>
                                <Passo texto='CONFIRA OS DADOS' />
                            </View>

                            {/* Para separar melhor os componentes nela */}
                            <View className='h-5/6 w-4/5 '>

                                {/* Intruções 1/5 */}
                                <View className='w-full h-1/5'>
                                    <Text className='text-[#5A5252] text-lg'>
                                        Seu pix foi <b>enviado!</b>
                                    </Text>
                                </View>

                                {/* Botões 2/5 */}
                                <View className='w-full h-2/5 flex flex-col items-center justify-center'>
                                    <Image source={require('../img/check.png')} className='w-[100px] h-[100px]' />
                                </View>

                                {/* Resto 2/5 */}
                                <View className='w-full h-2/5 flex flex-col justify-center 
                        items-center'>
                                    <Botao texto='HOME' onPress={irHome} />
                                </View>
                            </View>
                        </View>
                    </View>
                </>
                : null
            }
        </>
    )
}

export default Pix