# todo_repeater
Automizes reconfiguring repeated todos for a diffrent day.

A function that handles repeated daily tasks ie., resets the checkboxes to empty and adds a user inputted value for how many days out the task will be repeated again. Best used if paired with the agenda plugin https://discourse.joplinapp.org/t/agenda/ by BeatLink.

Examples:

Title = "Repeat 7: <description>" will automatically reset the task 7 days from now

Title = "Repeat 2: <description>" will automatically reset the task 2 days from now

Title = "Repeat 1: <description>" will automatically reset the task 1 days from now

Title = "Repeat n: <description>" will automatically reset the task n days from now

The function only sets up the repeated task if it is the same date as the current date.

I added an icon to the toolbar for the user to click using the "fas fa-redo" icon name that triggers the function.

Before:
<img width="1438" alt="image" src="https://user-images.githubusercontent.com/63538326/140665143-544571e0-ad10-4bff-aaec-60c3ecf2e66c.png">

  
After:
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/63538326/140665161-8266b5ec-6e35-4b5d-834c-8739d7246eca.png">
