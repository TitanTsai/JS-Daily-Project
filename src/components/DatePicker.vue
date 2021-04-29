<template>
    <div>
        <input class="dp-input" type="text" v-model="dateValue" @click="openModal=!openModal" placeholder="Due Date" readonly>
        <div class="dp-container" v-show="openModal">
            <div class="dp-instant-container">
                <div class="dp-instant-button" @click="setToday()">Today</div>
                <!--<div class="dp-instant-button" >Tomorrow</div>-->
                <!-- <div class="dp-instant-button">In 2 Days</div> -->
            </div>
            <div class="dp-month-header">
                <div class="dp-change-month" @click="changeMonth(-1)">&#10094;</div>
                <div class="dp-month-display">{{current.getMonth()+1}}, {{current.getFullYear()}}</div>
                <div class="dp-change-month" @click="changeMonth(1)">&#10095;</div>
            </div>
            <div class="dp-weeks-container">
                <div class="dp-weekdays">Su</div>
                <div class="dp-weekdays">Mo</div>
                <div class="dp-weekdays">Tu</div>
                <div class="dp-weekdays">We</div>
                <div class="dp-weekdays">Th</div>
                <div class="dp-weekdays">Fr</div>
                <div class="dp-weekdays">Sa</div>
                <div class="dp-day-disable" v-for="prevDay in prevWeekDays" :key="prevDay">{{prevDay}}</div>
                <div class="dp-day" :class={active:calenderday.isActive} v-for="(calenderday,index) in calender" :key="index" @click="setValue(index);">{{calenderday.day}}</div>
            </div>
            <div class="dp-footer">
                <div class="dp-done_button" @click="openModal=false">Done</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
            modelValue:{type:String,
                        default: new Date()}
                        },
    emits: ['update:modelValue'],
    data(){
        return{
            current : new Date(),
            calender: [],
            prevWeekDays:[],
            isActive:false,
            openModal:false,
        }
    },
    created(){
        this.dateValue = new Date().toLocaleDateString();
        setTimeout(this.renderCalender(),0);
        
    },
    methods:{
        renderCalender(){

            const FirstWeekDay = new Date(this.current.getFullYear(), this.current.getMonth(), 1).getDay();
            const PrevMonthDay = new Date(this.current.getFullYear(), this.current.getMonth(),0).getDate();
            const MonthDay = new Date(this.current.getFullYear(),this.current.getMonth()+1,0).getDate();
        
            for(let prevDays=FirstWeekDay; prevDays>0; prevDays--){
                this.prevWeekDays.push(PrevMonthDay-prevDays+1)
            }

            for(let x=1; x<=MonthDay; x++){
                this.calender.push({'day':x,isActive:false})
            }
        },
        changeMonth(value){
            this.current.setMonth(this.current.getMonth() + value);
            this.prevWeekDays=[];
            this.calender=[];
            this.renderCalender();
        },
        setValue(index){
            this.calender.forEach(item=> item.isActive = false);
            this.calender[index].isActive = true;
            this.dateValue= new Date(this.current.setDate(index+1)).toLocaleDateString();
        },
        setToday(){
            this.dateValue = new Date().toLocaleDateString();
        },
        
    },
    computed: {
        dateValue: {
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
    .dp-input{
        width:340px;
        font-size:1em;
        color:var(--caption);
        border:none;
        border-radius: 4px;
        padding:10px;
        background: url('../assets/images/calender.svg') no-repeat 310px 10px var(--upper);
        cursor: pointer;
    }
    .dp-container{
        margin-top:0.5em;
        display:block;
        width:20em;
        height:24em;
        background-color:var(--upper);
        border-radius: 0.5em;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
        padding:1em;
        position:relative;
        z-index: 1000;
        border:1px solid #27264D;
    }

    .dp-instant-container{
        display:flex;
        justify-content: flex-start;
    }

    .dp-instant-button{
        display: block;
        padding:2px 8px;
        border-radius: 4px;
        color:var(--caption);
        background-color:var(--bright);
        margin:4px;
        font-weight: 500;
        cursor: pointer;
    }

    .dp-instant-button:hover{
        background-color:var(--primary);
        color:var(--truewhite)
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

    .dp-change-month, .dp-day{
        cursor:pointer;
        width:36px;
        height:36px;
        border-radius: 0.5em;
        display:flex;
        align-items: center;
        justify-content: center;    
    }
    
    .dp-change-month:hover{
        background-color:var(--highlight);
        color:var(--truewhite);
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

    .dp-day{
        color:var(--caption);
        font-size:18px;
        font-weight:500;
    }

    .dp-day-disable{
        color:inherit;
        display:flex;
        align-items: center;
        justify-content: center;
    }

    .dp-day:hover{
        background-color:var(--highlight)
    }

    .active{
        background-color:var(--primary);
        color:var(--truewhite)
    }

    .dp-footer{
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
        position: absolute;
        bottom:1em;
        left:50%;
        transform: translateX(-50%);
        border-radius: 8px;
        font-weight:500;
        cursor: pointer;
    }
</style>