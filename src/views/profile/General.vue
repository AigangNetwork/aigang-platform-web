<template>
  <div>
    <UpdatePassword/>
    <div class="horizontal-line"></div>
    <DeactivateAccount/>
  </div>
</template>

<script>
import UpdatePassword from './UpdatePassword'
import DeactivateAccount from './DeactivateAccount'

export default {
  components: {
    UpdatePassword,
    DeactivateAccount
  }
}
</script>
