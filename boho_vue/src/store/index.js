import { createStore } from 'vuex'


export default createStore({
  state() {

   return {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    // isLoading: false
  }
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      // checks if there is already cart
      if (localStorage.getItem('cart')) {
        state.cart =  JSON.parse(localStorage.getItem('cart'))
      // sets up a cart if not
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }

      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
    } else {
        state.token = ''
        state.isAuthenticated = false
    } 
    },
    addToCart(state, item) {
      // checks if the item is already in the cart and adds to the total quantity
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))     
    },
    // setIsLoading(state, status) {
    //   state.isLoading = status
    // }

    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
  },  
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
  },
  clearCart(state) {
    state.cart = { items: [] }

    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
},
  actions: {
  },
  modules: {
  }
})



// refrence used: https://bestofvue.com/repo/connor11528-vuex-shopping-cart
// https://codesource.io/build-a-shopping-cart-with-vue-vuex-vue-material-design/
// https://www.digitalocean.com/community/tutorials/how-to-build-a-shopping-cart-with-vue-3-and-vue