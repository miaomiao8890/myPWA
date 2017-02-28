	<template>
  <li class="story-item">
  	<p>{{ item.cid }}</p>
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
