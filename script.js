$(function () {
  // Add a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    // Use DOM traversal to get the "hour-x" id of the time-block
    var timeBlockId = $(this).closest('.time-block').attr('id');

    // Save the user input in local storage using the time-block id as a key
    var userInput = $(this).siblings('textarea').val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Apply the past, present, or future class to each time block
  function updateBlockClasses() {
    // Get the current hour in 24-hour time using Day.js
    var currentHour = dayjs().format('H');

    // Loop through each time block
    $('.time-block').each(function () {
      // Get the hour from the time-block id
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      // Compare the block hour with the current hour and add the appropriate class
      if (blockHour < currentHour) {
        $(this).addClass('past').removeClass('present future');
      } else if (blockHour == currentHour) {
        $(this).addClass('present').removeClass('past future');
      } else {
        $(this).addClass('future').removeClass('past present');
      }
    });
  }

  // Call the function to initially set the classes
  updateBlockClasses();

  // Get user input from local storage and set the values of corresponding textarea elements
  function setSavedValues() {
    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var savedValue = localStorage.getItem(blockId);

      if (savedValue !== null) {
        $(this).find('textarea').val(savedValue);
      }
    });
  }

  // Call the function to set saved values
  setSavedValues();

  // Display the current date in the header of the page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});