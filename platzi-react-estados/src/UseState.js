import React, { useEffect, useState } from "react";

export const UseState = (props) => {

  const SECURITY_CODE = "paradigma";

  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });
  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }
  const onError = () => {
    setState({
      ...state,
      loading: false,
      error: true,
    });
  }
  const onWritte = (e) => {
    setState({ ...state, value: e.target.value });
  }
  const onCheck = () => {
    setState({ ...state, loading: true, error : false });
  }
  const onDeleted = () => {
    setState({
      ...state,
      deleted: true,
    });
  }
  const onReset = () => {
    setState({
      ...state,
      value: '',
      deleted: false,
      confirmed: false,
    });
  }
  useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 2000);
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
      <button
          onClick={onReset}
        >
          Resetear, volver atrás
        </button>
    </>
    )
  }
};
