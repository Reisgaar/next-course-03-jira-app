// El provider es el que va a proveer al resto de componentes la información almanecenada en el provider.
// Se englobarán los componentes que quieran acceder al provider con el tag <UIProvider></UIProvider>

import React from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sideMenuIsOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuIsOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

interface Props {
    children: JSX.Element
}

export const UIProvider: React.FC<Props> = ({ children }) => {

    const [state, dispatch] = React.useReducer(uiReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({ type: 'UI - Open Sidebar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: 'UI - Close Sidebar' });
    }

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: 'UI - Set isAddingEntry', payload: isAdding });
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging'});
    }

  return (
    <UIContext.Provider value={{
        ...state,
        // Functions
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        endDragging
    }}>
        { children }
    </UIContext.Provider>
  )
}

