import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

const CabecalhoHome = (props) => {
    // Componentes para estilizar        
    const saudacao = `Olá, ${props.user}`

    return (
        <>
            {/* Cabeçalho que aparece na maioria das telas */}
            <View className='bg-[#324B77] h-1/5 w-full' >

                {/* Para colocar o ícone no canto */}
                <View className='w-screen h-4/5 p-2 flex-row'>
                    <View className='h-full w-1/2'>
                        <Image source={require('../../img/iconeHome.png')} className='w-20 h-10' />
                    </View>
                    <View className='h-full w-1/2 flex items-end'>
                    <Image source={props.foto} className='w-20 h-10' />
                    </View>

                </View>

                {/* Para centralizar o título */}
                <View className='w-full h-1/5 items-center'>
                    <View className='w-4/5'>
                        <Text className='text-white text-xl'>{saudacao}</Text>
                    </View>
                </View>

            </View>
        </>
    )
}

export default CabecalhoHome