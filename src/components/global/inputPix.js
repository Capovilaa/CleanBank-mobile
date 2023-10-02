import React, { useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import { styled } from 'nativewind'

// Componente que vai receber os input

const InputPix = (props) => {
    return (
        <>
            {/* View para juntar tudo */}
            <View className='flex items-center justify-center w-screen pb-8'>

                {/* Input, nele será passado as funções por props */}
                <TextInput className='w-3/5 border-b-2 p-1 border-[#8D8E90] placeholder:text-slate-400 placeholder-[#C5C6C8] 
                text-sm  font-semibold' placeholder={props.placeholder} value={parseInt(props.value)} onChangeText={(e) => {props.onChange(e)}}/>
            </View>

        </>
    )
}

export default InputPix