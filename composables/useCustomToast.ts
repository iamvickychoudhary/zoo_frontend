// composables/useCustomToast.js

import {BToast} from 'bootstrap-vue-next'

export function useCustomToast() {
    const {show} = useToast()

  const showToast = (message:string="",variant:any="success") => {
    show?.({
      props: () => ({
        body: "body",
        variant:variant,
    }),
      component: h(BToast, null, { default: () => `${message}` }),
    })
  }

  return {
    showToast
  }
}
