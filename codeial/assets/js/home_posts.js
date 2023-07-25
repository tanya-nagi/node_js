{

    //method to submit new form data to post using AJAX
  let createPost = ()=>{
    let newPostForm = $("new-post-form")


    newPostForm.submit((e)=>{
        e.preventDefault();

        $.ajax({
            type:'post',
            urls:'/posts/create',
            data:newPostForm.serialize(),
            success: ((data)=>{
              console.log(data);
            }),
            error:(()=>{
              console.log(error.responseText);
            })
        })

    })
    }



    //METHOD TO CREATE POST IN DOM CONTROLLER


    createPost()
}