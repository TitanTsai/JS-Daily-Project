<template>
    <div class="container">
        <div>
            <SideBar @filterSelected="applyFilter"/>
        </div>
        <div class="row">
            <div class="col-12 col-md-10 col-lg-5 task-container">
                <TaskList :filterValue="filterName" />
            </div>
        </div>
    </div>
</template>

<script>
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