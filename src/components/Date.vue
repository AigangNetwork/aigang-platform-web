<template>
  <span>{{date}}</span>
</template>
<script>
import UserLocaleDate from '@/components/mixins/UserLocaleDate'
export default {
  name: 'Date',
  mixins: [UserLocaleDate],
  props: ['dateUtc', 'format'],
  computed: {
    date () {
      return this.userLocaleDate
    }
  }
}
</script>
