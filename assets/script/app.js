var ID_qrcode = 'object/' + $('#ID_qrcode').val() + '/story';

//creat element and render

//getdata

$('#ID_qrcode').on("change", function(){
    ID_qrcode = 'object/' + $('#ID_qrcode').val() + '/story';
    getData();
})

function getData(){
    $('#stories').html("");
    db.collection(ID_qrcode).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            renderStory(doc);
        })
        losch();
    })
}




// db.collection(ID_qrcode).get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//         renderStory(doc);

//     })
//     losch();
// })

//render data

function renderStory(doc){
    var content = doc.data().content;
    var time = convert(doc.data().created.seconds);
    var emoji = doc.data().emotion;
    var id = doc.id;

    

    var path = "<div class='story' data-id=" + id + "><span class='date'>" + time + "</span><p class='content'>" + content + "</p> " +  "<span class='emoji'>" + emoji + "</span><div class='delete'>X</div></div>";
    $('#stories').append(path);
    console.log(doc.data().created.seconds);
};



//saving data

$('#add').on("click", function() {
    event.preventDefault();

    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    console.log('submit');
    
    db.collection(ID_qrcode).add({
        content: $('#content').val(),
        emotion: $('#emotion').val(),
        created: firebase.firestore.Timestamp.fromDate(new Date())
        });
});

//delete one

function losch(){
    $('.delete').on("click", function(){
        console.log("delete");
        db.collection(ID_qrcode).get().then((snapshot) => {
                var id = $(this).parent().attr("data-id");
                db.collection(ID_qrcode).doc(id).delete();
            
        })
    })
};

$(document).ready( function(){
    console.log("ready");


});


//deleting data
$('#delete').click(function() {
    event.preventDefault();
    console.log("Delete");
    db.collection(ID_qrcode).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id);
            db.collection(ID_qrcode).doc(doc.id).delete();
        })
    })
});


//realtime data
// db.collection("object/001/story").doc('6p1H9ZsUGUy7EkSQc2gg')
//     .onSnapshot(function(doc) {
//         console.log("Current data: ", doc.data());
//     });

    db.collection(ID_qrcode).where("name", "==", "test")
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data());
        });
    });

   
//seconds to time
function convert(unixseconds){

   
    // Months array
    var months_arr = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixseconds*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
   
    // Hours
    var hours = date.getHours();
   
    // Minutes
    var minutes = "0" + date.getMinutes();
   
    // Seconds
    var seconds = "0" + date.getSeconds();
   
    // Display date time in MM-dd-yyyy h:m:s format
    var convdataTime = day + '. ' + month + " " + year +' um '+hours + ':' + minutes.substr(-2) + " Uhr";
    
    return convdataTime;
    
   }


  