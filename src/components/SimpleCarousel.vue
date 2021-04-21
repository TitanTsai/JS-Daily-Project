<template>
    <div class="image-slider">
        
        <transition-group tag="div" class="slider-container" name="slide" mode="out-in">
            <div class="image-slider--image" v-for="(image,index) in images" :key="index" v-show="index === currentIndex">
                <img :src="image.src">
            </div>
        </transition-group>

        <div class="slider-btn-prev" v-if="this.images.length>1" @click="changeIndex(-1);resetTimer()">&#10094;</div>
        <div class="slider-btn-next" v-if="this.images.length>1" @click="changeIndex(1);resetTimer()">&#10095;</div>
        
        <transition-group tag="div" class="slide-indicator-container" name="fade">
            <span class="slider-indicator" :class="{slideisActive:num-1===currentIndex}" v-for="num in images.length" :key="num-1" @click="currentIndex=num-1;resetTimer()"></span>
        </transition-group>
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
            
        }
    },
    mounted(){
        this.autoPlay();
    },
    methods:{
        autoPlay(){
            this.timer = setInterval(()=>{this.changeIndex(1)},8000)
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
        overflow:hidden;
    }

    .slider-container{
        position:relative;
        width:100%;
        height:100%;
        margin:0 auto;
    }

    .slider-image{
        position:absolute;

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

    .slideisActive{
        background-color: var(--primary);
    }


    /**Transition Group */

    .slide-fade-enter-active {
    transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;}

    .fade-enter-active,.fade-leave-active{
        transition:all 0.3s ease-in
    }

    .fade-enter-from, .fade-leave-to{
        opacity:0;
    }
</style>