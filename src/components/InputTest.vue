<template>
    <div>
        <input class="dp-input" type="text" v-model="dateValue">
    </div>
    
</template>

<script>
export default {
    props:['modelValue'],
    data(){
        return{
            dateValue:'',
        }
    }
}
</script>

<style scoped>
    .dp-input{
        width:320px;
        font-size:1em;
        color:var(--caption);
        border:none;
        border-radius: 4px;
        background-color: var(--upper);
        padding:10px;
    }
</style>