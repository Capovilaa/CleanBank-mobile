import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'
import { withExpoSnack } from 'nativewind'

const Cabecalho = () => {
    // Componentes para estilizar
    const StyledCabecalho = styled(View)
    const StyledImg = styled(Image)

    return (
        <>
            {/* Cabeçalho que aparece na maioria das telas */}           
            
            <StyledCabecalho className='bg-[#324B77] h-1/5 w-full' >
            
                
                {/* Para colocar o ícone no canto */}
                <StyledCabecalho className='w-screen h-1/5 p-2'>
                    <StyledImg source={require('../../img/icon.png')} className='w-10 h-10'/>
                </StyledCabecalho>

                {/* Para centralizar o título */}
                <StyledCabecalho className='w-full h-4/5 flex items-center justify-center'>
                    <Text className='text-white font-semibold text-4xl font-'>CLEAN<br></br>BANK</Text>

                </StyledCabecalho>
            </StyledCabecalho>            
        </>
    )
}

export default withExpoSnack(Cabecalho)