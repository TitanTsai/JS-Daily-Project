<template>
    <div class="calculator_container" id="calculator">
        <div class="calculator_output">
            {{current || 0}}
        </div>
        <div class="calculator_btngroup">
            <div class="calculator_btn misc" @click="clear">C</div>
            <div class="calculator_btn misc" @click="sign" >+/-</div>
            <div class="calculator_btn misc" @click="percentage">%</div>
            <div class="calculator_btn operators" @click="devide">÷</div>
            <div class="calculator_btn" @click="append(7)">7</div>
            <div class="calculator_btn" @click="append(8)">8</div>
            <div class="calculator_btn" @click="append(9)">9</div>
            <div class="calculator_btn operators" @click="times">×</div>
            <div class="calculator_btn" @click="append(4)">4</div>
            <div class="calculator_btn" @click="append(5)">5</div>
            <div class="calculator_btn" @click="append(6)">6</div>
            <div class="calculator_btn operators" @click="minus">-</div>
            <div class="calculator_btn" @click="append(1)">1</div>
            <div class="calculator_btn" @click="append(2)">2</div>
            <div class="calculator_btn" @click="append(3)">3</div>
            <div class="calculator_btn operators" @click="plus">+</div>
            <div class="calculator_btn zero" @click="append(0)">0</div>
            <div class="calculator_btn" @click="dot">.</div>
            <div class="calculator_btn operators" @click="equals">=</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            current:'',
            operator:null,
            previous:null,
            operatorClicked:false
        }
    },
    methods:{
        clear(){
            this.current='';
            
        },
        sign(){
            this.current=this.current.charAt(0)==='-'?
                this.current.slice(1) : `-${this.current}`
        },
        percentage(){
            this.current=this.current/100
        },
        append(number){
            if(this.operatorClicked){
                this.current='',
                this.operatorClicked=false;
            }
            this.current=`${this.current}${number}`;
        },
        dot(){
            if(this.current.indexOf('.')=== -1){
                this.append('.')
            }
        },
        setPrev(){
            this.previous = this.current;
            this.operatorClicked=true;
        },
        plus(){
            this.operator = (a,b) => b+a;
            this.setPrev();
            
        },
        minus(){
            this.operator = (a,b) => b-a;
            this.setPrev()
        },
        times(){
            this.operator = (a,b) => b*a;
            this.setPrev()
        },
        devide(){
            this.operator = (a,b) => b/a;
            this.setPrev()
        },
        equals(){
            this.current = this.operator(parseFloat(this.current),parseFloat(this.previous));
            this.operatorClicked=false;
            this.previous='';
            
        },
    }
}
</script>

<style>
.calculator_container{
        width:20em;
        margin:1em;
    }

    .calculator_output{
        display:flex;
        align-items:center;
        justify-content:flex-end;
        height:100px;
        font-size: 2em;
        padding:20px;
        word-wrap: break-word;
        overflow: hidden;
        color:#fff;
        background-color: var(--background);
        border-radius: 1em 1em 0 0 ;
    }


    .calculator_btngroup{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        padding:20px;
        background-color: var(--highlight);
        border-radius:0 0 1em 1em;
    }


    .calculator_btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width:54px;
        height:54px;
        border-radius: 0.5em;
        cursor: pointer;
        color:var(--caption);
        background-color: var(--bright);
        font-size:24px;
        text-align: center;
        margin:10px auto;
    }

    .calculator_btn:hover{
        background-color:var(--upper);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    }

    .misc{
        color: var(--primary)
    }

    .operators{
        color: var(--danger)
    }

    .zero{
        grid-column: 1/3;
        width:123px;
    }
</style>