<template>
  <div id="user-profile" v-if="profileData">
    <img id="profile-image" class="border rounded-circle" :src="profileData.avatar">
    <h2>{{ fullName }}</h2>
    <p>{{ profileData.current_position }}</p>
    <hr>
    <p>{{ profileData.about }}</p>
    <div class="row">
      <div class="col-md-6" v-for="topic in profileData.topics">
        <div class="user-topic card border">{{ topic }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentProfileMixin } from '@/mixins/profile'

export default {
  mixins: [currentProfileMixin]
}
</script>

<style scoped>
#user-profile {
  width: 30rem;
  margin: auto;
}

#profile-image {
  width: 10rem;
}

.user-topic {
  text-align: left;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}
</style>
