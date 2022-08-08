// Declare variables
var containerDiv = $('.container');

// Current date in header
var currentDayP = $('#currentDay');
var currentDay = moment().format('dddd, MMMM Do, h:mm a');
currentDayP.text(currentDay);

var currentHour = moment().hour();
var timeBlockHour = $('col-1 hour');
var task = $('description');


// Hour variables
var workHours = [
    moment().hour(9).format('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA'),
];

// var currentDate = moment();
// $("#currentDate").text(currentDate.format("MMM Do, YYYY"));

// Time block function to compare each time block to current time. 
// if else statment used to differentiate between past, present, and future.
function timeBlock(timeBlockEventSpace) {
    var currentTimeBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();
    $(timeBlockEventSpace).removeClass('past present future');
    if (currentTimeBlockHour > currentHour) {
        $(timeBlockEventSpace).addClass('future');
    }
    else if (currentTimeBlockHour === currentHour) {
        $(timeBlockEventSpace).addClass('present');
    }
    else {
        $(timeBlockEventSpace).addClass('past');
    }
}

// Load function to load work day hours and put its content in the local storage
function load () {
    for (var i = 0; i < workHours.length; i++) {
        let task = localStorage.getItem(workHours[i])
        if (task) {
            $('#' + (i + 9)).sibling().first().children().text(task);
        } 
    }
}

// Save into local storage
function saveTask(hour, task) {
    localStorage.setItem(hour, task);
}

// Make local storage persist after refresh
function persistData() {
    localStorage.setItem(hour, task);
}
localStorage.getItem('hour');

// Add time blocks for 9am to 5pm
for (var i = 0; i < workHours.length; i++) {
    var timeBlockRow = $('<div>')
    .addClass('row time-block')
    .attr({
        id: 'row-' + (i + 9)
    });

    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workHours[i])
        .attr({
            id: i + 9
        });

    var timeBlockEventSpace = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'time-block-' + (i + 9)
        });

    var userInput = $('<p>')
        .addClass('description')
        .text(' ')
        .attr({
            id: 'Hour-' + (i + 9)
        });
    
    timeBlock(timeBlockEventSpace);

    // Save button with save icon
    var saveBtn = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button-' + (i + 9),
            type: 'button',
        })
        .on('click', function () {
            var hour = $(this).siblings().first().text();
            var task = $(this).siblings().last().text();
            saveTask(hour, task)
        })

    var saveIcon = $('<i>')
        .addClass('fa fa-save');

    $(containerDiv).append(timeBlockRow);
    $(timeBlockRow).append(timeBlockHour);
    $(timeBlockRow).append(timeBlockEventSpace);
    $(timeBlockEventSpace).append(userInput);
    $(timeBlockRow).append(saveBtn);
    $(saveBtn).append(saveIcon);
}

// function for user clicking into text box
$('.col-10').on('click', 'p', function () {
    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control') 
        .val(text);
   

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

// Using onblur to move focus from text area
$('.col-10').on('blur', 'textarea', function () {
    var text = $(this)
        .val()
        .trim();

    var userTextP = $("<p>")
        .addClass("description")
        .text(text);

    $(this).replaceWith(userTextP);
})

// Making data from local storage persist after refresh
$('#Hour-9').html(localStorage.getItem('9AM')),
$('#Hour-10').html(localStorage.getItem('10AM')),
$('#Hour-11').html(localStorage.getItem('11AM')),
$('#Hour-12').html(localStorage.getItem('12PM')),
$('#Hour-13').html(localStorage.getItem('1PM')),
$('#Hour-14').html(localStorage.getItem('2PM')),
$('#Hour-15').html(localStorage.getItem('3PM')),
$('#Hour-16').html(localStorage.getItem('4PM')),
$('#Hour-17').html(localStorage.getItem('5PM'));

