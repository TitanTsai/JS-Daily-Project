<template>
    <div>
        <input class="dp-input" type="text" v-model="dateValue" @click="showModal=!showModal;" placeholder="Due Date" readonly>
        <div class="dp-container" v-if="showModal">
            <div class="dp-instant-container" v-if="instantSelector">
                <div class="dp-instant-btn" @click="instantSelect(0)">Today</div>
                <div class="dp-instant-btn" @click="instantSelect(1)">Tomorrow</div>
                <div class="dp-instant-btn" @click="instantSelect(2)">+2 Days</div>
            </div>

            <div class="dp-month-header">
                <div class="dp-change-month" @click="changeMonth(-1)">&#10094;</div>
                <div class="dp-month-display">{{monthName[selected.getMonth()]}}  {{selected.getFullYear()}}</div>
                <div class="dp-change-month" @click="changeMonth(1)">&#10095;</div>
            </div>
            <div class="dp-weeks-container">
                <div class="dp-weekday"  v-for="name in weekName" :key="name">{{name}}</div>
                <div v-for="prev in prevDays" :key="prev">{{prev}}</div>
                <div class="dp-day" :class="{active:day.isActive}" v-for="(day,index) in calender" :key="index" @click="selectDate(index)">{{day.num}}</div>
            </div>
            <div class="dp-footer">
                <div class="dp-done_button" @click="showModal=false">Done</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{modelValue:String, instantSelector:Boolean},
    emits: ['update:modelValue'],
    data(){
        return{
            today: new Date(),
            selected: '',
            weekName:['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthName:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            calender: [],
            prevDays:[],
            showModal:false,
        }
    },
    created(){
        this.instantSelect(0)
    },
    methods:{
        renderCalender(){
            this.prevDays=[];
            this.calender=[];
            const firstDay = new Date(this.selected.getFullYear(),this.selected.getMonth(),1).getDay(); //該月份第一天星期幾 0-6
            const lastDay = new Date(this.selected.getFullYear(),this.selected.getMonth()+1,0).getDate();//該月份總天數

            for(let space = 1;space<=firstDay; space++){
                this.prevDays.push(null)
            }

            for(let day = 1; day<=lastDay; day++){
                this.calender.push({'num':day})
            }
        },
        selectDate(value){
            this.calender.forEach(item=>item.isActive=false);
            this.dateValue = new Date(this.selected.getFullYear(),this.selected.getMonth(),value+1).toLocaleDateString();
            this.calender[value].isActive = true;
        },
        changeMonth(value){
            this.selected = new Date(this.selected.getFullYear(),this.selected.getMonth()+value);
            this.renderCalender()
        },
        instantSelect(value){
            this.selected=this.today;
            this.renderCalender();
            this.selectDate(this.today.getDate()-1+value)
        }
    },
    computed: {
        dateValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
    },

    }
    
</script>

<style>
    :root  {
        --dp_background:#ffffff;
        --dp_select:#F2F4F6;
        --dp_primary:#008FFD;
        --dp_white:#f2f2f2;
        --dp_caption:#19191B;
        --dp_hover:#F2F4F6;

        user-select:none;
        -webkit-user-select:none;
        -ms-user-select: none;
        -moz-user-select: none;
    }

    .dp-input{
        width:340px;
        font-size:1em;
        border:none;
        border-radius: 4px;
        padding:10px;
        color:var(--caption);
        background: url('../assets/images/calender.svg') no-repeat var(--upper) 95% 10px;
        cursor: pointer;
    }

    .dp-container{
        margin:1em auto;
        display:block;
        width:20em;
        background-color:var(--dp_background);
        border-radius: 0.5em;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
        padding:1em;
        position:relative;
        z-index: 1000;
    }

    .dp-instant-container{
        display:flex;
        justify-content: flex-start;
    }

    .dp-instant-btn{
        padding:2px 8px;
        font-weight: 500;
        background-color:var(--dp_select);
        margin-right:8px;
        border-radius: 4px;
        cursor:pointer;
    }

    .dp-instant-btn:hover{
        background-color:var(--dp_primary);
        color:var(--dp_white)
    }

    .dp-month-header{
        display:flex;
        justify-content: space-between;
        margin:1em 0;
    }

    .dp-month-display{
        color:var(--dp_caption);
        font-size:20px;
        font-weight: 500;
        
    }

    .dp-change-month{
        cursor:pointer;
        width:36px;
        height:36px;
        border-radius: 0.5em;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    
    .dp-change-month{
        box-shadow:0 1px 3px rgba(0,0,0,0.16)
    }

    .dp-change-month:hover{
        background-color:var(--dp_primary);
        color:var(--dp_white);
    }

    .dp-weeks-container{
        display: grid;
        grid-template-columns: repeat(7,1fr);
        text-align:center;
    }

    .dp-day, .dp-weekday{
        width:36px;
        height:36px;
        font-size: 18px;
        font-weight: 500;
        margin-bottom:6px;
        border-radius: 8px;
        justify-self: center;
        line-height: 36px;
        color:var(--dp_caption);
    }
    
    .dp-day:hover{
        background-color:var(--dp_hover);
    }

    .today{
        border:2px solid var(--dp_primary);
    }

    .active{
        background-color:var(--dp_primary);
        color:var(--dp_white)
    }

    .active:hover{
        background-color:var(--dp_primary);
    }

    .dp-footer{
        margin-top:1em;
    }

    .dp-done_button{
        display:block;
        width:100%;
        background-color:var(--dp_primary);
        color:var(--dp_white);
        font-size:18px;
        font-weight:500;
        border-radius:8px;
        padding:8px 0;
        text-align: center;
        cursor: pointer;
    }

    @media screen and (max-width:768px) {
        .dp-input{
            width:240px;
            font-size:1em;
            background: url('../assets/images/calender.svg') no-repeat 210px 10px var(--upper);
        }
    }
</style>