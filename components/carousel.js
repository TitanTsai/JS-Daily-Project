app.component('imageSlider',{
    template:`
    <div class="image-slider" v-for="i in [images]">    
        <div class="image-slider--prev" @click="changeIndex(-1)">&#10094;</div>
        <img class="image-slide--image" :src="currentImage">
        <div class="image-slider--next" @click="changeIndex(1)">&#10095;</div>
    </div>
    `,
    data(){
        return{
            images:[
                "./assets/images/us-losangel.jpg",
                "./assets/images/as-osaka.jpg",
                "./assets/images/eu-frankfurt.jpg",
                "./assets/images/eu-london.jpg",
            ],
            currentIndex:0,
        }
    },
    mounted: function(){
    
    },
    methods:{
        changeIndex(value){
            this.currentIndex = (this.currentIndex + value + this.images.length) % this.images.length
        }
    },
    computed:{
        currentImage(){
            return this.images[this.currentIndex]
        }
    }
})