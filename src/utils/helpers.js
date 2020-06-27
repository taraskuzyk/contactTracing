const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function msDurationToString(ms) {
    let displayDuration
    if (ms < 60000) {
        displayDuration = "Less than 1 minute"
    } else if (ms < 3600000) {
        displayDuration = Math.trunc(ms / 60000)
        displayDuration += displayDuration == 1 ? " min" : " mins"
    } else {
        let hours = Math.trunc(ms / 3600000);
        let minutes = Math.trunc((ms - hours * 3600000) / 60000)
        displayDuration = hours + (hours == 1 ? " hr " : " hrs ") +
            minutes + (minutes == 1 ? " min" : " mins")
    }
    return displayDuration
}

export function timestampToDateString(ts) {
    let date = new Date(ts)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    console.log(typeof date)
    return (
        ( hours   > 9 ? hours   : ("0"+hours) )  + ":" +
        ( minutes > 9 ? minutes : ("0"+minutes) ) + ":" +
        ( seconds > 9 ? seconds : ("0"+seconds) ) + ", " +
        day + " " + month + " " + year
    )
}


