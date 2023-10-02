import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'
import { withExpoSnack } from 'nativewind'

const TelaFundo = (props) => {
    const StyledView = styled(View)
    const StyledImage = styled(Image)

    return (
        <>
            {/* Fundo de tela */}
            <StyledView className='bg-[#324B77] w-screen h-screen  relative'>

                {/* Para fazer o cabeçalho */}
                <StyledView className='w-screen h-1/5 items-center'>

                    {/* Ícone */}
                    <StyledView className='w-5/6 h-3/4'>
                        <StyledImage source={require('../../img/icon.png')} className='h-10 w-10 mt-8' />
                    </StyledView>

                    {/* Título da página */}
                    <StyledView className='w-5/6 h-1/4'>
                        <Text className='text-white  text-xl pl-4'>
                            {props.titulo}
                        </Text>
                    </StyledView>

                </StyledView>
            </StyledView>
        </>
    )
}

export default TelaFundo