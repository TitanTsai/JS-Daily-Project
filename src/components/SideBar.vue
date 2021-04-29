<template>
    <div class="sidebar">
        <ul class="sb_catlist">
            <li class="sb_main">Overview</li>
            <li class="sb_span"><img src="../assets/images/sort.svg"> Category</li>
            <li class="sb_catlink" v-for="type in types" :key="type.typename"  @click="filterHandler"><span class="sb_colortag" :style="{backgroundColor:`${type.color}`}"></span>{{type.typeName}}</li>
            <li class="sb_addCat">+ add category</li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            types:[]
        }
    },
    methods:{
        getTask(){
            axios.get('http://localhost:3000/types/')
            .then(response=>{
                this.types = response.data;
            })
            .catch(error =>{
                alert(console.log(error))
            })
        },
    },
    created(){
        this.getTask()
    }
}
</script>

<style scoped>
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