import { AppThunkDispatch } from 'app/types/redux';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppThunkDispatch = useDispatch;

export default useAppDispatch;
