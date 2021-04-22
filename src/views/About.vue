<template>
  <div class="about">
    <h1>Components</h1>
    <!--<SimpleCarousel></SimpleCarousel>-->
    
    <div class="container">
      <!--<SimpleCalculator></SimpleCalculator>
      <TaskList></TaskList>-->
      <DatePicker></DatePicker>
    </div>
  </div>
</template>

<script>

//import SimpleCalculator from '@/components/SimpleCalculator'
//import SimpleCarousel from '@/components/SimpleCarousel'
//import TaskList from '@/components/TaskList'
import DatePicker from '@/components/DatePicker'
export default {
  components:{
    //SimpleCalculator,
    //SimpleCarousel,
    //TaskList,
    DatePicker
  }
}
</script>

<style>
  .container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin:5em 0;
  }
</style>