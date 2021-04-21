<template>
    <div class="dp-container">
        <div class="dp-instant-container">
            <div class="dp-instant-button">Today</div>
            <div class="dp-instant-button">Tomorrow</div>
            <div class="dp-instant-button">In 2 Days</div>
        </div>
        <div class="dp-month-header">
            <div>&#10094;</div>
            <div class="dp-month-display">{{dateStamp}}</div>
            <div>&#10095;</div>
        </div>
        <div class="dp-weeks-container">
            <div class="dp-weekdays">Su</div>
            <div class="dp-weekdays">Mo</div>
            <div class="dp-weekdays">Tu</div>
            <div class="dp-weekdays">We</div>
            <div class="dp-weekdays">Th</div>
            <div class="dp-weekdays">Fr</div>
            <div class="dp-weekdays">Sa</div>
        </div>
        <div class="dp-footer">
            <div class="dp-done_button">Done</div>
        </div>


        <div>
            debug{{todayStamp}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dateStamp:'',
            todayStamp:''
        }
    },
    created(){
        setInterval(this.getDate,0)
    },
    methods:{
        getDate(){
            const today = new Date();
            const date = today.getDate();
            const month = today.getMonth()+1;
            const year = today.getFullYear();
            const dateYear = `${month} ${year}`;
            this.dateStamp = dateYear
            this.todayStamp = date
        }
    },
    computed:{
       
    }
}
</script>

<style>
    .dp-container{
        display:block;
        width:20em;
        height:26.5em;
        background-color:var(--upper);
        border-radius: 0.5em;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
        padding:1em;
        position:relative;
        border:1px solid #27264D;
    }

    .dp-instant-container{
        display:inline-flex;
        justify-content: start;
    }

    .dp-instant-button{
        display: block;
        padding:2px 8px;
        border-radius: 4px;
        color:var(--caption);
        background-color:var(--bright);
        margin:4px;
        font-weight: 500;
    }

    .dp-month-header{
        display:flex;
        justify-content: space-between;
        margin:1em 0;
    }

    .dp-month-display{
        color:var(--caption);
        font-size:20px;
        font-weight: 500;
    }

    .dp-weeks-container{
        display: grid;
        grid-template-columns: repeat(7,1fr);
        text-align:center;
    }

    .dp-weekdays{
        font-size:18px;
        color:var(--caption);
        font-weight: 500;
    }

    .dp-footer{
        position:absolute;
        bottom:0;
        left:0;
        padding:1em 0;
        width:100%;
    }

    .dp-done_button{
        align-self: center;
        display:inline-flex;
        background-color:var(--secondary);
        color:var(--white);
        padding:8px 16px;
        border-radius: 8px;
        font-weight:500;
    }
</style>