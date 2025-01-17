// 34669919 
// Zaina Shahid - ICT373 Assignment1 


// Function to check if a year is a leap year
// divisble 4 but not by 100 unless it is also divisble by 400 
function isLeapYear(year) 
{
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}




// Function to get the number of days in a month
function getDaysInMonth(month, year)
{
    let daysInMonth = 31; // Default value initialization

    // Check for February (special case)
    if (month === 2) 
    {
        if (isLeapYear(year)) 
        {
            daysInMonth = 29; // Leap year
        } else {
            daysInMonth = 28; // Non-leap year
        }
    } 

    // Check for months with 30 days
    else if (month === 4 || month === 6 || month === 9 || month === 11) {
        daysInMonth = 30;
    }

    return daysInMonth; // Return the number of days in the specified month
}




// Function to generate and display the calendar for the birthdate selection
function generateCalendar(year, month) 
{
    const daysGrid = document.getElementById('daysGrid'); 
    daysGrid.innerHTML = ''; // Clear any previous calendar content 

    // determining the first day of the month by calculating total days passed since a reference date (e.g., 01/01/0001)
    const firstDay = calculateFirstDayOfMonth(month, year); // instead of using Date object

    //how many days in the month 
    const daysInMonth = getDaysInMonth(month, year);
    
    // loops through all num of days before the first day of month
    for (let i = 0; i < firstDay; i++) 
    {
        const emptyDay = document.createElement('div'); // creates an empty div place element for filling the grid in calendar
        daysGrid.appendChild(emptyDay);
        // adding the empty days 
    }

    // Populate days of the month
    // loops from day1 to each day , creating new div fo reach day 
    for (let day = 1; day <= daysInMonth; day++) 
    {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        // adds a click event listener to each day and calls the method when clicked 
        dayElement.addEventListener('click', () => selectDate(day, month, year));

        daysGrid.appendChild(dayElement);
    }
}




// Function to calculate the first day of the week the first day of month falls on 
function calculateFirstDayOfMonth(month, year) 
{
   
    let totalDays = 0;

    // loops from 1900 to the specified year and adds days after deciding is leap year or not
    for (let y = 1900; y < year; y++) 
    {
        if (isLeapYear(y)) 
        { 
            // Check if the year is a leap year
            totalDays += 366; // Add 366 days for leap year

        } else { // If not a leap year
            totalDays += 365; // Add 365 days for a non-leap year
        }
    }

    // loops from jan to month before the specified month
    for (let m = 1; m < month; m++) 
    {
        totalDays += getDaysInMonth(m, year); //adds num of days 
    }

    // return first day 
    return totalDays % 7; // Return the remainder as the day of the week (0 = Sunday, 6 = Saturday)
}



// Function to select a date
// update the field of the selected date 
function selectDate(day, month, year) 
{
    // set value of bdate to the formatted dd/mm/yy
    document.getElementById('bdate').value = `${padZero(day)}/${padZero(month)}/${year}`;
    
    // Highlight selected date
    const previousSelected = document.querySelector('.days-grid div.selected');
    
    // find the previously selected day and removes the selected class
    if (previousSelected) 
    {
        previousSelected.classList.remove('selected');
    }

    // add the selected class to clicked day element after looping through all day elems
    const dayElements = document.querySelectorAll('.days-grid div');
    for (let i = 0; i < dayElements.length; i++) 
    {
        if (dayElements[i].textContent == day) 
        {
            dayElements[i].classList.add('selected');
            break;
        }
    }
}


// Function to ensure the nums are formatted w a leading 0 if less than 10 (08,03 etc)
function padZero(num) 
{
    //convert int num to string and pads to lenght of 2 (07)
    return num.toString().padStart(2, '0');
}



// Initialize the calendar when page loads 
function initCalendar() 
{
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const currentYear = 2024;  // Set current year when first shown 

    // Populate year select
    // loo[s from 2024-100 and creates an option elem for each year 
    for (let year = currentYear - 100; year <= currentYear + 10; year++)
    {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option); //appending it 
    }

    yearSelect.value = currentYear; //sets selected year to current year 

    // Populate month select dropdown menu 
    // creating an array to store months 
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    //loops through the array index 
    months.forEach((month, index) => 
    {
        const option = document.createElement('option'); //creating another option 
        option.value = index + 1; // 0+1
        option.textContent = month;
        monthSelect.appendChild(option);  //Appends the option to the monthSelect dropdown
    });

    monthSelect.value = 10; //setting default month for when page loads 

    // Generate initial calendar
    //display for 2024 oct 
    generateCalendar(currentYear, 10);

    // Add event listeners for year and month selection dropdowns 
    // when anything is changed it calls the update functions 
    yearSelect.addEventListener('change', updateCalendar);
    monthSelect.addEventListener('change', updateCalendar);
}



// Function to update the calendar when year or month changes
function updateCalendar() 
{
    // retrieves selected year and month from drop down and parses them as int 
    const year = parseInt(document.getElementById('yearSelect').value);
    const month = parseInt(document.getElementById('monthSelect').value);
    
    //refresh the displayed calendar 
    generateCalendar(year, month);

}

// Calls initCalendar when the window is fully loaded
// ensuring the calendar is set up
window.addEventListener('load', initCalendar);


//add an event listener for form submission to validate input
// Retrieves the values of the phone number and birth date inputs
document.getElementById("userForm").addEventListener("submit", function(event)
{
    const phone = document.getElementById("phone").value;
    const birthdate = document.getElementById("bdate").value;

    // Validate phone number format
    const phonePattern = /^\+\d{1,3} \d{1,4}-\d{3}-\d{4}$/; //regulr expresssion
    if (!phonePattern.test(phone)) 
    {
        alert("Please enter a valid phone number (e.g., +1 123-456-7890).");
        event.preventDefault(); // to stop form from submitting 
        return;
    }

    // Validate birthdate format (DD/MM/YYYY)
    const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!datePattern.test(birthdate)) 
    {
        alert("Please enter a valid birth date in DD/MM/YYYY format.");
        event.preventDefault();
        return;
    }

    //Splits the birth date string into day, month year 
    //converts them to numbers using map(Number)
    const [day, month, year] = birthdate.split("/").map(Number);

    
    // Validate year, month, and day
    const currentYear = 2024; // Define current year for validation
    if (year < 1900 || year > currentYear) 
    { // Check for future years
        alert("Please enter a valid year (greater than 1900 and not in the future).");
        event.preventDefault();
        return;
    }

    if (month < 1 || month > 12) 
    {
        alert("Please enter a valid month (1-12).");
        event.preventDefault();
        return;
    }

    const daysInMonth = getDaysInMonth(month, year);
    if (day < 1 || day > daysInMonth) 
    {
        alert("Please enter a valid day for the selected month.");
        event.preventDefault();
        return;
    }
});
