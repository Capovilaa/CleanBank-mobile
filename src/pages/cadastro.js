import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import Cabecalho from "../components/global/cabecalho"
import Input from '../components/global/input'
import Botao from '../components/global/botao'
import Titulo from '../components/global/titulos'
import BtVoltar from '../components/global/btVoltar'
import axios from 'axios'

import * as ImagePicker from 'expo-image-picker';

const Cadastro = ({ navigation }) => {
    // Campos do input

    const [passo, setPasso] = useState(1)

    const [numCPF, setNumCPF] = useState()

    const [nomeCompleto, setNomeCompleto] = useState('')
    const [email, setEmail] = useState('')
    const [validaEmail, setValidaEmail] = useState([])
    const [dataNasc, setDataNasc] = useState('')
    const [celular, setCelular] = useState('')

    const cepURL = `https://viacep.com.br/ws/`
    const [numCEP, setCEP] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUF] = useState('')

    const [senha, setSenha] = useState('')
    const [senhaConf, setSenhaConf] = useState('')

    const [imagem, setImagem] = useState()



    // Navegação
    const proximoCadastro = (valor) => {
        setPasso(valor)
    }

    const irLogin = () => {
        navigation.navigate('Login')
    }



    // // Escolher imagem galeria
    const escolherFotoGaleria = async () => {
        let result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!(await result).canceled) {
            setImagem((await result).assets[0].uri)
        }
    }



    // Api via cep
    useEffect(() => {
        axios
            .get(cepURL + numCEP + '/json/', {

            })
            .then(function (response) {
                setLogradouro(response.data.logradouro)
                setCidade(response.data.localidade)
                setUF(response.data.uf)
                setBairro(response.data.bairro)
            })
            .catch(function (error) {
                if (length(numCEP == 9)) {
                    console.log(error)
                }
            })
    }, [numCEP])



    // CADASTROS
    const cadastrarAuthUser = () => {
        axios
            .post('http://127.0.0.1:8000/auth/users/', {
                email: '',
                cpf: numCPF,
                password: senha
            })
            .then(function (response) {
                retornarJWT(response.data.id)

            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const retornarJWT = (pegarId) => {
        axios
            .post('http://127.0.0.1:8000/auth/jwt/create', {
                cpf: numCPF,
                password: senha,
            })
            .then(function (response) {
                cadastrarUserModel(response.data.access, pegarId)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const cadastrarUserModel = (acesso, pegarId) => {
        axios
            .post('http://127.0.0.1:8000/banco/cliente/', {
                nome: nomeCompleto,
                cpf_cliente: numCPF,
                email: email,
                foto: imagem,
                data_nascimento: dataNasc,
                user: pegarId,
            },
                { headers: { Authorization: `JWT ${acesso}` } },
            )
            .then(function (response) {
                cadastrarEnderecoModel(acesso, pegarId)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const cadastrarEnderecoModel = (acesso, id) => {
        axios
            .post('http://127.0.0.1:8000/banco/endereco/', {
                cliente: id,
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                cep: numCEP,
            },
                { headers: { Authorization: `JWT ${acesso}` } },
            )
            .then(function (response) {
                cadastrarContaModel(acesso, id)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    const cadastrarContaModel = (acesso, id) => {
        let geraConta = (Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111).toString()
        axios
            .post('http://127.0.0.1:8000/banco/conta/', {
                cliente: id,
                agencia: '4444',
                conta: geraConta,
                saldo: 1000,
                situacao_cartao: false
            },
                { headers: { Authorization: `JWT ${acesso}` } },
            )
            .then(function (response) {
                alert('Cadastro finalizado')
                irLogin()
                console.log(response)
            })
            .catch(function (error) {
                alert('Erro ao cadastrar')
                console.log(error)
            })
    }



    // VALIDAÇÕES

    // Validação CPF
    const validacaoCPF = () => {
        if (numCPF.length == 11) {
            proximoCadastro(2)
        } else {
            alert('CPF inválido')
        }
    }


    // Validação E-mail
    const validacaoEmail = () => {
        if (!validaEmail.includes(email) && email.includes('@') && email.includes('.com')) {
            if (nomeCompleto != '' && dataNasc != '' && celular != '') {
                proximoCadastro(3)
            }
            else {
                alert('Preencha todos os campos')
            }
        }
        else {
            alert('E-mail inválido')
        }
    }


    // Validação endereço
    const validacaoEndereco = () => {
        if (numCEP != '' && logradouro != '' && bairro != '' && cidade != '' && uf != '') {
            proximoCadastro(4)
        } else {
            alert('Preencha todos os campos')
        }
    }


    // Validação senha
    const validacaoSenha = () => {
        if (senha != '' && setSenhaConf != '') {
            if (senha == senhaConf) {
                proximoCadastro(5)
            }
            else {
                alert('Senhas não estão iguais')
            }
        } else {
            alert('Preenhca todos os campos')
        }
    }


    // Validação imagem
    const validacaoImagem = () => {
        // Chamar cadastrar user aqui depois
        if (imagem != null) {
            cadastrarAuthUser()
        } else {
            alert('Insira uma imagem')
        }
    }

    return (
        <>
            <View className='flex-1'>
                {/* Cabeçalho 1/5 */}
                <Cabecalho />

                {passo == 1 ?
                    <>
                        {/* Restante da tela 4/5 */}
                        <View className='w-full h-4/5'>

                            {/* Cabeçalho */}
                            <View className='w-full h-1/6 flex justify-center items-center'>
                                <Titulo texto='CADASTRO' />
                            </View>

                            {/* Conteúdo */}
                            <View className='w-full h-3/6 flex justify-center items-center'>
                                <View className='w-4/5 h-full flex flex-col justify-center 
    items-center'>
                                    <Input placeholder='C.P.F' set={setNumCPF} value={numCPF} />
                                </View>
                            </View>

                            {/* Botão */}
                            <View className='w-full h-1/6 flex justify-center items-center'>
                                <Botao texto='CONTINUAR' onPress={() => validacaoCPF()} />
                            </View>

                            {/* Inferior */}
                            <View className='w-full h-1/6'>

                                {/* Parte dos passos */}
                                <View className='w-full h-3/4 flex items-center justify-center'>

                                </View>

                                {/* Parte dos passos */}
                                <View className='w-full h-1/4 flex items-end'>
                                    <BtVoltar texto='Cancelar' onPress={irLogin} />
                                </View>
                            </View>

                        </View>
                    </>
                    : null
                }


                {/* Cadastro dados pessoais */}


                {
                    passo == 2 ?
                        <>
                            <View className='w-full h-4/5'>

                                {/* Cabeçalho */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Titulo texto='CADASTRO' />
                                </View>

                                {/* Conteúdo */}
                                <View className='w-full h-3/6 flex justify-center items-center'>
                                    <View className='w-4/5 h-full flex flex-col justify-center 
    items-center'>
                                        <Input placeholder='Nome completo' set={setNomeCompleto} value={nomeCompleto} />
                                        <Input placeholder='E-mail' set={setEmail} value={email} />
                                        <Input placeholder='Data nasc.' set={setDataNasc} value={dataNasc} />
                                        <Input placeholder='Celular' set={setCelular} value={celular} />

                                    </View>
                                </View>

                                {/* Botão */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Botao texto='CONTINUAR' onPress={() => validacaoEmail()} />
                                </View>

                                {/* Inferior */}
                                <View className='w-full h-1/6'>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-3/4 flex items-center justify-center'>

                                    </View>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-1/4 flex items-end'>
                                        <BtVoltar texto='Cancelar' onPress={irLogin} />
                                    </View>
                                </View>


                            </View>
                        </>
                        : null
                }


                {/* Cadastro endereco */}


                {
                    passo == 3 ?
                        <>
                            <View className='w-full h-4/5'>

                                {/* Cabeçalho */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Titulo texto='CADASTRO' />
                                </View>

                                {/* Conteúdo */}
                                <View className='w-full h-3/6 flex justify-center items-center'>
                                    <View className='w-4/5 h-full flex flex-col justify-center 
                                    items-center'>
                                        <Input placeholder='CEP' set={setCEP} value={numCEP} />
                                        <Input placeholder='Logradouro' set={setLogradouro} value={logradouro} />
                                        <Input placeholder='Bairro' set={setBairro} value={bairro} />
                                        <Input placeholder='Cidade' set={setCidade} value={cidade} />
                                        <Input placeholder='UF' set={setUF} value={uf} />

                                    </View>
                                </View>

                                {/* Botão */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Botao texto='CONTINUAR' onPress={() => validacaoEndereco()} />
                                </View>

                                {/* Inferior */}
                                <View className='w-full h-1/6'>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-3/4 flex items-center justify-center'>

                                    </View>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-1/4 flex items-end'>
                                        <BtVoltar texto='Cancelar' onPress={irLogin} />
                                    </View>
                                </View>


                            </View>
                        </>
                        : null
                }


                {/* Cadastro senha */}


                {
                    passo == 4 ?
                        <>
                            <View className='w-full h-4/5'>

                                {/* Cabeçalho */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Titulo texto='CADASTRO' />
                                </View>

                                {/* Conteúdo */}
                                <View className='w-full h-3/6 flex justify-center items-center'>
                                    <View className='w-4/5 h-full flex flex-col justify-center 
    items-center'>
                                        <Input placeholder='Senha' set={setSenha} value={senha} />
                                        <Input placeholder='Repita a senha' set={setSenhaConf} value={senhaConf} />

                                    </View>
                                </View>

                                {/* Botão */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Botao texto='CONTINUAR' onPress={() => validacaoSenha()} />
                                </View>

                                {/* Inferior */}
                                <View className='w-full h-1/6'>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-3/4 flex items-center justify-center'>

                                    </View>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-1/4 flex items-end'>
                                        <BtVoltar texto='Cancelar' onPress={irLogin} />
                                    </View>
                                </View>


                            </View>
                        </>
                        : null
                }


                {/* Cadastro imagem */}


                {
                    passo == 5 ?
                        <>
                            <View className='w-full h-4/5'>

                                {/* Cabeçalho */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Titulo texto='CADASTRO' />
                                </View>

                                {/* Conteúdo */}
                                <View className='w-full h-3/6 flex justify-center items-center'>
                                    <View className='w-4/5 h-full flex flex-col justify-center 
                                    items-center'>

                                        {/* Ternário para caso a imagem seja selecionada */}
                                        {imagem != null ?
                                            <>
                                                <Image source={{ uri: imagem }} className='w-52 h-52 bg-stone-100' />
                                            </> :
                                            <>
                                                <View className='w-52 h-52 bg-stone-100' />
                                            </>
                                        }

                                        {/* Novo input de imagem */}
                                        <TouchableOpacity onPress={escolherFotoGaleria}>
                                            <Text className='text-[#5A5252] text-base pt-1'>Selecionar imagem</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Botão */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Botao texto='CADASTRAR' onPress={() => validacaoImagem()} />
                                </View>
                                {/* Inferior */}
                                <View className='w-full h-1/6'>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-3/4 flex items-center justify-center'>

                                    </View>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-1/4 flex items-end'>
                                        <BtVoltar texto='Cancelar' onPress={irLogin} />
                                    </View>
                                </View>


                            </View>
                        </>
                        : null
                }


                {/* Cadastro concluído */}


                {
                    passo == 6 ?
                        <>
                            <View className='w-full h-4/5'>

                                {/* Cabeçalho */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Titulo texto='CONTA CADASTRADA' />
                                    <Text className='w-4/5 pt-10'>Tudo pronto, sua conta foi criada com<br></br> <b>sucesso!</b></Text>
                                </View>

                                {/* Conteúdo */}
                                <View className='w-full h-3/6 flex justify-center items-center'>
                                    <View className='w-4/5 h-full flex flex-col justify-center 
    items-center'>
                                        <Image source={require('../img/check.png')} className='w-[100px] h-[100px]' />
                                    </View>
                                </View>

                                {/* Botão */}
                                <View className='w-full h-1/6 flex justify-center items-center'>
                                    <Botao texto='LOGIN' onPress={irLogin} />
                                </View>

                                {/* Inferior */}
                                <View className='w-full h-1/6'>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-3/4 flex items-center justify-center'>

                                    </View>

                                    {/* Parte dos passos */}
                                    <View className='w-full h-1/4 flex items-end'>
                                    </View>
                                </View>
                            </View>
                        </>
                        : null
                }
            </View>
        </>
    )
}

export default Cadastro