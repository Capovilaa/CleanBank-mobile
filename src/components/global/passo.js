import React, { useState } from 'react'
import { Text } from 'react-native'
import { styled } from 'nativewind'
import { withExpoSnack } from 'nativewind'

const Passo = (props) => {
    return (
        <>
            <Text className='italic font-medium text-2xl w-2/3'>
                {props.texto}
            </Text>
        </>
    )
}

export default Passo