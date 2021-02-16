export const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
export const FORM_UPDATE_SINGLE_VALUE = 'FORM_UPDATE_SINGLE_VALUE';

export default formReducer = (state, action) => {
  if (action.type === FORM_UPDATE_SINGLE_VALUE) {
    const updatedValue = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    return {
      ...state,
      inputValues: updatedValue,
    };
  }
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};
