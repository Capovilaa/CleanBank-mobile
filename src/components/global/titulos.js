import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styled } from 'nativewind'

// Títulos que aparecem quando passa de passo

const Titulo = (props) => {
    const StyledText = styled(Text)

    return (
        <>
            <StyledText className='text-[#5A5252] font-bold text-xl italic w-4/5'>
                {props.texto}
            </StyledText>
        </>
    )
}

export default Titulo