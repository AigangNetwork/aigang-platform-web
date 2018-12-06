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

      switch (this.type.toUpperCase()) {
        case 'ANDROIDDEVICEINSURANCE':
          return '/static/battery.svg'
        case 'TESLAINSURANCE':
          return '/static/car.svg'
        case 'CROPSINSURANCE':
          return '/static/crops.svg'
        case 'DRONEINSURANCE':
          return '/static/drone.svg'
      }
    }
  }
}
</script>
