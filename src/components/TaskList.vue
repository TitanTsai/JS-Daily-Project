<template>
    <div class="task-container">
        <div class="task-header">
            <div class="task-input">
                <input v-model="taskName" placeholder="Write Somthing" @keypress.enter="addTask()">
                <div class="task-add-btn" @click="addTask()">+</div>
            </div>
            <div class="task-options">
                <!--<div class="task-category">
                    <p class="taskOption-label">Category:</p>
                </div>-->
                <div class="task-duedate">
                    <p class="taskOption-label">Due Date</p>
                    <DateInput v-model:modelValue="dateValue"></DateInput>
                </div>
                <p>{{dateValue}}</p>
            </div>
        </div>
        <div class="task-list">
            <div class="task-item" v-for="(task,index) in taskList" :key="index">
                <div class="task-item-left">
                    <input type="checkbox" v-model="task.isDone" :id="task.id">
                    <label :for="task.id" :class="{isDone:task.isDone}" class="task-item-name"><span></span>{{task.name}}</label>
                </div>
                <div class="task-item-right">
                    <div>{{task.duedate}}</div>
                    <div class="remove" :class="{showRemove:task.isDone}" @click="removeTask(index)"><img src="../assets/images/remove.svg"></div>
                </div>
                
            </div>
        </div>
        
    </div>
    
</template>

<script>
import DateInput from '@/components/DatePicker'
import EventService from '@/services/EventService.js'

export default {
    components:{DateInput},
    data(){
        return{
            taskName:'',
            taskList:null,
            taskIndex:0,
            dateValue:'',
        }
    },
    created(){
        EventService.getTasks()
        .then(response=>{
            this.taskList = response.data
        })
        .catch(error=>{
            console.log(error)
        })
    },
    methods:{
        addTask(){
            if(this.taskName.trim().length===0){
                return
            }

            this.taskList.unshift({'id':this.taskList.length ,'name':this.taskName,'category':this.category,'duedate':this.dateValue,'isDone':false});
            this.taskName=''
        },
        removeTask(index){
            this.taskList.splice(index,1)
        }
    },
}
</script>

<style scoped>
    .task-container{
        width:480px;
        margin:1em;
    }

    .task-header{
        width:480px;
        height: 240px;
        background-color:var(--highlight);
        border-radius: 1em;
        padding:2em;
        box-sizing: border-box;
        margin-bottom:1em;
    }

    .task-input{
        display:flex;
        width:100%;
        justify-content: space-between;
    }

    .task-input input{
        font-weight: 500;
        font-size:2em;
        background-color:transparent;
        color:var(--truewhite);
        border:none;
        border-bottom:1px solid var(--upper);
        padding-bottom:0.25em;
        -webkit-appearance: none;
        margin-bottom: 1em;
        width:340px;
    }

    .task-add-btn{
        background-color:var(--primary);
        width:40px;
        height:40px;
        display: flex;
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        color:var(--truewhite);
        font-size: 2em;
    }

    .task-add-btn:hover{
        background-color: var(--caption);
    }

    .task-catagory, .task-duedate{
        display: block;
        text-align: left;
    }

    .taskOption-label{
        display:block;
        margin:0;
        color:var(--caption);
        font-size:1em;
        margin-bottom: 0.5em;
    }

    .task-list{
        width:480px
    }

    .task-item{
        display: flex;
        box-sizing: border-box;
        background-color: var(--highlight);
        width:480px;
        border-radius: 1em;
        padding:1em;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
    }

    .task-item-name{
        font-weight:300;
        font-size:1.5em;
        color:var(--white);
        padding-left:0.5em;
    }

    .task-item-right{
        display:inline-flex;
        align-self: center;
    }

    .remove{
        display: none;
    }

    .showRemove{
        display: block;
    }

    .isDone{
        text-decoration: line-through;
        color:var(--disabled)
    }

</style>