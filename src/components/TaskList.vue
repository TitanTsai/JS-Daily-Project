<template>
    <div class="sidebar">
        <ul class="sb_catlist">
            <li class="sb_main" @click="filterCat()">Overview</li>
            <li class="sb_span"><img src="../assets/images/sort.svg"> Category</li>
            <li class="sb_catlink" v-for="type in types" :key="type.typename"  @click="filterCat(type.typeName)"><span class="sb_colortag" :style="{backgroundColor:`${type.color}`}"></span>{{type.typeName}}</li>
            <li class="sb_addCat">+ add category</li>
        </ul>
    </div>
    <div class="task-list">
        <div class="task-item" v-for="task in filterList" :key="task.id">
            <div class="task-item-left">
                <input type="checkbox" v-model="task.isDone" :id="task.id" @click="markDone(task)">
                <label :for="task.id" class="task-item-name" :class="{isDone:task.isDone}"><span :for="task.category" :style="{borderColor:`${indexColor(task.category)}`}"></span>{{task.name}}</label>
            </div>
            <div class="task-item-right">
                <div>{{task.duedate}}</div>
                <div class="remove" :class="{showRemove:task.isDone}" @click="removeTask(task.id)"><img src="../assets/images/remove.svg"></div>
            </div>
            
        </div>
    </div>        
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            taskList: [],
            filterList:[],
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
        width:480px
    }

    .task-item{
        display: flex;
        box-sizing: border-box;
        background-color: var(--highlight);
        width:480px;
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

    .sidebar{
        width:305px;
        position:fixed;
        top:8em;
        left:0;
        z-index:1000;
        min-height:100%;
        text-align: left;
        display: flex;
        justify-content: flex-start;
    }

    .sb_catlist{
        list-style-type: none;
        width:80%;
    }

    .sb_main{
        font-weight:500
    }

    .sb_main, .sb_catlink, .sb_addCat{
        margin:0.5em 0;
        display: flex;
        align-items: center;
        color:var(--white);
        font-size:18px;
        padding:12px;
        border-radius: 8px;
        cursor:pointer;
    }

    .sb_addCat{
        color:var(--disabled)
    }

    .sb_addCat:hover{
        color:var(--white);
        background-color:var(--bright)
    }

    .sb_catlink{
        font-weight:300;
    }

    .sb_catlink:hover{
        background-color:var(--bright)
    }


    .sb_main:hover{
        background-color:var(--bright)
    }

    .sb_span{
        color:var(--disabled);
        font-size:1em;
        padding:8px;        
    }

    .sb_colortag{
        width:12px;
        height:12px;
        display: block;
        border-radius: 6px;
        margin-right:12px;
    }


</style>