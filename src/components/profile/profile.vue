<template>
  <div id="user-profile">
    <img id="profile-image" class="border rounded-circle" :src="userData.avatarUrl">
    <h2>{{ userData.fullName }}</h2>
    <p>{{ userData.currentPosition }}</p>
    <hr>
    <p>{{ userData.about }}</p>
    <div class="row">
      <div class="col-md-6" v-for="topic in userData.topics">
        <div class="user-topic card border">topic</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        avatarUrl: require('../../assets/mystery_man.png'),
        fullName: 'John Doe',
        currentPosition: 'Position',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        topics: ['a', 'b', 'c', 'd']
      }
    }
  }
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
