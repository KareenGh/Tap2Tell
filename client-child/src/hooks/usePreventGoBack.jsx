import React, { useEffect } from 'react'

export const usePreventGoBack = (navigation) => {
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
          if (e.data.action.type === 'GO_BACK') {
            e.preventDefault();
          }
        })
      })
}