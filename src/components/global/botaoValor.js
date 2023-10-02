import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'

const BotaoValorPix = (props) => {
    const StyledBotao = styled(TouchableOpacity)
    const valor = `+R$${props.valor},00`

    return(
        <>
            <StyledBotao className='' onPress={()=>props.onPress(parseInt(props.valor))}>
                <Text className='font-bold text-[#5A5252] text-xs'>
                    {valor}
                </Text>
            </StyledBotao>
        </>
    )
}

export default BotaoValorPix