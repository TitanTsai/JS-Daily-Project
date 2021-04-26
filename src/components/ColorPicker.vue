<template>
    <div v-for="(type,index) in types" :key="index" class="cp-container">
        <input type="radio"  :id="type.typeName"  :value="type.typename" name="catSelect" v-model="selected"/>
        <label class="cp-label" :for="type.typename">{{type.typename}}</label>

    </div>

</template>

<script>
import EventService from '@/services/EventService.js'
export default {
    props:{
        modelValue:String,
    },
    created(){
        EventService.getCategory()
        .then(response=>{
            this.types = response.data
        }).catch(error=>{
            console.log(error)
        })
    },
    data(){
        return{ 
            types:[],
        }
    },
    methods:{
        setCat(){
            
        }
    },
    computed: {
        selected: {
        get() {
            return this.modelValue
        },
        set(value) {
            this.$emit('update:modelValue', value)
        }
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

    .selected{
        background-color:var(--catcolor)
    }
</style>