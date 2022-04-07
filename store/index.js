
// let user = localStorage.getItem('user');
// if (!user) {
//   user = {
//     userId : -1,
//     token : '', 
//     admin : false
//   }
// }

export const state = () => ({
    status : '',
    user :{ // remplacer par le user du local storage
      userId : -1,
      token : '', 
      admin : false
    }, 
    regex : {
      mail : /^[a-z0-9.\-_]+[@]{1}[a-z0-9.\-_]+[.]{1}[a-z]{2,}$/i,
      name : /^[a-zéèêïëà -]{2,}$/i,
      password : /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/i
    }
  })
  
export const mutations = {

  SET_STATUS : function(state, updatedStatus) {
    state.status = updatedStatus
  },

  LOG_USER: function(state, user) {
    this.$axios.setHeader('Authorization', 'Bearer ' + user.token) 
    // localStorage.setItem('user', user) // il vaut mieux stocker dans un HTTPOnly coockie
    state.user = user
  }, 

  LOGOUT_USER : function (state) {
    state.user = {
      userId : -1, 
      token : '', 
      admin : false
    }
    this.$router.push('/')
  }
}

export const actions = {

  //fonction création de compte :
  register : function ({commit}, userInfos) {
    commit('SET_STATUS', 'loading')
    return new Promise ((resolve, reject) => {
    this.$axios.$post('/auth/signup', userInfos)
      .then(function(res) {
        commit('SET_STATUS', 'created')
        resolve(res)
      })
      .catch(function(err) {
        commit('SET_STATUS', 'create_error')
        reject(err)
      });
    })
  }, 

  //fonction de login
  login : function ({commit}, userInfos) {
    commit('SET_STATUS', 'loading')
    return new Promise ((resolve, reject) => {
      this.$axios.$post('/auth/login', userInfos)
        .then(function(res) {
          commit('SET_STATUS', '')
          commit('LOG_USER', res)
          resolve(res)
        })
        .catch(function(err) {
          commit('SET_STATUS', 'login_error')
          reject(err)
        });
      })
  }
}