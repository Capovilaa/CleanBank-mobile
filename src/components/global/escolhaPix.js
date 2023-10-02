import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'

const OpcaoPix = (props) => {
    const StyledBt = styled(TouchableOpacity)
    const estilo = `${props.estilo} relative`
    return (
        <>
            <StyledBt className='bg-[#324B77] h-24 w-24 flex flex-col justify-center 
                                items-center rounded-lg 'type='radio' onPress={props.onPress}>
                <Image source={String(props.url)} className={estilo} />
                <Text className='pt-16 absolute text-white font-medium'>{props.texto}</Text>
            </StyledBt>
        </>
    )
}

export default OpcaoPix