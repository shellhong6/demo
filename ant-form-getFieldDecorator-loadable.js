import React, { useState, useEffect } from 'react'
import './my-loadable.scss'

var map = {}

function useLoad (props, loadComponent, ErrorCom, setModule, key) {
  useEffect(function () {
    loadComponent()
    .then(m => {
      let Module = m.default ? m.default : m
      map[key] = Module
      setModule(<Module { ...props }/>)
    }).catch((error) => {
      setModule(ErrorCom)
      console.log(error)
    })
  }, [])
}

function loadable (loadComponent, loadingComponent, errorComponent, key) {
  const LoadingCom = (loadingComponent ? loadingComponent : <p className='component-loading'> Loading </p>)
  const ErrorCom = errorComponent ? errorComponent : <p className='component-error'> Error </p>
  if (map[key]) {
    return map[key]
  }

  var AsyncComponent = function (props) {
    var [module, setModule] = useState(LoadingCom)
    useLoad(props, loadComponent, ErrorCom, setModule, key)
    return module
  }

  return AsyncComponent
}

export default loadable