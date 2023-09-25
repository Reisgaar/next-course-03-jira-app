import { UIState } from './';

type UIActionType =
    | { type: 'UI - Open Sidebar' }
    | { type: 'UI - Close Sidebar' }
    | { type: 'UI - Set isAddingEntry', payload: boolean }
    | { type: 'UI - Start Dragging' }
    | { type: 'UI - End Dragging' }

// Recibe un estado y produce un nuevo estado
// No es bueno que llame logs
// Debe resolver todo sin salir de la función
// No puede ser asíncrono
export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
    
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sideMenuIsOpen: true
            }
        case 'UI - Close Sidebar':
            return {
                ...state,
                sideMenuIsOpen: false
            }
        case 'UI - Set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload
            }
        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging: true
            }
        case 'UI - End Dragging':
            return {
                ...state,
                isDragging: false
            }
        default:
            return state;
    }
    
}