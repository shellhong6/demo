import React from 'react'
import Loadable from 'react-loadable'
var map = {}

function getLoadableComponent(componentName) {
  if (map[componentName]) {
    return map[componentName]
  }
  var myComponent = Loadable({
    loader: () => import('../form-items/' + componentName),
    loading: Loading,
  }) 
  map[componentName] = myComponent
  return myComponent
}

function Loading() {
  return <p className='component-loading'> Loading </p>
}
  
export default getLoadableComponent