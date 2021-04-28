<template>
    <select class="cp-container" v-model="selected">
        <option value="" disabled>Category</option>
        <option v-for="type in types" :key="type.typeName" :value="type.typeName">{{type.typeName}}</option>
    </select>


</template>

<script>
import EventService from '@/services/EventService.js'
export default {
    props: {
        radioValue:{type:String}
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
            return this.radioValue
        },
        set(value) {
            this.$emit('update:radioValue', value)
        }
        }
    }
}
</script>

<style>
    .cp-container{
        display:flex;
        width:340px;
        border:none;
        -webkit-appearance: none;
        font-size:1em;
        padding:10px;
        color:var(--caption);
        border-radius: 4px;
        background:url('../assets/images/category.svg') no-repeat 310px 10px var(--upper);
        margin-bottom:0.5em;
    }

    .selected{
        background-color:var(--catcolor)
    }
</style>