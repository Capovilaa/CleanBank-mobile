import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { styled } from 'nativewind'
import { withExpoSnack } from 'nativewind'

//Botão usado na aplicação inteira

const Botao = (props) => {
    // const TouchableOpacity = styled(TouchableOpacity)
    // () => navigation.navigate(props.onPress)

    return (
        <>
            <TouchableOpacity className='flex items-center justify-center rounded-2xl p-3 
        drop-shadow-lg w-2/4 shadow-lg' onPress={() => props.onPress()}>
                <Text className='text-[#293751] text-lg font-bold'>{props.texto}</Text>
            </TouchableOpacity>
        </>
    )
}

export default Botao