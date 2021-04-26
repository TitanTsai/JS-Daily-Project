<template>
    <div class="cp-container" id="cp-input">
        <div v-for="cat in category" :key="cat.catName" :style="{backgroundColor:`${cat.catColor}`}" class="cp-btn"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            category:[
                {"catName":"Business","catColor":"#6FCF97"},
                {"catName":"Personal","catColor":"#524EEE"},
                ]
        }
    }
}
</script>

<style>
    .cp-container{
        display:flex;
        margin-bottom:1em;
    }

    .cp-btn{
        display: block;
        font-size:1em;
        background-color:var(--upper);
        color:var(--white);
        margin-right:12px;
        border-radius: 12px;
        width:24px;
        height: 24px;
        /*--font-weight:500;
        padding:2px 8px;--*/
        cursor:pointer;
    }
    
</style>