import { useDispatch } from 'react-redux';
import { AppThunkDispatch } from 'app/types/redux';

export const useAppDispatch: () => AppThunkDispatch = useDispatch;

export default useAppDispatch;
