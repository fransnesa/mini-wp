<template>
    <div>
        <div id="createPost">
             <form action enctype="multipart/form-data">
                <input type="text" id="postTitleInput" v-model="title" placeholder="Your title here">
                <div id=tagcontainer>
                    <vue-tags-input id="insidetag" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
                </div>
                <div class="filess">
                    <input type="file" ref="file" v-on:change="handlefileupload($event)" id="imagepost"/>
                </div>
                <wysiwyg v-model="content"></wysiwyg>
                <button class="button" @click.prevent="saveArticle" id="savePost"><i class="fa fa-send"></i> Submit</button>
            </form>
        </div>
          <!-- <div class="col-12" style="height: 75vh; margin-top:20px;">
    <div class="row">
      <b-form-input class="col-12" type="text" id="title" placeholder="Title" v-model="title"></b-form-input>
      <b-form-file
        ref="inputFile"
        :state="Boolean(file)"
        placeholder="Choose an image or drop it here..."
        v-on:change="onFileChange"
      ></b-form-file>
      <wysiwyg v-model="text" />
    </div>
    <div class="row">
      <b-button variant="primary" href="#" @click.prevent="create">Submit</b-button>
      <b-button variant="warning" href="#" @click.prevent="clear">clear</b-button>
    </div>
  </div> -->
    </div>
</template>

<script>
// import wysiwyg from ""
import VueTagsInput from "@johmun/vue-tags-input";
// let baseurl = "http://localhost:3000"
let baseurl = "http://34.87.55.207"
export default {
    components:{
        VueTagsInput
    },
    data(){
        return{
            title:"",
            content:"",
            image:"",
            tag: "",
            tags: []
        }
    },
    methods:{
        handlefileupload() {
            let file = event.target.files || event.dataTransfer.files;
            this.image = file[0];
        },
       saveArticle(){
           console.log("masuk ke savearticle")
                let taggs = []
                    for(let i = 0; i < this.tags.length;i++){
                        taggs.push(this.tags[i].text)
                    }
                    console.log(taggs)
                    console.log(this.image)
                    let formData = new FormData();
                    formData.set("featured_image", this.image);
                    formData.set("title", this.title);
                    formData.set("content", this.content);
                    formData.set("tagku", taggs);
                    console.log(formData)
                    Swal.showLoading()
                axios({
                    method:"POST",
                    url:`${baseurl}/miniWp/`,
                    headers:{
                        token: localStorage.getItem('token')
                    },
                    data:formData
                }).then((response)=>{
                    console.log(response.data)
                    Swal.close()
                    this.title = ""
                    this.content = ""      
                    this.tags = []  
                    this.image = ""
                    this.$emit("successCreate")
                    Swal.fire("Good job, Success Create Article")
                    })
                    .catch(error => {
                        let message = error.response.data && error.response.data.message || 'Failed to Create'
                        Swal.fire("Error!",message, "error");
                    });
            },
    }
}
</script>

<style scoped>
#tagcontainer {
    margin-left: 300px;
    width: 900px;
}
#insidetag {
    max-width: 780px;
    width: 780px;
}
#imagepost {
    margin-left: 300px
}
</style>



