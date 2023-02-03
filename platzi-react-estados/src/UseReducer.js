import React, { useEffect, useReducer } from "react";

export const UseReducer = (props) => {
  const SECURITY_CODE = "paradigma";
  const initialState = {
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  };
  const actionTypes = {
    confirm: "CONFIRM",
    error: "ERROR",
    check: "CHECK",
    deleted: "DELETED",
    reset: "RESET",
    decline: "DECLINE",
    write: "WRITE",
  };
  const reducerObject = (state, payload) => ({
    [actionTypes.error]: {
      ...state,
      value: "",
      error: true,
      loading: false,
    },
    [actionTypes.check]: {
      ...state,
      loading: true,
      error: false,
    },
    [actionTypes.confirm]: {
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    },
    [actionTypes.write]: {
      ...state,
      value: payload,
    },
    [actionTypes.deleted]: {
      ...state,
      deleted: true,
    },
    [actionTypes.decline]: {
      ...state,
      value: "",
      confirmed: false,
    },
    [actionTypes.reset]: {
      ...state,
      value: "",
      deleted: false,
      confirmed: false,
    },
  });
  const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
      return reducerObject(state, action.payload)[action.type];
    } else {
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onWritte = (e) => dispatch({ type: actionTypes.write, payload: e.target.value });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDeleted = () => dispatch({ type: actionTypes.deleted });
  const onReset = () => dispatch({ type: actionTypes.decline });

  useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <>
        <h2>Eliminar {props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {state.error && !state.loading && <p>Error: el código es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}

        <input
          value={state.value}
          placeholder="Código de seguridad"
          onChange={onWritte}
        />
        <button onClick={onCheck}>Comprobar</button>
      </>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <>
        <p>¿Seguro que quieres eliminar UseState?</p>
        <button onClick={onDeleted}>Sí, eliminar</button>
        <button onClick={onReset}>No, volver</button>
      </>
    );
  } else {
    return (
      <>
        <p>Eliminado con éxito</p>
        <button onClick={() => dispatch({ type: actionTypes.reset })}>
          Resetear, volver atrás
        </button>
      </>
    );
  }
};

// const reducer = (state, action) => {

// }

// const reducer1 = (state, action) => {
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false
//         };
//     } else if (action.type === 'CHECK') {
//         return {
//             ...state,
//             loading: true
//         }
//     } else {
//         return {
//             ...state
//         }
//     }
// }

// const reducerSwitch = (state, action) => {
//     switch (action.type) {
//         case 'Error':
//             return {
//                 ...state,
//                 error: true,
//                 loading: false
//             }
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true
//             };
//         default:
//             return {
//                 ...state
//             };
//     }
// };
