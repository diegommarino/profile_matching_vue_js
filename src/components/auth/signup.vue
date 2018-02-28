<template>
<div id="signin" class="text-center">
  <form class="form-signin" @submit.prevent="onSubmit">
    <img id="signin-logo" class="mb-4" src="@/assets/shuffle.png" alt="">
    <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="email" class="sr-only">Email address</label>
        <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Email address"
            :class="{'is-invalid': $v.email.$error}"
            @blur="$v.email.$touch()"
            v-model.lazy="email">
        <div class="invalid-feedback" v-if="!$v.email.required">- This field must not be empty.</div>
        <div class="invalid-feedback" v-if="!$v.email.email">- Enter a valid email.</div>
      </div>

      <div class="form-group col-md-12">
        <label for="password" class="sr-only">Password</label>
        <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            :class="{'is-invalid': $v.password.$error}"
            @blur="$v.password.$touch()"
            v-model.lazy="password">
        <div class="invalid-feedback" v-if="!$v.password.required">- This field must not be empty.</div>
        <div class="invalid-feedback" v-if="!$v.password.minLen">- Your password must have at least {{ $v.password.$params.minLen.min }} characters.</div>
      </div>

      <div class="form-group col-md-12">
        <label for="passwordConfirmation" class="sr-only">Password</label>
        <input
            type="password"
            id="passwordConfirmation"
            class="form-control"
            placeholder="Confirm Password"
            :class="{'is-invalid': $v.passwordConfirmation.$error}"
            @blur="$v.passwordConfirmation.$touch()"
            v-model.lazy="passwordConfirmation">
        <div class="invalid-feedback" v-if="!$v.passwordConfirmation.required">- This field must not be empty.</div>
        <div class="invalid-feedback" v-if="!$v.passwordConfirmation.sameAs">- Passwords are different.</div>
      </div>
    </div>
    <br>
    <button
        class="btn btn-lg btn-theme btn-block"
        type="submit"
        :disabled="$v.$invalid">
      Sign in
    </button>
  </form>
</div>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'SignUp',

  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLen: minLength(6)
    },
    passwordConfirmation: {
      required,
      sameAs: sameAs('password')
    }
  },

  methods: {
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
    }
  }
}
</script>

<style scoped>
#signin {
  width: 30em;
  margin: auto;
}

#signin-logo {
  width: 10em;
}
</style>
