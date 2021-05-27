<template>
    <div>
        <div class="menu_toggle" @click="showMenu=!showMenu"><img src="../assets/images/menu.svg"></div>
        <div class="sidebar" v-if="showMenu">
            <ul class="sb_catlist">
                <li class="sb_main" @click="filterSelected()">Overview</li>
                <li class="sb_span"><img src="../assets/images/sort.svg"> Category</li>
                <li class="sb_catlink" v-for="type in types" :key="type.typename" @click="filterSelected(type.typeName)"><span class="sb_colortag" :style="{backgroundColor:`${type.color}`}"></span>{{type.typeName}}</li>
                <li class="sb_addCat">+ add category</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    emits: ['filterSelected'],
    data(){
        return{
            types:[],
            showMenu: false,
            winWidth: window.innerWidth
        }
    },
    methods:{
        getTask(){
            axios.get('https://my-json-server.typicode.com/titantsai/JS-Daily-Project/types/')
            .then(response=>{
                this.types = response.data;
            })
            .catch(error =>{
                alert(console.log(error))
            })
        },
        filterSelected(value){
            this.$emit('filterSelected',value);
        },
        getWidth(){
            if(this.winWidth <= 768){
                this.showMenu = false
            }else{
                this.showMenu = true
            }
        }
    },
    created(){
        this.getTask();
        this.getWidth()
        
    },
    watch:{
        winWidth(value){
            this.winWidth = value
            this.getWidth()
        }
    }
}
</script>

<style scoped>
    .sidebar{
        width:305px;
        position:fixed;
        top:0;
        left:0;
        z-index:1;
        min-height:100%;
        text-align: left;
        display: flex;
        justify-content: flex-start;
    }

    .sb_catlist{
        list-style-type: none;
        width:80%;
        margin-top:5em;
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

    .menu_toggle{
        display: none;
        margin:1em;
        padding:0.5em;
        border-radius: 4px;
    }

    .menu_toggle:hover{
        background-color: var(--highlight);
    }

    @media screen and (max-width:768px){
        .menu_toggle{
            display:block;
            position:absolute;
            top:0;
            z-index:2;
        }

        .sidebar{
            background-color: var(--upper);
            box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
        }

    }


        
</style>