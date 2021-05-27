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

    <div class="task-list">
        <div class="task-item" v-for="task in filterList" :key="task.id">
            <div class="task-item-left">
                <input type="checkbox" v-model="task.isDone" :id="task.id" @click="markDone(task)">
                <label :for="task.id" class="task-item-name text-wrap" :class="{isDone:task.isDone}"><span :for="task.category" :style="{borderColor:`${indexColor(task.category)}`}"></span>{{task.name}}</label>
            </div>
            <div class="task-item-right">
                <!-- <div>{{task.duedate}}</div> -->
                <div class="remove" :class="{showRemove:task.isDone}" @click="removeTask(task.id)"><img src="../assets/images/remove.svg"></div>
            </div>
           
        </div>
    </div>        
</template>

<script>
import axios from 'axios'
import DateInput from '@/components/DatePicker'
import ColorPicker from '@/components/ColorPicker'

export default {
    components:{
        DateInput,
        ColorPicker
    },
    props:{filterValue:String},
    data(){
        return{
            taskName:'',
            taskList:null,
            dateValue:'',
            selected:'',

            filterList:[],
            // filterValue:'',
            types:
                [{'typeName':'Business','color':'#6FCF97'},
                {'typeName':'Personal','color':'#524EEE'},
                {'typeName':'Important','color':'#D06969'}],
            isFiltered: false
        }
    },
    created(){
        this.getTask()
    },
    watch:{
        filterValue:{
            deep:true,
            handler(newVal){
                this.filterCat(newVal)
            }
        }
    },
    methods:{
        getTask(){
            axios.get('https://my-json-server.typicode.com/titantsai/JS-Daily-Project/taskList/')
            .then(response=>{

                this.taskList = response.data;
                this.filterList = this.taskList;
            })
            .catch(()=>{
                alert('This App requires JSON Server Running')
            })
        },

        addTask(){
            if(this.taskName.trim().length===0){
                return
            }

            let timeStamp = Math.floor(Date.now()) 

            
            let item = {'id':timeStamp ,'name':this.taskName,'category':this.selected,'duedate':this.dateValue,'isDone':false}
            
            axios.post('https://my-json-server.typicode.com/titantsai/JS-Daily-Project/taskList' ,item)
            .then((response)=>{this.taskList.push(response.data)})
            .catch((error)=>{console.log(error)})
            
            this.taskName=''
        },

        removeTask(index){
            axios.delete('https://my-json-server.typicode.com/titantsai/JS-Daily-Project/taskList/' + index)
            .then(() => {this.taskList.splice(index,1)})
            .catch((error)=>{console.log(error)});
            
            this.getTask()
        },

        markDone(item){
            if(item.isDone === false){
                axios.patch('https://my-json-server.typicode.com/titantsai/JS-Daily-Project/taskList/' + item.id, {isDone: true})
                .then(()=> {})
                .catch((error)=>{console.log(error)});
            }else{
            axios.patch('https://my-json-server.typicode.com/titantsai/JS-Daily-Project/taskList/' + item.id, {isDone: false})
            .then(()=> {})
            .catch((error)=>{console.log(error)});}
        },

        indexColor(index){
            if(!index){return '#4E2ECF'}
            let color = this.types.find( element=>element.typeName === index).color
            return color
        },
        
        filterCat(value){
            this.filterList = this.taskList;
            let filterArray=[];
            if(!value){filterArray = this.filterList}
            else{
            filterArray = this.filterList.filter(item=>{return item.category.includes(value)})}
            this.filterList = filterArray;
        },

    },
}
</script>

<style scoped>

    .task-header{
        height:235px;
        background-color:var(--highlight);
        border-radius: 1em;
        padding:2em;
        height:240px;
        box-sizing: border-box;
        margin-bottom:1em;
    }

    .task-input{
        display:flex;
        width:100%;
        justify-content: space-between;
        margin-bottom:1em;
    }

    .task-input input{
        font-weight: 300;
        font-size:2em;
        background-color:transparent;
        color:var(--truewhite);
        border:none;
        border-bottom:1px solid var(--upper);
        padding-bottom:4px;
        -webkit-appearance: none;
        width:75%;
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

    @media screen and (max-width:768px){
        .task-header{
            padding:1.5em;
        }
        .task-input input{
            font-size:1.5em;
            padding-bottom:6px;
        }
    }

    .task-list{
        width:100%;
    }

    .task-item{
        display: flex;
        box-sizing: border-box;
        background-color: var(--highlight);
        height:75px;
        border-radius: 1em;
        padding:1.5em;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1em;
    }

    .task-item-name{
        font-weight:300;
        font-size:1.2em;
        color:var(--white);
        margin:auto 0;
    }

    .task-item-right{
        display:inline-flex;
        align-self: center;
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
        margin-right:0.5em;
    }

    input[type="checkbox"]:checked + label span{
        background:url("../assets/images/check.svg") 1px 2px no-repeat, #42416C;
    }

    .remove{
        display: none;
        margin-left:1em;
    }

    .showRemove{
        display: block;
    }

    .isDone{
        text-decoration: line-through;
        color:var(--disabled)
    }

    @media screen and (max-width:768px){
        .task-item{
            padding:1em;
        }

        .task-item-name{
            font-size:1em;
            word-wrap:normal
        }
    }
</style>