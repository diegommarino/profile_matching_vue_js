<template>
  <div id="profile-form">
    <h2 id="form-titte">Create your profile</h2>
    <br>
    <form @submit.prevent="onSubmit">
      <div class="form-row">
        <div class="form-group col-md-6">
          <input type="firstName"
              id="firstName"
              class="form-control"
              placeholder="First Name"
              :class="{'is-invalid': $v.firstName.$error}"
              @blur="$v.firstName.$touch()"
              v-model="firstName">
          <div class="invalid-feedback" v-if="!$v.firstName.required">- This field must not be empty.</div>
        </div>
        <div class="form-group col-md-6">
          <input type="lastName"
              id="lastName"
              class="form-control"
              placeholder="Last Name"
              :class="{'is-invalid': $v.lastName.$error}"
              @blur="$v.lastName.$touch()"
              v-model="lastName">
          <div class="invalid-feedback" v-if="!$v.lastName.required">- This field must not be empty.</div>
        </div>
      </div>

      <div class="text-danger" v-if="!fullNameSize()">- Full name must have only 60 characters.</div>

      <div class="form-row">
        <div class="form-group col-md-12">
          <input
              class="form-control"
              placeholder="Current Position"
              type="currentPosition"
              id="currentPosition"
              :class="{'is-invalid': $v.currentPosition.$error}"
              @blur="$v.currentPosition.$touch()"
              v-model="currentPosition"/>
          <div class="invalid-feedback" v-if="!$v.currentPosition.required">- This field must not be empty.</div>
          <div class="invalid-feedback" v-if="!$v.currentPosition.maxLen">Your position can contain only {{ $v.currentPosition.$params.maxLen.max }} characters.</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-12">
          <textarea
              class="form-control"
              placeholder="About You"
              type="about"
              id="about"
              rows="5"
              :class="{'is-invalid': $v.about.$error}"
              @blur="$v.about.$touch()"
              v-model="about"/>
          <div class="invalid-feedback" v-if="!$v.about.maxLen">- Your position can contain only {{ $v.about.$params.maxLen.max }} characters.</div>
        </div>
      </div>

      <p id="topics-label">Chose your favorite topics (maximun 6).</p>
      <bootstrap-checkbox-board
          :itemsList="topicsList"
          :maxItems="$v.topicsInputs.$params.maxLen.max"
          :v="$v.topicsInputs"
          @updatedBoxes="topicsInputs = $event"
          componentSize="col-md-6">
      </bootstrap-checkbox-board>

      <br>

      <button type="submit" class="btn btn-primary btn-block" :disabled="$v.$invalid">Save</button>
    </form>
  </div>
</template>

<script>
// Importing necessary validations.
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import BootstrapCheckboxBoard from '@/components/general/checkboxes/checkboxBoard.vue'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      currentPosition: '',
      about: '',
      topicsInputs: [],
      topicsList: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    }
  },
  // Fields validation.
  validations: {
    firstName: {
      required
    },
    lastName: {
      required
    },
    currentPosition: {
      required,
      maxLen: maxLength(64)
    },
    about: {
      maxLen: maxLength(255)
    },
    topicsInputs: {
      required,
      maxLen: maxLength(6)
    }
  },

  components: {
    'bootstrap-checkbox-board': BootstrapCheckboxBoard
  },

  methods: {
    onSubmit () {
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        currentPosition: this.currentPosition,
        about: this.about,
        topics: this.topicsInputs
      }
      console.log(formData)
    },
    fullNameSize () {
      return (this.firstName.length + this.lastName.length) <= 60
    }
  }
}
</script>

<style scoped>
#profile-form {
  width: 30em;
  margin: auto;
}

#topics-label, #form-title {
  text-align: left;
}
</style>