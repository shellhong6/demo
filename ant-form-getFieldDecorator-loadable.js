import React, { useState, useEffect } from 'react'
import './my-loadable.scss'

var componentMap = {}

function useLoad (loadComponent, key, setStatus) {
  useEffect(function () {
    !componentMap[key] && loadComponent()
    .then(m => {
      componentMap[key] = m.default ? m.default : m
      setStatus(1)
    }).catch(() => {
      setStatus(-1)
    })
  }, [])
}

function Loadable (loadComponent, loadingComponent, errorComponent, key) {
  let [status, setStatus] = useState(componentMap[key] ? 1 : 0)
  useLoad(loadComponent, key, setStatus)
  if (status === 1) {
    return componentMap[key]
  } else if (status === 0) {
    return () => loadingComponent ? loadingComponent : <p className='component-loading'>Loading</p>
  }
  return () => errorComponent ? errorComponent : <p className='component-error'>Error</p>
}

export default Loadable