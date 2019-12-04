import loadable from './my-loadable'
function getLoadableComponent(componentName) {
  return loadable(() => import('../form-items/' + componentName), null, null, componentName)
}
export default getLoadableComponent