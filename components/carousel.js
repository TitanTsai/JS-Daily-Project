app.component('imageSlider',{
    template:`
    <div class="image-slider">
        <div class="image-slider--prev" @click="changeIndex(-1)">&#10094;</div>
       
            <div v-for="(item,i) in images" :key="item.city">
                <transition name="fade">
                    <img class="image-slider--image" v-if="index===i"  :src="item.src">
                </transition>
            </div>

        <div class="image-slider--next" @click="changeIndex(1)">&#10095;</div>
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
            index:0,
            timer:null,
        }
    },
    mounted(){
        //this.autoPlay();
        //console.log('mounted')
    },
    methods:{
        autoPlay(){
            this.timer = setInterval(()=>{this.changeIndex(1)},5000)
        },
        
        changeIndex(value){
            this.index = (this.index + value + this.images.length) % this.images.length;
        },

        resetTimer(){
            clearInterval(this.timer);
            this.autoPlay();
        }
    },
    computed:{

    }
})