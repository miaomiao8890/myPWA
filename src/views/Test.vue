<template>
  <div class="test-page">
    <ul class="test-list">
      <ListItem v-for="item in homeList"
        :key="item.cid"
        :item="item">
      </ListItem>
    </ul>
    <div class="spinner-box" v-show="isHomeDataRequesting">
      <Spinner class="spinner"></Spinner>
    </div>
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
      if (!this.isHomeInitDataLoaded) {
        this.$store.dispatch('fetchHomeInitData')
      }
    }
  }
</script>

<style>
  .test-page {
    padding: 20px;
    background-color: #eee;
  }
  .test-list {
    position: relative;
    z-index: 10;
    font-size: 22px;
  }
</style>
