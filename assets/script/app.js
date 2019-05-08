const cityList = document.querySelector('#city');

//creat element and render

function renderCities(doc){
    let city = document.createElement('h1')

    city.textContent = doc.data().name;

    cityList.appendChild(city);
}

// function renderStory(doc){
//     $("#city").append("<p>"+doc.data().content+"<p>");
// }

db.collection('object/001/story').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderStory(doc);
    })
})

//render data

function renderStory(doc){
    var content = doc.data().content;
    var time = convert(doc.data().created.seconds);
    var emoji = doc.data().emotion;
    var id = doc.id;

    

    var path = "<div class='story' data-id=" + id + "><span class='date'>" + time + "</span><p class='content'>" + content + "</p> " +  "<span class='emoji'>" + emoji + "</span></div>";
    $('#stories').append(path);
    console.log(doc.data().created.seconds);
}



//saving data

$('#add').on("click", function() {
    event.preventDefault();

    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    console.log('submit');
    
    db.collection('object/001/story').add({
        content: $('#content').val(),
        emotion: $('#emotion').val(),
        created: firebase.firestore.Timestamp.fromDate(new Date())
        });
})


//deleting all

$('.story').on("click", function(){
    event.preventDefault();


    db.collection('object/001/story').doc(this.data('data-id')).delete();
    console.log('delete');
})



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