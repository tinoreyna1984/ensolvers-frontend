import { useDispatch, useSelector } from 'react-redux';
import { onCloseNoteModal, onOpenNoteModal } from '../redux/slices/ui/uiSlice';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isNoteModalOpen
    } = useSelector(state => state.ui);

    const openNoteModal = () =>{
        dispatch(onOpenNoteModal());
    }

    const closeNoteModal = () =>{
        dispatch(onCloseNoteModal(false));
    }

    const toggleNoteModal = () =>{
        isNoteModalOpen
        ? openNoteModal()
        : closeNoteModal();
    }

    return {
        // Propiedades
        isNoteModalOpen,

        // Métodos
        openNoteModal,
        closeNoteModal,
        toggleNoteModal,
    }
}