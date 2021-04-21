<template>
  <div class="about">
    <h1>This is an about page</h1>
    <SimpleCarousel></SimpleCarousel>
    <SimpleCalculator></SimpleCalculator>
    <TaskList></TaskList>
  </div>
</template>

<script>

import SimpleCalculator from '@/components/SimpleCalculator'
import SimpleCarousel from '@/components/SimpleCarousel'
import TaskList from '@/components/TaskList'
export default {
  components:{
    SimpleCalculator,
    SimpleCarousel,
    TaskList
  }
}
</script>

<style>

</style>