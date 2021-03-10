import React, { useReducer, useEffect } from 'react'
import { TextField } from "@material-ui/core"

import { validate } from '../../util/validators.js'
// import './Input.css'


// Input of Login page
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element =
        props.element === 'input' ? (
            // <input
            //     id={props.id}
            //     type={props.type}
            //     placeholder={props.placeholder}
            //     onChange={changeHandler}
            //     onBlur={touchHandler}
            //     value={inputState.value}
            // />
            <TextField error={!inputState.isValid && inputState.isTouched}
                id={props.id}
                label={props.label}
                variant="outlined"
                fullWidth
                type={props.type}
                helperText={!inputState.isValid && inputState.isTouched && props.errorText}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}

                onBlur={touchHandler}
                value={inputState.value}
            />
        );

    return (
        // <div
        //     className={`form-control ${!inputState.isValid && inputState.isTouched &&
        //         'form-control--invalid'}`}
        // >
        //     <label htmlFor={props.id}>{props.label}</label>
        //     {element}
        //     {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        // </div>
        // <TextField error={!inputState.isValid && inputState.isTouched}
        //     id={props.id} 
        //     label={props.label}
        //     variant="outlined"
        //     fullWidth
        //     type={props.type}
        //     helperText={!inputState.isValid && inputState.isTouched && props.errorText}
        // />
        <React.Fragment>
            { element }
        </React.Fragment>
    );
};

export default Input;