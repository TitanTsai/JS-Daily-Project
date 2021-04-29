<template>
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
export default {
    props:{filterValue:String},
    data(){
        return{
            taskList: [],
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
            axios.get('http://localhost:3000/taskList/')
            .then(response=>{

                this.taskList = response.data;
                this.filterList = this.taskList;
            })
            .catch(()=>{
                alert('This App requires JSON Server Running')
            })
        },

        removeTask(index){
            axios.delete('http://localhost:3000/taskList/' + index)
            .then(() => {this.taskList.splice(index,1)})
            .catch((error)=>{console.log(error)});
            
            this.getTask()
        },

        markDone(item){
            if(item.isDone === false){
                axios.patch('http://localhost:3000/taskList/' + item.id, {isDone: true})
                .then(()=> {})
                .catch((error)=>{console.log(error)});
            }else{
            axios.patch('http://localhost:3000/taskList/' + item.id, {isDone: false})
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
        }
        
    },
}
</script>

<style scoped>

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