<template>
    <div class="task-container">
            <div class="task-header">
                <div style="width:75%">
                    <input class="task-input" type="text" v-model.trim="newtask" @keyup.enter="addtask" placeholder="Write Something">
                    <div style="margin-top:1em">
                        <select class="task-category" v-model="category">
                            <option value="" selected>category</option>
                            <option v-for="type in types" :key="type.id">{{type.typename}}</option>
                        </select>

                        <ColorPicker v-model:modelValue="selected"></ColorPicker>
                        
                        
                        <p class="taskOption-label">Due Date:</p>
                        <date-picker v-model:modelValue="dateValue"></date-picker>
                        
                    </div>
                </div>
                <div class="task-add"  @click="addtask()">+</div>
            </div>
            
            <div class="task-list">
                <div class="task-item" v-for="(task,index) in taskList" :key="task.id">
                    <div class="task-name-group">
                        <input type="checkbox" :id="task.id" v-model="task.isdone">
                        <label :for="task.id" class="task-name" :class="{isdone:task.isdone}"><span :for="task.category" :style="{borderColor:getColor(task.category)}"></span>{{task.name}}</label>
                    </div>
                    
                    <div class="btn-group">
                        <div class="task-date">{{task.duedate}}</div>
                        <div class="remove_btn" :class="{showRemove:task.isdone}" @click="removetask(index)"><img src="../assets/images/remove.svg"></div>
                    </div>
                </div>  
            </div>
        </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import ColorPicker from '@/components/ColorPicker'
import EventService from '@/services/EventService.js'
export default {
  components: { DatePicker, ColorPicker },
    data(){
        return{
            category:'',
            dateValue:'',
            selected:'',
            newtask:'',
            taskList:[],
            types:[{'typename':'business','color':'#524EEE'},{'typename':'personal','color':'#6FCF97'},{'typename':'important','color':'#D06969'}]
            }
    },
    created(){
        EventService.getTasks()
        .then(response=>{
            this.taskList = response.data
        })
        .catch(error=>{
            console.log(error)
        }),
        EventService.getCategory()
        .then(response=>{
            console.log(response.data)
        })
    },
    methods:{
        addtask(){
            if(this.newtask.trim().length===0){
                return
            }

            this.taskList.unshift({'id':this.taskList.length ,'name':this.newtask,'category':this.selected,'duedate':this.dateValue,'isdone':false})
            this.newtask=''
            this.dateValue=''
        },
        removetask(index){
            this.taskList.splice(index,1)
        },
        getColor(catname){
            if(!catname){
                return
            }

            let catcolor= this.types.find(type => type.typename===catname).color;
            return `${catcolor}`;
        }           
    }
}
</script>

<style scoped>
    .task-container{
        width:30em;
        margin:1em;
    }

    .task-header{
        display:flex;
        justify-content:space-between;
        padding:1.5em 2em;
        background:var(--highlight);
        border-radius: 1em;
    }

    .task-input{
        background-color: transparent;
        border:none;
        color:var(--white);
        font-size:32px;
        font-weight: 300;
        width:100%
    }

    input::placeholder{
        color:var(--white)
    }

    .task-add{
        width: 40px;
        height:40px;
        border-radius: 50%;
        text-align: center;
        align-items: center;
        vertical-align: middle;
        font-weight: 300;
        font-size: 32px;
        color:var(--truewhite);
        background-color: var(--primary);
        cursor: pointer;
    }

    .task-add:hover{
        background-color:var(--contrast)
    }

    .task-item{
        border-radius: 1em;
        display: flex;
        align-items:center;
        justify-content: space-between;
        background-color: var(--highlight);
        margin-bottom:1em;
        padding:0 1em;
        height:75px;
    }

    select {
        appearance: none;
        -webkit-appearance: none;
        background-color: var(--background);
        border: none;
        padding: 4px 6px;
        border-radius:6px;
        color:var(--white);
        font-size:1em;
        cursor: pointer;
        width:80px;
    }

    select::-ms-expand{
        display: none;
    }

    .date-selector{
        width:80px;
        background-color: var(--background);
        padding:4px 6px;
        border-radius: 6px;
        margin-left:1em;
        border:none;
        font-size:1em;
        font-weight:300;
        color:var(--white);
        text-align:center;
    }

    .task-list{
        height:23em;
        overflow: auto;
        margin-top:1.2em;
    }

    .task-name-group input{
        display:inline-block;
        margin:auto 0.5em;
    }

    .task-name-group{
        display:inline-flex;
        margin:auto 0;
    }

    input[type="checkbox"]{
        display:none;
    }

    input[type="checkbox"] + label span {
        display: inline-flex;
        box-sizing: border-box;
        width:21px;
        height:21px;
        border:3px solid;
        border-color:var(--contrast);
        border-radius:6px;
        cursor:pointer;
        margin:auto 0.5em;
    }

    input[type="checkbox"]:checked + label span{
        background:url("../assets/images/check.svg") 1px 2px no-repeat, #42416C;
    }

    .task-name{
        color:var(--white);
        font-weight: 200;
        font-size:24px;
        line-height:inherit;
    }

    .task-date{
        padding:2px 8px;
        border-radius: 6px;
        background-color: var(--secondary);
        color:var(--white)
    }

    .btn-group{
        display:flex;
    }

    .remove_btn{
        display:none;
        cursor:pointer;
    }

    .showRemove{
        display:inline-block;
        margin-left:1em;
        margin-right:0.5em;
        padding:0;
    }

    .isdone{
        color:var(--disabled);
        text-decoration: line-through;
    }

</style>