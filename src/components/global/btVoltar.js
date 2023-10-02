import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'

// Botão para cancelar o login

const BtVoltar = (props) => {
    // const TouchableOpacity = styled(TouchableOpacity)

    return (
        <>
            <TouchableOpacity className='pr-5' onPress={props.onPress}>
                <Text className='text-[#293751] font-semibold'>{props.texto}</Text>
            </TouchableOpacity>
        </>
    )
}

export default BtVoltar