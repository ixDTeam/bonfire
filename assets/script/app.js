var URL_qrcode = 'object/' + ID_qrcode + '/story';
var long;
var lat;

var latitude = {latitude:"50", longitude:"0"};

//creat element and render

//getdata

getLocation();

realTimeRender()

$('#URL_qrcode').on("change", function(){
    URL_qrcode = 'object/' + $('#URL_qrcode').val() + '/story';
    ID_qrcode = $('#URL_qrcode').val();
    console.log("URL CHANGE");
    realTimeRender();
})

// function getData(){
//     $('#stories').html("");
//     db.collection(URL_qrcode).get().then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             console.log(doc.data());
//             renderStory(doc);
//         })
//         losch();
//     })
//     SetURLParameter(ID_qrcode);
//     $('#URL_qrcode').val(ID_qrcode);
    
// }

function realTimeRender(){
    
    db.collection(URL_qrcode)
    .onSnapshot(function(snapshot) {
        $('#stories').html("");
        snapshot.docs.forEach(doc => {
            console.log(doc.data());
            renderStory(doc);
        })
        losch();
        mapUpdate();
        SetURLParameter(ID_qrcode);
        $('#URL_qrcode').val(ID_qrcode);
    })
}






// db.collection(URL_qrcode).get().then((snapshot) => {
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
    var lati = doc.data().location._lat;
    var longi = doc.data().location._long;

    

    var path = "<div class='story' data-id=" + id + "><span class='date'>" + time + "</span><p class='content'>" + content + "</p> " +  "<span class='emoji'>" + emoji + "</span><span>" + lati + " " + longi + "</span><div class='delete'>X</div></div>";
    $('#stories').append(path);
    console.log(doc.data().location._lat);
};



//saving data

$('#add').on("click", function() {
    event.preventDefault();

    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    console.log('submit');
    
    db.collection(URL_qrcode).add({
        content: $('#content').val(),
        emotion: $('#emotion').val(),
        created: firebase.firestore.Timestamp.fromDate(new Date()),
        location: new firebase.firestore.GeoPoint( lat, long)
        });
});

//delete one

function losch(){
    $('.delete').on("click", function(){
        console.log("delete");
        db.collection(URL_qrcode).get().then((snapshot) => {
                var id = $(this).parent().attr("data-id");
                db.collection(URL_qrcode).doc(id).delete();
            
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
    db.collection(URL_qrcode).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            console.log(doc.id);
            db.collection(URL_qrcode).doc(doc.id).delete();
        })
    })
});


//realtime data
// db.collection("object/001/story").doc('6p1H9ZsUGUy7EkSQc2gg')
//     .onSnapshot(function(doc) {
//         console.log("Current data: ", doc.data());
//     });

    // db.collection(URL_qrcode).where("name", "==", "test")
    // .onSnapshot(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         console.log(doc.data());
    //     });
    // });

    // db.collection(URL_qrcode).get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.data());
    //         renderStory(doc);
    //     })

//Get Geopoint

function getLocation(){
    navigator.geolocation.getCurrentPosition(success, error);
    console.log("ortung läuft");
}

function success(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat + " " + long);
  };

  function error() {
    alert("Achtung");
  };

  function mapUpdate(){
    $('.story').on("click", function(){
        db.collection(URL_qrcode).get().then((snapshot) => {
                var id = $(this).attr("data-id");
                var docRef = db.collection(URL_qrcode).doc(id);
                docRef.get().then(function(doc) {
                    console.log("Cached document data:", doc.data().location._lat);
                    var latlng = {lat: doc.data().location._lat, lng: doc.data().location._long}
                    map.panTo(latlng);


            
        })
    })
  })
};

   
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

  