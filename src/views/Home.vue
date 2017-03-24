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
      @reflowed="_reflowed"
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
        <div class="item"
          :style="item.style"
          @click="handleDetailShow"
        >
          <img :src="`${item.url}?imageView2/2/w/200`" :data-index="item.index" />
        </div>
      </waterfall-slot>
    </waterfall>

    <div class="home-detail" v-show="isDetailShow">
      <div class="home-detail-bg"></div>
      <div class="home-detail-header"><i class="home-detail-back-btn" @click="handleDetailHide"></i></div>
      <ul id="detailList">
        <li
          v-for="(detailItem, detailIndex) in items"
          :class="[detailIndex == currentIndex ? 'current' : '']"
        >
          <img :src="detailItem.url" />
        </li>
      </ul>
    </div>

    <div class="spinner-box" v-show="!isHomeInitDataLoaded">
      <Spinner class="spinner"></Spinner>
    </div>
    <div class="spinner-more" v-show="isHomeDataRequesting">
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

  import Waterfall from 'vue-waterfall/lib/waterfall.vue'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot.vue'

  import { getScrollTop, getClientHeight, getScrollHeight } from "../utils/utils";
  import Slide from "../utils/slide";

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
    // preFetch: fetchHomeInitData,
    data() {
      return {
        align: 'center',
        items: [],
        isBusy: false,
        currentPage: 0,
        isLoading: false,
        index: 0,
        isDetailShow: false, 
        currentIndex: null
      }
    },
    beforeMount() {
      if (!this.isHomeInitDataLoaded) {
        this.$store.dispatch('fetchHomeInitData', {
          callback: () => {
            this.items = this._setItems(this.homeList)
          }
        })
      }
      this.currentPage++
    },
    mounted() {
      document.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      document.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
          if (!this.isLoading) {
            this.isLoading = true
            this.$store.dispatch("fetchHomeMoreData", {
              page: this.currentPage,
              callback: () => {
                this.isLoading = false
                this.items = this.items.concat(this._setItems(this.homeList))
                this.currentPage++
              }
            })
          }
        }
      },
      handleDetailShow() {
        let i = parseInt(arguments[0].target.dataset.index) || 0
        console.log(this.items[i])
        this.currentIndex = i
        this.isDetailShow = true
        Slide({element: 'detailList', successCallback: () => {}})
      },
      handleDetailHide() {
        this.isDetailShow = false
      },

      _setItems(data) {
        if (!data) return
        var items = [], i
        for (i = 0; i < data.length; i++) {
          items.push({
            style: {
              background: '#eee'
            },
            index: this.index,
            url: data[i].url,
            width: 100 + ~~(Math.random() * 50),
            height: 100 + ~~(Math.random() * 50)
          })
          this.index++
        }
        return items
      },
      _reflowed() {
        this.isBusy = false
      }
    }
  }

</script>

<style>
  .home-page {
    padding: 5px;
  }
  .home-page .spinner-box {
    position: fixed;
    left: 50%;
    margin-left: -16px;
    top: 200px;
    text-align: center;
    z-index: 1;
  }
  .home-page .spinner-more {
    text-align: center;
    margin: 20px auto!important;
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
  .home-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1002;
  }
  .home-detail .home-detail-bg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgb(0,0,0);
    z-index: 1002;
  }
  .home-detail-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.25rem;
    background: #260e08;
    z-index: 1004;
  }
  .home-detail-back-btn {
    position: fixed;
    left: 0;
    top: 0;
    width: 3.25rem;
    height: 3.25rem;
    background: url(../assets/images/white-back-icon.png) center center no-repeat;
    background-size: .625rem 1.1875rem;
    -webkit-background-size: .625rem 1.1875rem;
  }
  .home-detail ul {
    width: 100%;
    height: 80%;
    position: absolute;
    left: 0;
    top: 10%;
  }
  .home-detail ul li {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 1s;
    -webkit-transition: 1s;
    opacity: 0;
    z-index: 1003;
  }
  .home-detail ul li.current {
    opacity: 1;
  }
  .home-detail ul li img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-object-fit: cover;
  }
</style>
