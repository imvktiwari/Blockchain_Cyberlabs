firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("21je1017webd.html")
    }else{
        document.getElementById("user").innerHTML = user.email
    }
})


function logout(){
    firebase.auth().signOut()
}
