<template>
    <div>
        <!-- <SideBar/> -->
    </div>
    <div class="task-container">
        <TaskInput />
        <TaskList />
    </div>
    
</template>

<script>
import TaskInput from '@/components/TaskInput'
import TaskList from '@/components/TaskList'
// import SideBar from '@/components/SideBar'
export default {
    components:{
        // SideBar,
        TaskInput,
        TaskList
    }
}
</script>

<style scoped>
    .task-container{
        width:480px;
        margin:1em;
        margin:auto;
    }

</style>