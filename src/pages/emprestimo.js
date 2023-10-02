import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import TelaFundo from '../components/global/telaFundo'
import Botao from '../components/global/botao'
import Passo from '../components/global/passo'
import BtCancelar from '../components/global/btCancelar'
import axios from 'axios'
import Input from '../components/global/input'


const Emprestimo = ({ route, navigation }) => {
    const { idGlobal } = route.params;
    const { dadosGeraisConta } = route.params;
    const juros = 0.34
    const [valorEmprestimo, setValorEmprestimo] = useState()
    const [valorParcela, setValorParcela] = useState()
    const [valorComJuros, setValorComJuros] = useState()
    const [totalParcelas, setTotalParcelas] = useState(1)

    const [barrarEmprestimo, setBarrarEmprestimo] = useState(false)

    // Aqui tem que ver a lógica de só mostrar o card final se o input não for 0
    const [aux, setAux] = useState(false)

    // Navegação
    const irHome = () => {
        navigation.navigate('Home', { idGlobal: idGlobal })
    }

    // Monitora o valor a ser emprestado
    useEffect(() => {
        if (valorEmprestimo != 0 && valorEmprestimo != null) {
            setAux(true)
            setValorComJuros(parseFloat(valorEmprestimo) + parseFloat(valorEmprestimo * juros * totalParcelas))
            setValorParcela(parseFloat(valorComJuros / totalParcelas).toFixed(2))            
            if ((parseFloat(valorEmprestimo) < parseFloat(dadosGeraisConta.saldo) * 8)) {
                setBarrarEmprestimo(false)
            } else if (parseFloat(dadosGeraisConta.saldo) == 0 && parseFloat(valorEmprestimo) <= 5000) {
                setBarrarEmprestimo(false)
            }
            else {
                setBarrarEmprestimo(true)
            }
        } else {
            setAux(false)
        }
    })

    // Funções
    // Mudar a quantidade de parcelas
    const incrementarParcelas = () => {
        if (totalParcelas < 12) {
            setTotalParcelas(totalParcelas + 1)
        }
    }

    const decrementarParcelas = () => {
        if (totalParcelas > 1) {
            setTotalParcelas(totalParcelas - 1)
        }
    }

    // Verificar se o empréstimo pode ou não ser solicitado
    // Será permitido fazer emprestimos 8x maior q o saldo atual
    // Caso esteja zerado, até R$5000.00    
    const verificaEmprestimo = () => {
        console.log(parseFloat(dadosGeraisConta.saldo) * 8)
        if ((parseFloat(valorEmprestimo) < parseFloat(dadosGeraisConta.saldo) * 8)) {
            setBarrarEmprestimo(false)
        } else if (parseFloat(dadosGeraisConta.saldo) == 0 && parseFloat(valorEmprestimo) <= 5000) {
            setBarrarEmprestimo(false)
        }
        else {
            setBarrarEmprestimo(true)
        }
    }



    // API 
    // Fazer empréstimo
    const fazerEmprestimo = () => {
        if (barrarEmprestimo == false) {
            let access_token = JSON.parse(localStorage.getItem('token'))
            axios
                .post('http://127.0.0.1:8000/banco/emprestimos/', {
                    conta: idGlobal,
                    valor_solicitado: valorEmprestimo,
                    valor_final: valorComJuros,
                    juros: juros,
                    quantidade_parcelas: totalParcelas,
                    valor_parcelas: valorParcela,
                },
                    { headers: { Authorization: `JWT ${access_token.access}` } },
                )
                .then(function (response) {
                    let novoValor = parseFloat(dadosGeraisConta.saldo) + parseFloat(valorEmprestimo)
                    axios.put(`http://127.0.0.1:8000/banco/conta/${idGlobal}`,
                        {
                            cliente: idGlobal,
                            agencia: dadosGeraisConta.agencia,
                            conta: dadosGeraisConta.conta,
                            saldo: novoValor,
                        },
                        { headers: { Authorization: `JWT ${access_token.access}` } }
                    )
                        .then((res) => {
                            console.log(res)

                            // Chamar tela emprestimo sucesso
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }else{
            console.log('Nao pode fazer emprestimoooo')
        }

    }

    return (
        <>
            {/* View que irá agrupar tudo */}
            <View className='w-screen h-screen items-center flex flex-col justify-end'>
                {/* Background 1/5 */}
                <TelaFundo titulo='Empréstimo' />

                {/* Restante da tela 4/5 */}
                <View className='h-4/5 w-5/6 bg-white absolute rounded-t-2xl flex 
                flex-col justify-center items-center'>

                    {/* Título do conteúdo */}
                    <View className='h-1/6 w-4/5 flex justify-center'>
                        <Passo texto='SIMULE AGORA MESMO' />
                    </View>

                    {/* Para separar melhor os componentes nela */}
                    <View className='h-5/6 w-4/5 '>

                        {/* Intruções 1/5 */}
                        <View className='w-full h-1/5'>
                            <Text className='text-[#5A5252] text-lg'>
                                Informe um <b>valor</b> para simular o empréstimo
                            </Text>
                        </View>

                        {/* Botões 3/5 */}
                        <View className='w-full h-3/5 flex flex-col items-center justify-center'>

                            {/* 1/4 para input do valor do empréstimo */}
                            <View className='w-full h-1/4 flex flex-col justify-center items-center '>
                                <Input placeholder='R$' set={setValorEmprestimo} value={valorEmprestimo} />
                            </View>

                            {/* 1/4 para botões empréstimo */}
                            <View className='w-full h-1/4 flex-row justify-between'>
                                {/* metade esquerda número de parcelas */}
                                <View className='w-1/3 h-full flex justify-center items-center'>
                                    <Text className='text-base text-[#5A5252]'><b>{totalParcelas}</b> parcelas<br></br>de <b>R${valorParcela}</b></Text>
                                </View>

                                {/* metade direita com os botões */}
                                <View className='w-1/3 h-full flex-row justify-between items-center'>
                                    <TouchableOpacity onPress={() => decrementarParcelas()}>
                                        <Image source={require('../../src/img/btMenos.png')} className='w-[35px] h-[35px]' />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => incrementarParcelas()}>
                                        <Image source={require('../../src/img/btMais.png')} className='pl-1 w-[35px] h-[35px]' />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {/* 2/4 para infomrações do empréstimo */}
                            {
                                aux == true ?
                                    <>
                                        <View className='w-full h-2/4 flex justify-center items-center'>

                                            {/* Coloquei mais uma div para posicionar melhor */}
                                            <View className='rounded-md w-full h-1/2 bg-[#EBEBEB] p-2'>
                                                {/* 3/5 para as informações */}
                                                <View className='w-full h-3/5 flex-row'>

                                                    {/* metade esquerda apra valor total */}
                                                    <View className='w-1/2 flex justify-center items-center'>
                                                        <Text>
                                                            Total a pagar <br></br><b>R$ {parseFloat(valorComJuros).toFixed(2)}</b>
                                                        </Text>
                                                    </View>

                                                    {/* metade direita para data */}
                                                    <View className='w-1/2 flex justify-center items-center'>
                                                        <Text>
                                                            Primeira parcela em<br></br> <b>07/23</b>
                                                        </Text>
                                                    </View>
                                                </View>

                                                {/* 2/5 para informação de juros */}
                                                <View className='w-full h-2/5 flex justify-center items-center'>
                                                    <Text className='text-[#5A5252] text-sm'>Juros de 3.4% ao mês</Text>
                                                </View>
                                            </View>

                                            {/* Mensagem de erro para empréstimo bloqueado */}
                                            {
                                                barrarEmprestimo == true ?
                                                    <>
                                                        <Text className='text-[#CB2626] pt-1 font-semibold'>Valor para empréstimo muito alto</Text>
                                                    </> : null
                                            }
                                        </View>
                                    </> :
                                    <>
                                        <View className='h-2/4'>

                                        </View>
                                    </>
                            }
                        </View>

                        {/* Resto 1/5 */}
                        <View className='w-full h-1/5 flex flex-col justify-center 
                        items-center'>
                            <Botao texto='SOLICITAR' onPress={fazerEmprestimo} />
                            <BtCancelar texto='Cancelar' onPress={irHome} />
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Emprestimo