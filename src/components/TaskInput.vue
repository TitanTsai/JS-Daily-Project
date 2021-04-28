<template>
    <div class="task-header">
        <div class="task-input">
            <input v-model="taskName" placeholder="Write Something" @keypress.enter="addTask()">
            <div class="task-add-btn" @click="addTask()">+</div>
        </div>
        <div class="task-options">
            <div class="task-catagory">
                <!--<p class="taskOption-label">Category:</p>-->
                <ColorPicker v-model:radioValue="selected"></ColorPicker>
            </div>

            
            <div class="task-duedate">
                <!--<p class="taskOption-label">Due Date:</p>-->
                <DateInput  v-model:modelValue="dateValue"></DateInput>
            </div>
        </div>
    </div>
</template>

<script>
import DateInput from '@/components/DatePicker'
import ColorPicker from '@/components/ColorPicker'
import axios from 'axios'
export default {
    components:{
        DateInput,
        ColorPicker
    },
    created(){
        this.getTask()
    },
    data(){
        return{
            taskName:'',
            taskList:null,
            dateValue:'',
            selected:'',
            
        }
    },
    methods:{
        getTask(){
            axios.get('http://localhost:3000/taskList')
            .then(response=>{
                this.taskList = response.data
            })
            .catch(error=>{
                console.log(error)
            })
        },
        addTask(){
            if(this.taskName.trim().length===0){
                return
            }

            let timeStamp = Math.floor(Date.now()) 

            
            let item = {'id':timeStamp ,'name':this.taskName,'category':this.selected,'duedate':this.dateValue,'isDone':false}
            
            axios.post('http://localhost:3000/taskList' ,item)
            .then((response)=>{this.taskList.push(response.data)})
            .catch((error)=>{console.log(error)})
            
            this.taskName=''
        },
    }
}
</script>

<style>
    .task-header{
        width:480px;
        height:235px;
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
        margin-bottom:2em;
    }

    .task-input input{
        font-weight: 300;
        font-size:2em;
        background-color:transparent;
        color:var(--truewhite);
        border:none;
        border-bottom:1px solid var(--upper);
        padding-bottom:0.25em;
        -webkit-appearance: none;
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
        cursor:pointer;
        box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    }

    .task-add-btn:hover{
        background-color: var(--caption);
    }

    .task-catagory, .task-duedate{
        display: block;
        text-align: left;
        margin-bottom: 1em;
    }

    .task-options{
        margin-top:1em;
    }

    .taskOption-label{
        display:block;
        margin:0;
        color:var(--caption);
        font-size:1em;
        margin-bottom: 0.5em;
    }
</style>