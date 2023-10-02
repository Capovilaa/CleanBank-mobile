import React, { useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'

const CompHome = (props) => {    
    const StyledBt = styled(TouchableOpacity)
    const  StyledImg = styled(Image)

    return (
        <>
            <StyledBt>
                <StyledImg source={require({props.url})} className='w-[50px] h-[50px]' />
            </StyledBt>
        </>
    )
}

export default CompHome
