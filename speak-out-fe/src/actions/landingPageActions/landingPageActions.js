export const resetNav = (value) => {
  return { type: 'RESET_NAV', payload: value}
 }
 //trigger nav bar reload to display appropriate selected tab based on the pathname
 export const toggle = () => {
  return { type: 'TOGGLE' }
 }