<template>
    <div v-for="(type,index) in types" :key="index" class="cp-container">
        <input type="radio"  :id="type.typeName"  :value="type.typeName" name="catSelect" v-model="selected"/>
        <label class="cp-label" :for="type.typeName">{{type.typeName}}</label>
    </div>
    {{selected}}
</template>

<script>
export default {
    props:['modelValue'],
    data(){
        return{ 
            types:[
                {"typeName":"Business","color":"#6FCF97"},
                {"typeName":"Personal","color":"#524EEE"},
                {"typeName":"Important","color":"#D06969"},
                ],
            selected:'',
        }
    },
    methods:{
        setCat(){
            
        }
    }
}
</script>

<style>
    .cp-container{
        display:inline-flex;
        margin-bottom:1em;
        overflow: auto;
    }

    .cp-btn{
        display: block;
        font-size:1em;
        background-color:var(--upper);
        color:var(--truewhite);
        margin-right:12px;
        border-radius: 4px;
        font-weight:500;
        padding:2px 8px;
        cursor:pointer;
    }
    
    .cp-label{
        padding:2px 8px;
        background-color:var(--upper);
        color:var(--truewhite);
        margin:0;
        border-radius: 4px;
        margin-right:8px;
    }
    
    .colorSpan{
        display: block;
        width:16px;
        height:16px;
        border:2px solid ;
    }

    input[type="radio"]{
        -webkit-appearance: none;
    }
</style>