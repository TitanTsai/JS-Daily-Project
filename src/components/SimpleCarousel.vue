<template>
    <div class="image-slider">
        <transition-group tag="div" class="slider-container">
        
            <div class="image-slider--image" v-for="(image,index) in images" :key="index" v-show="index === currentIndex">
                <img :src="image.src">
            </div>
            
        </transition-group>

        <div class="slider-btn-prev" v-if="this.images.length>1" @click="changeIndex(-1);resetTimer()">&#10094;</div>
        <div class="slider-btn-next" v-if="this.images.length>1" @click="changeIndex(1);resetTimer()">&#10095;</div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            images:[
                {"city":"Los Angel","src":"./images/us-losangel.jpg"},
                {"city":"Osaka","src":"./images/as-osaka.jpg"},
                {"city":"Frankfurt","src":"./images/eu-frankfurt.jpg"},
                {"city":"London","src":"./images/eu-london.jpg"}
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
        },

        resetTimer(){
            clearInterval(this.timer);
            this.autoPlay();
        }
    }
}
</script>

<style>
.image-slider{
        position:relative;
        width:640px;
        height:400px;
        margin:auto;
    }

    .slider-container{
        position:relative;
        width:100%;
        height:100%;
        overflow: hidden;
        margin:0 auto;
    }

    .slider-image{
        position:absolute;
        width:100%;
        height:100%
    }

    .slider-image img{
        object-fit:cover;
    }
    
    .slider-btn-prev, .slider-btn-next{
        position:absolute;
        display:flex;
        justify-content: center;
        width:30px;
        top:50%;
        transform:translateY(-50%);
        color:var(--white);
        z-index:100;
        cursor:pointer;
        
    }

    .slider-btn-prev{
        left:0;
    }

    .slider-btn-next{
        right:0;
    }

    .slider-btn-prev:hover{
        color: var(--primary);
    }

    .slider-btn-next:hover{
        color: var(--primary);
    }

    .slider-indicator{
        display:inline-block;
        width:0.5em;
        height:0.5em;
        border-radius:50%;
        background-color:var(--disabled);
        margin:0.5em;
    }

    .slide-indicator-container{
        z-index:100;
        position:absolute;
        bottom:0.5em;
        left:50%;
        transform:translateX(-50%)
    }

    .slider-indicator:hover{
        background-color: var(--white);
    }

    .slider-indicator-active{
        background-color:var(--primary);
    }

    .slide-in-enter{
        transform:translateX(-100%)
    }

    .slide-in-enter-active{
        transition: transform 1s;
    }

    .slide-in-enter-to{
        transform:translateX(0)
    }
</style>