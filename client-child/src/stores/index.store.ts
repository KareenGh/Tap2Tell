import React, { createContext, createElement, useContext, Context } from 'react';
import { LetterImageStore } from './letterImage.store'

// LetterImageStore context:
const LetterImageStoreContext: React.Context<LetterImageStore | null> = createContext<LetterImageStore | null>(null) //create Context

export const LetterImageStoreProvider: React.FC = ({ children }) => createElement(LetterImageStoreContext.Provider, { value: new LetterImageStore() }, children) //create Context Provider to wrap App

export const useLetterImageStoreContext = () => useContext(LetterImageStoreContext) //create a custom hook which gives the component access to the LetterStore through Context
