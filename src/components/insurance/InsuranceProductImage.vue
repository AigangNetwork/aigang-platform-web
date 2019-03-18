<template>
  <img class="product-img" :src="imageUrl" />
</template>

<script>
export default {
  props: ['type'],
  computed: {
    imageUrl () {
      if (!this.type) {
        return
      }

      switch (parseInt(this.type)) {
        case 3:
          return '/static/battery.svg'
        case 4:
          return '/static/car.svg'
        case 5:
          return '/static/crops.svg'
        case 6:
          return '/static/drone.svg'
      }
    }
  }
}
</script>
