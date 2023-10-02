import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'

// Botão para cancelar o login

const BtCancelar = (props) => {
    const StyledBotao = styled(TouchableOpacity)

    return (
        <>
            <StyledBotao className='pt-10' onPress={props.onPress}>
                <Text className='text-[#293751] font-semibold'>{props.texto}</Text>
            </StyledBotao>
        </>
    )
}

export default BtCancelar