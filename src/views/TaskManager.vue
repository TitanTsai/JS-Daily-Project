<template>
    <div class="wrapper">
        <div>
            <SideBar @filterSelected="applyFilter"/>
        </div>
        <div class="row">
            <div class="task-container">
                
                <TaskInput />
                <TaskList :filterValue="filterName" />
            </div>
        </div>
    </div>
</template>

<script>
import TaskInput from '@/components/TaskInput'
import TaskList from '@/components/TaskList'
import SideBar from '@/components/SideBar'
export default {

    data(){
        return{
            filterName:'',
        }
    },
    components:{
        SideBar,
        TaskInput,
        TaskList
    },
    methods:{
        applyFilter($event){
            this.filterName=$event
        }
    }
}
</script>

<style scoped>

    .task-container{
        margin-top:5em;
        margin-right:auto;
        margin-left:auto;
    }
    

</style>