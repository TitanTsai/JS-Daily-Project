const app=Vue.createApp({})

app.component('simple-calculator',{
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
            this.operator = (a,b) => a+b;
            this.setPrev();
            
        },
        minus(){
            this.operator = (a,b) => a-b;
            this.setPrev()
        },
        times(){
            this.operator = (a,b) => a*=b;
            this.setPrev()
        },
        devide(){
            this.operator = (a,b) => a/=b;
            this.setPrev()
        },
        equals(){
            this.current = this.operator(parseFloat(this.current),parseFloat(this.previous));
            this.operatorClicked=false;
            this.previous='';
            
        },
        
        
    },
    template:
    `<div class="calculator_container" id="calculator">
        <div class="calculator_output">{{current || 0}}</div>
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
    </div>`
})


app.mount('#calculator')