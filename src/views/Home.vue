<template>
  <div class="home">
    <p>HOME</p>
    <ul class="home-list">
      <ListItem v-for="item in homeList"
        :key="item.cid"
        :item="item">
      </ListItem>
    </ul>
<!--     <div class="spinner-box" v-show="isHomeDataRequesting">
      <Spinner class="spinner"></Spinner>
    </div> -->
  </div>
</template>

<script>

  const fetchHomeInitData = store => {
    return store.dispatch('fetchHomeInitData')
  }
  import {mapGetters, mapActions} from 'vuex'

  import Spinner from '../components/common/Spinner.vue'
  import ListItem from '../components/home/ListItem.vue'

  export default {
    components: {
      Spinner,
      ListItem
    },
    computed: {
      ...mapGetters({
        homeList: 'getHomeList',
        isHomeInitDataLoaded: 'getIsHomeInitDataLoaded',
        isHomeDataRequesting: 'getIsHomeDataRequesting'
      })
    },
    preFetch: fetchHomeInitData,
    beforeMount() {
      fetchHomeInitData(this.$store)
    },
    mounted() {
      console.log(this.$store.state)
      if (!this.isHomeInitDataLoaded) {
        this.$store.dispatch('fetchHomeInitData')
      }
    }
  }
</script>

<style>
  .spinner-box {
    text-align: center;
    margin: 200px auto!important;
  }
  .spinner-box .spinner {
    width: 32px;
    height: 32px;

    /* svg style */
    fill: #444;
    stroke: #69717d;
  }
</style>
