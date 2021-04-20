app.component('imageSlider',{
    template:`
    <div class="image-slider">
        <transition-group tag="div" class="slider-container">
        
            <div class="image-slider--image" v-for="(image,index) in images" :key="index" v-show="index === currentIndex">
                <img :src="image.src">
            </div>
            
        </transition-group>

        <div class="slider-btn-prev" v-if="this.images.length>1" @click="changeIndex(-1);resetTimer()">&#10094;</div>
        <div class="slider-btn-next" v-if="this.images.length>1" @click="changeIndex(1);resetTimer()">&#10095;</div>

        <div class="slide-indicator-container">
            <span class="slider-indicator" v-for="num in images.length" @click="this.currentIndex=num-1"></span>
        </div>
    </div>
    
    `,
    data(){
        return{
            images:[
                {"city":"Los Angel","src":"./assets/images/us-losangel.jpg"},
                {"city":"Osaka","src":"./assets/images/as-osaka.jpg"},
                {"city":"Frankfurt","src":"./assets/images/eu-frankfurt.jpg"},
                {"city":"London","src":"./assets/images/eu-london.jpg"}
            ],
            currentIndex:0,
            timer:null,
            transitionName:'slide-in',
        }
    },
    mounted(){
        this.autoPlay();
    },
    methods:{
        autoPlay(){
            this.timer = setInterval(()=>{this.changeIndex(1)},5000)
        },
        
        changeIndex(value){
            this.currentIndex = (this.currentIndex + value + this.images.length) % this.images.length;
            return isActive=true;
        },

        resetTimer(){
            clearInterval(this.timer);
            this.autoPlay();
        }
    },
    computed:{

    }
})