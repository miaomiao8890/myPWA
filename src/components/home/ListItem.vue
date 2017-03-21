	<template>
  <li class="story-item">
  	<p>{{ item.name }}</p>
    <img :src="item.previewimg">
  </li>
</template>
<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  created () {

  },
  data () {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style>

</style>
