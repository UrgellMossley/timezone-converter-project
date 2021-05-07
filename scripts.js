// example request http://api.timezonedb.com/v2.1/convert-time-zone?key=NS99T2RJP6BZ&format=json&from=CAT&to=CEST&time=1464793200
//Aim to take the value of input and convert to string which can be used in api call
`http://api.timezonedb.com/v2.1/convert-time-zone?key=NS99T2RJP6BZ&format=json&from=CAT&to=CEST&time=1464793200`
//dom element declarations
const timeInput = document.querySelector(`.time-form`)
const input = document.querySelector(`.time-input`)
const timeResult = document.querySelector(`.timezone-result`)
let fromZ = document.querySelector(`.from-timezone`)
let toZ = document.querySelector(`.to-timezone`)
const swapBtn = document.querySelector(`.swap`)
//event listner for time input
swapBtn.addEventListener(`click`,(e)=>{

//create a variable "timeString" which stores the time inputs value. This value is then used to parse in time
let timeString = input.value

//Fetch request to timezone API uses the output of a function to parse in UNIX time in seconds
const timeFetch = fetch(`http://api.timezonedb.com/v2.1/convert-time-zone?key=NS99T2RJP6BZ&format=json&from=${fromZ.value.toLocaleUpperCase()}&to=${toZ.value.toLocaleUpperCase()}&time=${format(timeString)}`)

    if ((timeString) && (fromZ) && (toZ)){
        
        timeFetch.then(Response=>{
            return Response.json()
        }).then(conversionData=>{
            //conversionData contains an object that can now be manipulated to convert timezone
            console.log(conversionData)
            //Create a Date object parsing in UNIX time multiplied by 1000 which can be manipulated to create a converted timestring
            let fullConvertedTime = new Date(conversionData.toTimestamp * 1000)
            let h = `0` + fullConvertedTime.getHours()
            let m = `0` + fullConvertedTime.getMinutes()
            let timeOutputString = h.substr(-2) + `:` + m.substr(-2) + ` ` + conversionData.toAbbreviation
            //Sets the timeResult element to show the converted time
            return timeResult.innerHTML = timeOutputString
        }) 
    } else {
        timeResult.innerHTML = `Sorry I can't process that timezone :(`
    }
})

//function that takes the value of time input and creates a Date object to parse into API call 
const format =(string)=>{
    let today = new Date()
    let day = today.getDate()
    let month = today.getMonth() 
    let year = today.getFullYear()    
    let hours = string[0] + string[1]
    let mins = string[3] + string[4]
    let fromTime = (new Date(`${year}`, `${month}`, `${day}`, `${hours}`, `${mins}`).getTime())/1000
    return fromTime
}

//Sucesses: 1, we have the string working as we want, 2. We have moment formatted and working well 3. we are actually getting conversions
//issue pin point why the conversion is not working as intended.
//SUCCESS we have the coversion working as intended. We also have set a h3 to dynamically change the time output
//Problems: how are we going to format the input? does the time input actually work? Layout refactor in HTML/CSS
//success: time input formatted well. 
//Problem: Now CSS on the inputs and rest of the DOM, need to join up link with both inputs for timezones
