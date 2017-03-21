<template>
  <div class="home-page">
    <!-- <ul class="home-list">
      <ListItem v-for="item in homeList"
        :key="item.cid"
        :item="item">
      </ListItem>
    </ul> -->

    <waterfall
      :align="align"
      :line-gap="100"
      :min-line-gap="100"
      :max-line-gap="220"
      :single-max-width="300"
      :watch="items"
      @reflowed="reflowed"
      ref="waterfall"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <waterfall-slot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :order="index"
        :key="item.index"
        move-class="item-move"
      >
        <div class="item" :style="item.style" :index="item"><img :src="item.url" /></div>
      </waterfall-slot>
    </waterfall>

    <div class="spinner-box" v-show="isHomeDataRequesting">
      <Spinner class="spinner"></Spinner>
    </div>
  </div>
</template>

<script>

  var ItemFactory = (function () {

    var lastIndex = 0

    function generateRandomItems (count) {
      var items = [], i
      for (i = 0; i < count; i++) {
        items[i] = {
          index: lastIndex++,
          style: {
            background: getRandomColor()
          },
          width: 100 + ~~(Math.random() * 50),
          height: 150 + ~~(Math.random() * 50)
        }
      }
      return items
    }

    function getRandomColor () {
      var colors = [
        'rgba(21,174,103,.5)',
        'rgba(245,163,59,.5)',
        'rgba(255,230,135,.5)',
        'rgba(194,217,78,.5)',
        'rgba(195,123,177,.5)',
        'rgba(125,205,244,.5)'
      ]
      return colors[~~(Math.random() * colors.length)]
    }

    return {
      get: generateRandomItems
    }

  })()

  const fetchHomeInitData = store => {
    return store.dispatch('fetchHomeInitData')
  }
  import {mapGetters, mapActions} from 'vuex'

  import Spinner from '../components/common/Spinner.vue'
  import ListItem from '../components/home/ListItem.vue'

  import Waterfall from 'vue-waterfall/lib/waterfall.vue'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot.vue'

  import { getScrollTop, getClientHeight, getScrollHeight } from "../utils/utils";

  export default {
    components: {
      Spinner,
      ListItem,
      Waterfall,
      WaterfallSlot
    },
    computed: {
      ...mapGetters({
        homeList: 'getHomeList',
        isHomeInitDataLoaded: 'getIsHomeInitDataLoaded',
        isHomeDataRequesting: 'getIsHomeDataRequesting'
      })
    },
    preFetch: fetchHomeInitData,
    data() {
      return {
        align: 'center',
        items: [],
        isBusy: false,
        currentPage: 0,
        isLoading: false,
      }
    },
    beforeMount() {
      if (!this.isHomeInitDataLoaded) {
        this.$store.dispatch('fetchHomeInitData')
      }
      this.currentPage++
    },
    mounted() {
      if (this.homeList) {
        this.items = setItems(this.homeList)
      }
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
          if (!this.isLoading) {
            console.log(this.currentPage)
            this.isLoading = true
            this.$store.dispatch("fetchHomeMoreData", {
              page: this.currentPage,
              callback: () => {
                this.isLoading = false
                this.items = this.items.concat(setItems(this.homeList))
              }
            })
          }
        }
      },
      reflowed() {
        this.isBusy = false
      }
    }
  }

  function setItems (data) {
    if (!data) return
    var items = [], i
    for (i = 0; i < data.length; i++) {
      items.push({
        style: {
          background: '#eee'
        },
        url: data[i].url,
        width: 100 + ~~(Math.random() * 50),
        height: 100 + ~~(Math.random() * 50)
      })
    }
    return items
  }
</script>

<style>
  .home-page {
    padding: 5px;
  }
  .home-list {
    background-color: #fff;
    position: relative;
    z-index: 10;
    font-size: 22px;
  }
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .item {
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    font-size: 1.2em;
    color: rgb(0,158,107);
  }
  .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-object-fit: cover;
  }
  .item:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }
  .wf-transition {
    transition: opacity .3s ease;
    -webkit-transition: opacity .3s ease;
  }
  .wf-enter {
    opacity: 0;
  }
</style>
